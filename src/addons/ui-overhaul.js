/*
 * BoxCast Player add-on: UI Overhaul
 *
 * A complete redesign of the BoxCast player (layout "playlist-to-right"):
 * - Video and details on the left; a tabbed sidebar card (Videos / Documents / Highlights / Chat) on
 *   the right that matches their height. Narrow players stack everything.
 * - Details: large title, friendly date with LIVE / UPCOMING chip, resolution badge, pill-shaped
 *   ticket and donate buttons, and a description card with "Show more".
 * - Playlist rows: 16:9 thumbnails, two-line titles, dates; the whole row is clickable.
 * - Follows the player's light/dark theme. Colors are CSS variables (see the stylesheet below).
 *
 * Include this anywhere on the page, before or after the BoxCast player script. The player renders
 * asynchronously and re-renders when switching broadcasts, so this watches the page and re-applies
 * itself whenever the player's markup appears or changes. It never moves the player's own elements;
 * it adds a few elements, classes and attributes, and rewrites date text.
 */
;(function () {
  var NAME = 'ui-overhaul'
  var addons = (window.BoxcastAddons = window.BoxcastAddons || {})
  if (addons[NAME]) return // already loaded

  var STYLE_ID = 'boxcast-addon-' + NAME
  var CSS = __BXO_CSS__ // replaced with ui-overhaul.css when the customizer builds this script

  // Descriptions taller than this get collapsed behind "Show more" (matches the stylesheet)
  var COLLAPSED_HEIGHT = 150

  var TABS = [
    { key: 'playlist', label: 'Videos' },
    { key: 'documents', label: 'Documents' },
    { key: 'highlights', label: 'Highlights' },
    { key: 'chat', label: 'Chat' },
  ]

  // ---------- Dates ----------

  // The player's (English) date lines. The first group is the start date/time; the end part is
  // optional because the player drops it when there's no end time.
  var DATE_LINES = [
    { status: 'past', pattern: /^Broadcasted (.+?)(?: - .*)?$/ },
    { status: 'upcoming', pattern: /^Scheduled to broadcast (.+?)(?: - .*)?$/ },
    { status: 'live', pattern: /^Broadcast started (.+?)(?: \(ending .*\))?$/ },
  ]

  // "7/23/23 1:00pm" -> Date
  function parseClock(text) {
    var m = /^(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s+(\d{1,2}):(\d{2})\s*([ap]m)$/i.exec(text)
    if (!m) return null
    var year = Number(m[3]) < 100 ? 2000 + Number(m[3]) : Number(m[3])
    var hour = (Number(m[4]) % 12) + (m[6].toLowerCase() === 'pm' ? 12 : 0)
    return new Date(year, Number(m[1]) - 1, Number(m[2]), hour, Number(m[5]))
  }

  function parseDateLine(text) {
    for (var i = 0; i < DATE_LINES.length; i++) {
      var match = DATE_LINES[i].pattern.exec(text.trim())
      if (match) return { status: DATE_LINES[i].status, raw: match[1], start: parseClock(match[1]) }
    }
    return null
  }

  // Viewer's locale, e.g. "Jul 23, 2023" and "1:00 PM"
  function formatDay(d) {
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }
  function formatTime(d) {
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  }

  // Details row: "Jul 23, 2023 · 1:00 PM", or "Started 1:00 PM" while live
  function formatDetailsDate(info) {
    if (!info.start) return info.raw
    if (info.status === 'live') return 'Started ' + formatTime(info.start)
    return formatDay(info.start) + ' · ' + formatTime(info.start)
  }

  // Playlist rows: "Jul 23, 2023", "Upcoming · Jul 23, 2023" or "Live now"
  function formatRowDate(info) {
    if (info.status === 'live') return 'Live now'
    var day = info.start ? formatDay(info.start) : info.raw
    return info.status === 'upcoming' ? 'Upcoming · ' + day : day
  }

  // Replace the player's date text, keeping the original so it can be restored. When the player
  // renders a new line it replaces this text, which the observer picks up and rewrites again.
  function rewriteDate(el, format) {
    var text = el.textContent
    if (el.getAttribute('data-bxo-text') === text) return
    var info = parseDateLine(text)
    if (!info) return
    var next = format(info)
    el.setAttribute('data-bxo-original', text)
    el.setAttribute('data-bxo-text', next)
    if (info.status === 'past') el.removeAttribute('data-bxo-status')
    else el.setAttribute('data-bxo-status', info.status)
    el.textContent = next
  }

  // ---------- Description "Show more" ----------

  function applyDescription(details) {
    var description = details.querySelector(':scope > .boxcast-description')
    var button = details.querySelector(':scope > .bxo-more')
    // The player renders an empty description element for broadcasts without one
    var empty = !!description && !description.textContent.trim() && !description.querySelector('img, iframe, video')
    if (description) description.classList.toggle('bxo-empty', empty)
    if (!description || empty) {
      if (button) button.remove()
      details.classList.remove('bxo-clampable', 'bxo-expanded')
      return
    }
    if (!button) {
      button = document.createElement('button')
      button.type = 'button'
      button.className = 'bxo-more'
      details.appendChild(button)
    }
    var expanded = details.classList.contains('bxo-expanded')
    // scrollHeight is the full content height even while collapsed
    details.classList.toggle('bxo-clampable', expanded || description.scrollHeight > COLLAPSED_HEIGHT + 1)
    var label = expanded ? 'Show less' : 'Show more'
    if (button.textContent !== label) button.textContent = label
    button.setAttribute('aria-expanded', String(expanded))
  }

  // ---------- Sidebar tabs ----------

  // Which panel is this child of the sidebar column? Relies on the player's markup:
  // - Chat is wrapped in .boxcast-chat
  // - Playlist and Documents/Index are both .boxcast-playlist.boxcast-well; only the Playlist
  //   wraps its heading in a div (`.boxcast-well-title > div > h3`)
  // - Highlights is a plain .boxcast-well
  function panelKey(el) {
    if (el.classList.contains('boxcast-chat')) return 'chat'
    if (!el.classList.contains('boxcast-well')) return null
    if (el.classList.contains('boxcast-playlist')) {
      return el.querySelector(':scope > .boxcast-well-title > div > h3') ? 'playlist' : 'documents'
    }
    return 'highlights'
  }

  function applyColumn(column, live) {
    var panels = {}
    for (var i = 0; i < column.children.length; i++) {
      var child = column.children[i]
      var key = panelKey(child)
      if (!key) continue
      panels[key] = child
      if (child.getAttribute('data-bxo-panel') !== key) child.setAttribute('data-bxo-panel', key)
    }

    var tabs = TABS.filter(function (t) {
      return panels[t.key]
    })
    column.classList.add('bxo-col')
    if (tabs.length === 0) return

    // Keep the viewer's choice; otherwise open chat for live broadcasts (like Twitch), else the first tab
    var active = column.getAttribute('data-bxo-tab')
    if (!panels[active]) active = live && panels.chat ? 'chat' : tabs[0].key
    for (var key in panels) panels[key].classList.toggle('bxo-active', key === active)

    // The player hides chat behind its own "Show Chat" toggle; open it when its tab is shown
    if (active === 'chat') {
      var closedShell = column.querySelector('.boxcast-chat--shell.closed')
      var toggle = closedShell && closedShell.querySelector('.boxcast-chat--link')
      if (toggle) toggle.click()
    }

    var bar = column.querySelector(':scope > .bxo-tabs')
    if (tabs.length < 2) {
      if (bar) bar.remove()
      return
    }

    // Rebuild buttons only when the set of panels changes (e.g. switching broadcasts)
    var signature = tabs
      .map(function (t) {
        return t.key
      })
      .join(',')
    if (!bar) {
      bar = document.createElement('div')
      bar.className = 'bxo-tabs'
      bar.setAttribute('role', 'tablist')
      column.appendChild(bar)
    }
    if (bar.getAttribute('data-bxo-tabs') !== signature) {
      bar.setAttribute('data-bxo-tabs', signature)
      bar.innerHTML = tabs
        .map(function (t) {
          return (
            '<button type="button" role="tab" class="bxo-tab" data-bxo-tab="' + t.key + '">' + t.label + '</button>'
          )
        })
        .join('')
    }

    var buttons = bar.querySelectorAll('.bxo-tab')
    for (var b = 0; b < buttons.length; b++) {
      var tabKey = buttons[b].getAttribute('data-bxo-tab')
      buttons[b].setAttribute('aria-selected', String(tabKey === active))
      buttons[b].toggleAttribute('data-bxo-live', tabKey === 'chat' && live)
    }
  }

  // ---------- Apply ----------

  function apply(root) {
    root.classList.add('bxo')

    var details = root.querySelector('.boxcast-with-playlist-to-right-col-1 > .boxcast-well')
    var dateLine = details && details.querySelector(':scope > .boxcast-start-stop')
    if (dateLine) rewriteDate(dateLine, formatDetailsDate)
    root.querySelectorAll('.boxcast-playlist-item-meta > p > span').forEach(function (el) {
      rewriteDate(el, formatRowDate)
    })
    if (details) applyDescription(details)

    var column = root.querySelector('.boxcast-with-playlist-to-right-col-2')
    var live = !!dateLine && dateLine.getAttribute('data-bxo-status') === 'live'
    if (column) applyColumn(column, live)
  }

  // Batch DOM changes into one pass per frame. Our own changes cause at most one extra pass,
  // since apply() only touches the DOM when something actually differs.
  var scheduled = false
  function scheduleApply() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(function () {
      scheduled = false
      document.querySelectorAll('.boxcast-boxoffice').forEach(apply)
    })
  }

  // One delegated listener for tabs, "Show more" and playlist rows
  function onClick(e) {
    var target = e.target
    if (!(target instanceof Element) || !target.closest('.boxcast-boxoffice.bxo')) return

    var tab = target.closest('.bxo-tab')
    if (tab) {
      tab.closest('.bxo-col').setAttribute('data-bxo-tab', tab.getAttribute('data-bxo-tab'))
      return scheduleApply()
    }

    var more = target.closest('.bxo-more')
    if (more) {
      more.parentElement.classList.toggle('bxo-expanded')
      return scheduleApply()
    }

    // Playlist rows: the player only listens on the thumbnail and title link
    var row = target.closest('[data-bxo-panel="playlist"] .boxcast-playlist-item')
    if (row && !target.closest('a, button, input, .boxcast-preview-icon')) {
      var link = row.querySelector('h3 a')
      if (link) link.click()
    }
  }

  var observer = new MutationObserver(scheduleApply)

  function start() {
    if (!document.getElementById(STYLE_ID)) {
      var style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = CSS
      document.head.appendChild(style)
    }
    document.addEventListener('click', onClick)
    observer.observe(document.body, { childList: true, characterData: true, subtree: true })
    scheduleApply()
  }

  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)

  addons[NAME] = {
    // Undo everything (used by the customizer preview when the feature is switched off)
    destroy: function () {
      observer.disconnect()
      document.removeEventListener('click', onClick)
      var style = document.getElementById(STYLE_ID)
      if (style) style.remove()

      document.querySelectorAll('[data-bxo-original]').forEach(function (el) {
        if (el.textContent === el.getAttribute('data-bxo-text')) el.textContent = el.getAttribute('data-bxo-original')
      })
      document.querySelectorAll('.bxo-tabs, .bxo-more').forEach(function (el) {
        el.remove()
      })
      var classes = ['bxo', 'bxo-col', 'bxo-active', 'bxo-clampable', 'bxo-expanded', 'bxo-empty']
      document.querySelectorAll('.' + classes.join(', .')).forEach(function (el) {
        el.classList.remove.apply(el.classList, classes)
      })
      var attributes = ['data-bxo-original', 'data-bxo-text', 'data-bxo-status', 'data-bxo-panel', 'data-bxo-tab']
      document.querySelectorAll('[' + attributes.join('], [') + ']').forEach(function (el) {
        attributes.forEach(function (a) {
          el.removeAttribute(a)
        })
      })
      delete addons[NAME]
    },
  }
})()
