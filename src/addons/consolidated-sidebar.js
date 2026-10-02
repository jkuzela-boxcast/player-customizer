/*
 * BoxCast Player add-on: Consolidated Sidebar
 *
 * Shows the player's right-hand column (Playlist, Documents, Highlights, Chat) one panel at a time,
 * with tabs along the bottom, and keeps the column the same height as the player + description.
 * Tabs only appear for the panels the current broadcast actually has.
 *
 * Include this anywhere on the page, before or after the BoxCast player script. The player renders
 * asynchronously and re-renders when switching broadcasts, so this watches the page and re-applies
 * itself whenever the player's markup appears or changes.
 *
 * It never moves the player's own elements; it only adds a tab bar and some classes/attributes,
 * and hides inactive panels with CSS.
 */
;(function () {
  var NAME = 'consolidated-sidebar'
  var addons = (window.BoxcastAddons = window.BoxcastAddons || {})
  if (addons[NAME]) return // already loaded

  var COLUMN = '.boxcast-with-playlist-to-right-col-2'
  var STYLE_ID = 'boxcast-addon-' + NAME

  // Tab order and labels
  var TABS = [
    { key: 'playlist', label: 'Videos' },
    { key: 'documents', label: 'Documents' },
    { key: 'highlights', label: 'Highlights' },
    { key: 'chat', label: 'Chat' },
  ]

  // Height matching only applies when the column sits beside the player (md/lg player sizes).
  // Smaller sizes stack everything vertically, so panels keep their natural height there.
  var SIDE = ':is(.boxcast-size-md, .boxcast-size-lg) .bx-tabbed'
  var CSS = [
    '.bx-tabbed > [data-bx-panel]:not(.bx-active) { display: none !important; }',
    '.bx-tabbed .boxcast-chat--shell > .boxcast-well-title { display: none !important; }',
    '.bx-tabbed.bx-has-tabs > .bx-active, .bx-tabbed.bx-has-tabs > .bx-active > .boxcast-chat--shell { margin-bottom: 0 !important; }',

    // `contain: size` stops the column's content from setting the row height, so it stretches to
    // match the player + description column instead. The padding mirrors that column's padding.
    SIDE + ' { contain: size; display: flex !important; flex-direction: column !important; padding-bottom: 10px; }',
    SIDE +
      ' > .bx-active { flex: 1 1 0 !important; min-height: 0 !important; display: flex !important; flex-direction: column !important; }',
    SIDE +
      ' > .bx-active .boxcast-playlist-list { flex: 1 1 0 !important; min-height: 0 !important; overflow-y: auto !important; }',
    // Single document: fill the panel instead of a fixed square
    SIDE +
      ' > .bx-active .boxcast-playlist-list > div[style*="padding-top"] { padding-top: 0 !important; height: 100% !important; }',
    // Chat: fill the panel. The player gives these fixed pixel heights.
    SIDE +
      ' > .bx-active > .boxcast-chat--shell { flex: 1 1 0 !important; min-height: 0 !important; height: auto !important; display: flex !important; flex-direction: column !important; }',
    SIDE +
      ' > .bx-active > .boxcast-chat--shell > div:not(.boxcast-well-title) { flex: 1 1 0 !important; min-height: 0 !important; display: flex !important; flex-direction: column !important; }',
    SIDE +
      ' > .bx-active .boxcast-chat--msgcontainer, ' +
      SIDE +
      ' > .bx-active .boxcast-chat--msgcontainer-messages { flex: 1 1 0 !important; min-height: 0 !important; height: auto !important; }',

    // Tab bar: joins the bottom of the active panel like a footer
    '.bx-tabs { order: 99; display: flex; gap: 4px; padding: 4px; margin: 0 0 10px; border: 1px solid #bfbfbf; border-top: 0; background: #f5f5f5; }',
    '.bx-tabs .bx-tab { flex: 1; margin: 0; padding: 6px 8px; border: 0; border-radius: 4px; background: transparent; color: #555; font: inherit; font-size: 13px; font-weight: bold; cursor: pointer; }',
    '.bx-tabs .bx-tab:hover { background: rgba(0, 0, 0, 0.06); }',
    '.bx-tabs .bx-tab[aria-selected="true"] { background: #00a3bb; color: #fff; }',
  ].join('\n')

  // Which panel is this child of the column? Relies on the player's markup:
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

  function openChat(column) {
    var closedShell = column.querySelector('.boxcast-chat--shell.closed')
    var toggle = closedShell && closedShell.querySelector('.boxcast-chat--link')
    if (toggle) toggle.click()
  }

  function apply(column) {
    var panels = {}
    for (var i = 0; i < column.children.length; i++) {
      var child = column.children[i]
      var key = panelKey(child)
      if (!key) continue
      panels[key] = child
      if (child.getAttribute('data-bx-panel') !== key) child.setAttribute('data-bx-panel', key)
    }

    var tabs = TABS.filter(function (t) {
      return panels[t.key]
    })
    if (tabs.length === 0) return

    var active = column.getAttribute('data-bx-active')
    if (!panels[active]) active = tabs[0].key
    column.setAttribute('data-bx-active', active)
    column.classList.add('bx-tabbed')
    for (var key in panels) panels[key].classList.toggle('bx-active', key === active)

    // The player hides chat behind its own "Show Chat" toggle; open it when its tab is shown
    if (active === 'chat') openChat(column)

    var bar = column.querySelector(':scope > .bx-tabs')
    var signature = tabs
      .map(function (t) {
        return t.key
      })
      .join(',')

    if (tabs.length < 2) {
      if (bar) bar.remove()
      column.classList.remove('bx-has-tabs')
      return
    }

    // Rebuild buttons only when the set of panels changes (e.g. switching broadcasts)
    if (!bar || bar.getAttribute('data-bx-tabs') !== signature) {
      if (!bar) {
        bar = document.createElement('div')
        bar.className = 'bx-tabs'
        bar.setAttribute('role', 'tablist')
        bar.addEventListener('click', function (e) {
          var button = e.target.closest('.bx-tab')
          if (!button) return
          column.setAttribute('data-bx-active', button.getAttribute('data-bx-tab'))
          apply(column)
        })
        column.appendChild(bar)
      }
      bar.setAttribute('data-bx-tabs', signature)
      bar.innerHTML = tabs
        .map(function (t) {
          return '<button type="button" role="tab" class="bx-tab" data-bx-tab="' + t.key + '">' + t.label + '</button>'
        })
        .join('')
    }
    column.classList.add('bx-has-tabs')

    var buttons = bar.querySelectorAll('.bx-tab')
    for (var b = 0; b < buttons.length; b++) {
      buttons[b].setAttribute('aria-selected', String(buttons[b].getAttribute('data-bx-tab') === active))
    }
  }

  // Batch DOM changes into one pass per frame. Our own changes cause at most one extra pass,
  // since apply() only touches the DOM when something actually differs.
  var scheduled = false
  function scheduleApply() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(function () {
      scheduled = false
      document.querySelectorAll(COLUMN).forEach(apply)
    })
  }

  var observer = new MutationObserver(scheduleApply)

  function start() {
    if (!document.getElementById(STYLE_ID)) {
      var style = document.createElement('style')
      style.id = STYLE_ID
      style.textContent = CSS
      document.head.appendChild(style)
    }
    observer.observe(document.body, { childList: true, subtree: true })
    scheduleApply()
  }

  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start)

  addons[NAME] = {
    // Undo everything (used by the customizer preview when the feature is switched off)
    destroy: function () {
      observer.disconnect()
      var style = document.getElementById(STYLE_ID)
      if (style) style.remove()
      document.querySelectorAll(COLUMN).forEach(function (column) {
        var bar = column.querySelector(':scope > .bx-tabs')
        if (bar) bar.remove()
        column.classList.remove('bx-tabbed', 'bx-has-tabs')
        column.removeAttribute('data-bx-active')
        column.querySelectorAll(':scope > [data-bx-panel]').forEach(function (panel) {
          panel.removeAttribute('data-bx-panel')
          panel.classList.remove('bx-active')
        })
      })
      delete addons[NAME]
    },
  }
})()
