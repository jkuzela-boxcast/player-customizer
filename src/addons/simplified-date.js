/*
 * BoxCast Player add-on: Simplified Broadcast Date
 *
 * Changes the description box's date line from e.g. "Broadcasted 7/23/23 1:00pm - 7/23/23 1:03pm"
 * to just the start date and time: "7/23/23 1:00pm".
 *
 * Include this anywhere on the page, before or after the BoxCast player script. The player renders
 * asynchronously and re-renders when switching broadcasts, so this watches the page and re-applies
 * itself whenever the date line appears or changes.
 */
;(function () {
  var NAME = 'simplified-date'
  var addons = (window.BoxcastAddons = window.BoxcastAddons || {})
  if (addons[NAME]) return // already loaded

  var SELECTOR = 'p.boxcast-start-stop'

  // The player's (English) date lines; the first group is the start date/time.
  // The end part is optional because the player drops it when there's no end time.
  var PATTERNS = [
    /^Broadcasted (.+?)(?: - .*)?$/, // past
    /^Scheduled to broadcast (.+?)(?: - .*)?$/, // upcoming
    /^Broadcast started (.+?)(?: \(ending .*\))?$/, // live
  ]

  function startOf(text) {
    for (var i = 0; i < PATTERNS.length; i++) {
      var match = PATTERNS[i].exec(text.trim())
      if (match) return match[1]
    }
    return null // unrecognized text is left alone
  }

  function apply(el) {
    var text = el.textContent
    if (el.getAttribute('data-bx-simplified') === text) return // already simplified
    var start = startOf(text)
    if (!start) return
    // Keep the original so it can be restored. When the player renders a new line it replaces
    // this text, which the observer picks up and simplifies again.
    el.setAttribute('data-bx-original', text)
    el.setAttribute('data-bx-simplified', start)
    el.textContent = start
  }

  // Batch DOM changes into one pass per frame
  var scheduled = false
  function scheduleApply() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(function () {
      scheduled = false
      document.querySelectorAll(SELECTOR).forEach(apply)
    })
  }

  var observer = new MutationObserver(scheduleApply)

  function start() {
    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    scheduleApply()
  }

  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)

  addons[NAME] = {
    // Undo everything (used by the customizer preview when the option is switched off)
    destroy: function () {
      observer.disconnect()
      document.querySelectorAll(SELECTOR + '[data-bx-original]').forEach(function (el) {
        if (el.textContent === el.getAttribute('data-bx-simplified'))
          el.textContent = el.getAttribute('data-bx-original')
        el.removeAttribute('data-bx-original')
        el.removeAttribute('data-bx-simplified')
      })
      delete addons[NAME]
    },
  }
})()
