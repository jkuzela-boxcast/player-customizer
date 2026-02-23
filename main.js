const GROUPS = [
  {
    label: 'Player',
    elements: [
      {
        id: 'video-area',
        label: 'Video Area',
        desc: 'The video player container',
        icon: '▶',
        selector: '.boxcast-boxoffice .boxcast-player-container',
        props: [
          { group: 'Border', fields: [
            { key: 'border', label: 'Border', type: 'text', default: 'none' },
            { key: 'border-radius', label: 'Border Radius', type: 'range', min: 0, max: 12, unit: 'px', default: 0 },
          ]},
        ]
      },
      {
        id: 'progress-track',
        label: 'Progress Track',
        desc: 'Seek bar background',
        icon: '—',
        selector: '.bar-container > .bar-background',
        props: [
          { group: 'Appearance', fields: [
            { key: 'background-color', label: 'Track Color', type: 'color', default: 'rgba(255,255,255,0.2)' },
            { key: 'height', label: 'Height', type: 'range', min: 2, max: 10, unit: 'px', default: 3 },
            { key: 'border-radius', label: 'Border Radius', type: 'range', min: 0, max: 6, unit: 'px', default: 2 },
          ]},
        ]
      },
      {
        id: 'progress-fill',
        label: 'Progress Fill',
        desc: 'Played portion color',
        icon: '█',
        selector: '.bar-fill-2',
        props: [
          { group: 'Appearance', fields: [
            { key: 'background-color', label: 'Fill Color', type: 'color', default: '#ffffff' },
          ]},
        ]
      },
      {
        id: 'progress-buffer',
        label: 'Buffer Bar',
        desc: 'Buffered portion color',
        icon: '▒',
        selector: '.bar-fill-1',
        props: [
          { group: 'Appearance', fields: [
            { key: 'background-color', label: 'Buffer Color', type: 'color', default: 'rgba(255,255,255,0.35)' },
          ]},
        ]
      },
    ]
  },
  {
    label: 'Description',
    elements: [
      {
        id: 'info-area',
        label: 'Description Box',
        desc: 'Background behind title/meta/description',
        icon: '▭',
        selector: '.boxcast-boxoffice > .boxcast-well-container > .boxcast-well:first-child, .boxcast-with-playlist-to-right-col-1 > .boxcast-well',
        props: [
          { group: 'Background', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: '#ffffff' },
            { key: 'padding', label: 'Padding', type: 'range', min: 0, max: 24, unit: 'px', default: 10 },
            { key: 'margin', label: 'Margin', type: 'range', min: 0, max: 24, unit: 'px', default: 10 },
          ]},
          { group: 'Border', fields: [
            { key: 'border-color', label: 'Color', type: 'color', default: '#bfbfbf' },
            { key: 'border-width', label: 'Thickness', type: 'range', min: 0, max: 8, unit: 'px', default: 0 },
            { key: 'border-style', label: 'Style', type: 'select', options: ['none', 'solid', 'dashed', 'dotted'], default: 'solid' },
            { key: 'border-radius', label: 'Border Radius', type: 'range', min: 0, max: 12, unit: 'px', default: 0 },
          ]},
        ]
      },
      {
        id: 'title',
        label: 'Broadcast Title',
        desc: 'Main h1 title text',
        icon: 'abc',
        selector: '.boxcast-boxoffice .boxcast-title',
        props: [
          { group: 'Typography', fields: [
            { key: 'font-size', label: 'Font Size', type: 'range', min: 11, max: 36, unit: 'px', default: 18 },
            { key: 'font-weight', label: 'Font Weight', type: 'select', options: ['300','400','500','600','700','800'], default: '700' },
            { key: 'color', label: 'Color', type: 'color', default: '#000000' },
            { key: 'line-height', label: 'Line Height', type: 'range', min: 1.0, max: 2.2, step: 0.05, default: 1.3 },
            { key: 'letter-spacing', label: 'Letter Spacing', type: 'range', min: -1, max: 4, step: 0.5, unit: 'px', default: 0 },
            { key: 'text-transform', label: 'Transform', type: 'select', options: ['none','uppercase','capitalize','lowercase'], default: 'none' },
          ]},
          { group: 'Spacing', fields: [
            { key: 'margin-bottom', label: 'Margin Bottom', type: 'range', min: 0, max: 24, unit: 'px', default: 6 },
          ]},
        ]
      },
      {
        id: 'description',
        label: 'Description Text',
        desc: 'Broadcast description text',
        icon: 'abc',
        selector: '.boxcast-description > p, .boxcast-description > ul > li',
        props: [
          { group: 'Typography', fields: [
            { key: 'font-size', label: 'Font Size', type: 'range', min: 10, max: 18, unit: 'px', default: 13 },
            { key: 'color', label: 'Color', type: 'color', default: '#444444' },
            { key: 'line-height', label: 'Line Height', type: 'range', min: 1.2, max: 2.5, step: 0.05, default: 1.5 },
          ]}
        ]
      },
      {
        id: 'description-meta',
        label: 'Start/Stop Datetime',
        desc: 'Broadcast date and time text',
        icon: 'abc',
        selector: '.boxcast-boxoffice .boxcast-start-stop',
        props: [
          { group: 'Typography', fields: [
            { key: 'font-size', label: 'Font Size', type: 'range', min: 9, max: 16, unit: 'px', default: 12 },
            { key: 'color', label: 'Color', type: 'color', default: '#1a1d2e' },
            { key: 'font-style', label: 'Font Style', type: 'select', options: ['normal','italic'], default: 'normal' },
          ]},
          { group: 'Spacing', fields: [
            { key: 'margin-top', label: 'Margin Top', type: 'range', min: 0, max: 20, unit: 'px', default: 4 },
          ]},
        ]
      },
    ]
  },
  {
    label: 'Donate Button',
    elements: [
      {
        id: 'donate-btn',
        label: 'Donate Button',
        desc: 'Shown when Donations enabled',
        icon: '♥',
        selector: '.boxcast-ticket-button',
        props: [
          { group: 'Colors', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: 'transparent' },
            { key: 'color', label: 'Text Color', type: 'color', default: '#00a3bb' },
          ]},
          { group: 'Shape & Text', fields: [
            { key: 'border-radius', label: 'Border Radius', type: 'range', min: 0, max: 24, unit: 'px', default: 4 },
            { key: 'font-size', label: 'Font Size', type: 'range', min: 9, max: 18, unit: 'px', default: 13 },
            { key: 'font-weight', label: 'Font Weight', type: 'select', options: ['400','500','600','700'], default: '600' },
            { key: 'padding', label: 'Padding', type: 'text', default: '6px 16px' },
            { key: 'border', label: 'Border', type: 'text', default: 'none' },
            { key: 'text-transform', label: 'Transform', type: 'select', options: ['none','uppercase','capitalize'], default: 'none' },
          ]},
        ]
      },
    ]
  },
  {
    label: 'Playlist',
    elements: [
      {
        id: 'playlist-box',
        label: 'Playlist Box',
        desc: 'Outer playlist container',
        icon: '☰',
        selector: 'boxcast-with-playlist-to-right-col-2 > .boxcast-well, .boxcast-playlist',
        props: [
          { group: 'Background', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: '#ffffff' },
            { key: 'border-left', label: 'Left Border', type: 'text', default: 'none' },
          ]},
          { group: 'Border', fields: [
            { key: 'border', label: 'Border', type: 'text', default: 'none' },
            { key: 'border-radius', label: 'Border Radius', type: 'range', min: 0, max: 12, unit: 'px', default: 0 },
          ]},
        ]
      },
      {
        id: 'playlist-header',
        label: 'Header',
        desc: '"Related Videos" heading area',
        icon: 'abc',
        selector: '.boxcast-well-title h3',
        props: [
          { group: 'Typography', fields: [
            { key: 'font-size', label: 'Font Size', type: 'range', min: 9, max: 20, unit: 'px', default: 14 },
            { key: 'color', label: 'Color', type: 'color', default: 'inherited' },
            { key: 'font-weight', label: 'Font Weight', type: 'select', options: ['400','500','600','700'], default: '700' },
            { key: 'text-transform', label: 'Transform', type: 'select', options: ['none','uppercase','capitalize'], default: 'none' },
          ]},
          { group: 'Background', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: '#ffffff' },
            { key: 'padding', label: 'Padding', type: 'text', default: '8px 12px' },
            { key: 'border-bottom', label: 'Bottom Border', type: 'text', default: 'none' },
          ]},
        ]
      },
      {
        id: 'playlist-item-container',
        label: 'Item Container',
        desc: 'Playlist Broadcast Name',
        icon: '◰',
        selector: '.boxcast-boxoffice .boxcast-playlist-item',
        props: [
          { group: 'Colors', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: '#ffffff' },
            { key: 'border-bottom', label: 'Divider', type: 'text', default: '1px solid #eeeeee' },
          ]},
          { group: 'Spacing', fields: [
            { key: 'margin', label: 'Margin', type: 'text', default: '0px 0px' },
            { key: 'padding', label: 'Padding', type: 'text', default: '8px 12px' },
          ]},
        ]
      },
      {
        id: 'playlist-item-name',
        label: 'Item Name',
        desc: 'Playlist Broadcast Name',
        icon: 'abc',
        selector: '.boxcast-playlist-item-meta > :nth-child(1), .boxcast-playlist-item-meta > :nth-child(1) > *',
        props: [
          { group: 'Colors', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: '#ffffff' },
            { key: 'border-bottom', label: 'Divider', type: 'text', default: '1px solid #eeeeee' },
          ]},
          { group: 'Typography', fields: [
            { key: 'color', label: 'Text Color', type: 'color', default: '#337ab7' },
            { key: 'font-size', label: 'Font Size', type: 'range', min: 8, max: 16, unit: 'px', default: 13 },
          ]},
          { group: 'Spacing', fields: [
            { key: 'margin', label: 'Margin', type: 'text', default: '5px 0px' },
            { key: 'padding', label: 'Padding', type: 'text', default: '0px 0px' },
          ]},
        ]
      },
      {
        id: 'playlist-item-active',
        label: 'Item Name (Current)',
        desc: 'Currently selected broadcast name',
        icon: 'abc',
        selector: '.boxcast-selected > .boxcast-playlist-item-meta > h3 > *',
        props: [
          { group: 'Colors', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: 'inherited' },
            { key: 'color', label: 'Text Color', type: 'color', default: 'inherited' },
          ]},
          { group: 'Spacing', fields: [
            { key: 'margin', label: 'Margin', type: 'text', default: 'inherited' },
            { key: 'padding', label: 'Padding', type: 'text', default: 'inherited' },
          ]},
        ]
      },
      {
        id: 'playlist-item-description',
        label: 'Item Description',
        desc: 'Playlist Broadcast Description',
        icon: 'abc',
        selector: '.boxcast-playlist-item-meta > :nth-child(2)',
        props: [
          { group: 'Typography', fields: [
            { key: 'color', label: 'Text Color', type: 'color', default: '#333333' },
            { key: 'font-size', label: 'Font Size', type: 'range', min: 8, max: 16, unit: 'px', default: 10 },
          ]},
          { group: 'Spacing', fields: [
            { key: 'margin', label: 'Margin', type: 'text', default: '5px 0px' },
            { key: 'padding', label: 'Padding', type: 'text', default: '0px 0px' },
          ]},
        ]
      },
      {
        id: 'playlist-item-startstop',
        label: 'Item Start/Stop',
        desc: 'Playlist Broadcast Start/Stop Datetime',
        icon: 'abc',
        selector: '.boxcast-playlist-item-meta > :nth-child(3)',
        props: [
          { group: 'Typography', fields: [
            { key: 'color', label: 'Text Color', type: 'color', default: '#333333' },
            { key: 'font-size', label: 'Font Size', type: 'range', min: 8, max: 16, unit: 'px', default: 10 },
            { key: 'font-style', label: 'Font Style', type: 'select', options: ['normal','italic'], default: 'normal' },
          ]},
          { group: 'Spacing', fields: [
            { key: 'margin', label: 'Margin', type: 'text', default: '5px 0px' },
            { key: 'padding', label: 'Padding', type: 'text', default: '0px 0px' },
          ]},
        ]
      },
    ]
  },
  {
    label: 'Controls',
    elements: [
      {
        id: 'control-bar',
        label: 'Control Bar',
        desc: 'Main controls container',
        icon: '⬛',
        selector: '.media-control-background, .media-control-background *',
        props: [
          { group: 'Background', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: 'rgba(0,0,0,0.75)' },
          ]},
        ]
      },
      {
        id: 'control-bar-icons',
        label: 'Control Bar Icons',
        desc: 'Main player controls',
        icon: '⬛',
        selector: '.media-control-button, .media-control-button *',
        props: [
          { group: 'Colors', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: '#e8f4fd' },
            { key: 'color', label: 'Text Color', type: 'color', default: '#0087cc' },
          ]},
        ]
      },
      {
        id: 'big-play-btn',
        label: 'Big Play Button',
        desc: 'Center play overlay button',
        icon: '⏵',
        selector: '#boxcast-big-play-button',
        props: [
          { group: 'Appearance', fields: [
            { key: 'background-color', label: 'Background', type: 'color', default: 'rgba(0,0,0,0.45)' },
            { key: 'border-color', label: 'Border Color', type: 'color', default: 'rgba(255,255,255,0.75)' },
            { key: 'border-width', label: 'Border Width', type: 'range', min: 0, max: 4, unit: 'px', default: 2 },
            { key: 'border-radius', label: 'Border Radius', type: 'range', min: 0, max: 50, unit: 'px', default: 4 },
            { key: 'color', label: 'Icon Color', type: 'color', default: '#ffffff' },
          ]},
        ]
      },
    ]
  },
];

// ─── STATE ───────────────────────────────────────────────────────────────────
let selectedId = null;
const styles = {};
GROUPS.forEach(g => g.elements.forEach(el => { styles[el.id] = {}; }));

const allElements = () => GROUPS.flatMap(g => g.elements);
const findEl = id => allElements().find(e => e.id === id);

// ─── INIT ─────────────────────────────────────────────────────────────────
function init() {
  renderElementList();
  renderCodeOutput();

  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.getElementById('tab-style').classList.toggle('active', tab === 'style');
      document.getElementById('tab-code').classList.toggle('active', tab === 'code');
      if (tab === 'code') renderCodeOutput();
    });
  });
}

// ─── ELEMENT LIST ─────────────────────────────────────────────────────────
function renderElementList() {
  const list = document.getElementById('elementList');
  list.innerHTML = '';
  GROUPS.forEach(group => {
    const gWrap = document.createElement('div');
    gWrap.className = 'section-group';
    const gTitle = document.createElement('div');
    gTitle.className = 'section-group-title';
    gTitle.textContent = group.label;
    gWrap.appendChild(gTitle);
    group.elements.forEach(el => {
      const hasChanges = Object.keys(styles[el.id]).length > 0;
      const item = document.createElement('div');
      item.className = 'el-item' + (el.id === selectedId ? ' active' : '') + (hasChanges ? ' has-changes' : '');
      item.innerHTML = `
        <div class="el-icon">${el.icon}</div>
        <div>
          <div class="el-name">${el.label}</div>
          <div class="el-desc">${el.desc}</div>
        </div>
        <div class="el-mod"></div>
      `;
      item.addEventListener('click', () => selectElement(el.id));
      gWrap.appendChild(item);
    });
    list.appendChild(gWrap);
  });
}

// ─── SELECT & RENDER CONTROLS ─────────────────────────────────────────────
function selectElement(id) {
  selectedId = id;
  renderElementList();
  renderStyleControls(id);
  // switch to style tab
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-tab="style"]').classList.add('active');
  document.getElementById('tab-style').classList.add('active');
  document.getElementById('tab-code').classList.remove('active');
}

function renderStyleControls(id) {
  const el = findEl(id);
  document.getElementById('emptyState').style.display = 'none';
  const ctrl = document.getElementById('styleControls');
  ctrl.style.display = 'block';
  ctrl.innerHTML = '';

  // header
  const hdr = document.createElement('div');
  hdr.className = 'el-controls-header';
  hdr.innerHTML = `
    <div style="font-size:18px;margin-right:2px">${el.icon}</div>
    <div>
      <div class="el-name">${el.label}</div>
      <div class="selector">${el.selector}</div>
    </div>
    <button class="reset-el-btn" onclick="resetElement('${id}')">Reset</button>
  `;
  ctrl.appendChild(hdr);

  el.props.forEach(group => {
    const gDiv = document.createElement('div');
    gDiv.className = 'prop-group';
    gDiv.innerHTML = `<div class="prop-group-label">${group.group}</div>`;

    const hasBorderRadius = group.fields.some(f => f.key === 'border-radius');

    group.fields.forEach(field => {
      const curVal = styles[id][field.key] !== undefined ? styles[id][field.key] : field.default;
      const row = document.createElement('div');
      row.className = 'prop-row';
      const ctrlId = `ctrl_${id}_${field.key}`.replace(/[^a-zA-Z0-9_]/g,'_');

      let ctrlHtml = '';
      if (field.type === 'color') {
        ctrlHtml = `<div class="color-hex-wrap">
          <input type="color" id="${ctrlId}" value="${toHex(curVal)}" />
          <input type="text" id="${ctrlId}_hex" value="${curVal}" placeholder="#rrggbb or rgba()" />
        </div>`;
      } else if (field.type === 'range') {
        const step = field.step || 1;
        ctrlHtml = `<div class="prop-ctrl" style="flex:1">
          <input type="range" id="${ctrlId}" min="${field.min}" max="${field.max}" step="${step}" value="${parseFloat(curVal)||0}" style="flex:1" />
          <span class="range-val" id="${ctrlId}_v">${curVal}${field.unit||''}</span>
        </div>`;
      } else if (field.type === 'select') {
        const opts = field.options.map(o => `<option value="${o}"${o===String(curVal)?' selected':''}>${o}</option>`).join('');
        ctrlHtml = `<select id="${ctrlId}">${opts}</select>`;
      } else {
        ctrlHtml = `<input type="text" id="${ctrlId}" value="${curVal}" />`;
      }

      row.innerHTML = `<div class="prop-label">${field.label}</div><div class="prop-ctrl" style="flex:1">${ctrlHtml}</div>`;
      gDiv.appendChild(row);

      // wire events after render
      setTimeout(() => {
        const c = document.getElementById(ctrlId);
        if (!c) return;
        const apply = (val) => {
          const cssVal = (field.unit && !isNaN(parseFloat(val)) && String(val).indexOf(field.unit) === -1) ? val + field.unit : val;
          styles[id][field.key] = cssVal;
          injectStyles();
          renderElementList();
          renderCodeOutput();
        };
        if (field.type === 'color') {
          const hex = document.getElementById(ctrlId + '_hex');
          c.addEventListener('input', e => { if(hex) hex.value = e.target.value; apply(e.target.value); });
          if (hex) hex.addEventListener('input', e => {
            const v = e.target.value.trim();
            if (/^#[0-9a-fA-F]{3,8}$/.test(v) || v.startsWith('rgba') || v.startsWith('rgb')) {
              try { c.value = toHex(v); } catch(e){}
              apply(v);
            }
          });
        } else if (field.type === 'range') {
          const vd = document.getElementById(ctrlId + '_v');
          c.addEventListener('input', e => {
            if(vd) vd.textContent = e.target.value + (field.unit||'');
            apply(e.target.value);
          });
        } else {
          c.addEventListener('input', e => apply(e.target.value));
          c.addEventListener('change', e => apply(e.target.value));
        }
      }, 0);
    });

    // If this group has a border-radius field, append a clip overflow toggle
    if (hasBorderRadius) {
      const toggleId = `ctrl_${id}_overflow_hidden`.replace(/[^a-zA-Z0-9_]/g,'_');
      const isChecked = styles[id]['overflow'] === 'hidden';
      const toggleRow = document.createElement('div');
      toggleRow.className = 'overflow-toggle-row';
      toggleRow.innerHTML = `
        <span class="toggle-label">Clip overflow</span>
        <label class="toggle-switch">
          <input type="checkbox" id="${toggleId}" ${isChecked ? 'checked' : ''} />
          <div class="toggle-track"></div>
        </label>
      `;
      gDiv.appendChild(toggleRow);

      setTimeout(() => {
        const cb = document.getElementById(toggleId);
        if (!cb) return;
        cb.addEventListener('change', e => {
          if (e.target.checked) {
            styles[id]['overflow'] = 'hidden';
          } else {
            delete styles[id]['overflow'];
          }
          injectStyles();
          renderElementList();
          renderCodeOutput();
        });
      }, 0);
    }

    ctrl.appendChild(gDiv);
  });
}

// ─── STYLE INJECTION ──────────────────────────────────────────────────────
function injectStyles() {
  let css = '';
  allElements().forEach(el => {
    const props = styles[el.id];
    if (!Object.keys(props).length) return;
    css += `${el.selector} {\n`;
    Object.entries(props).forEach(([p, v]) => { css += `  ${p}: ${v} !important;\n`; });
    css += '}\n';
  });
  document.getElementById('custom-style-tag').textContent = css;
}

// ─── PLAYER LOADING ────────────────────────────────────────────────────────
let playerLoaded = false;
function loadPlayer() {
  const channelId = document.getElementById('channelIdInput').value.trim();
  if (!channelId) return;

  document.getElementById('preview-placeholder').style.display = 'none';
  const widget = document.getElementById('boxcast-widget-preview');
  widget.style.display = 'block';
  widget.innerHTML = '';

  // Remove old boxcast script if present
  const oldScript = document.getElementById('boxcast-sdk');
  if (oldScript) oldScript.remove();

  // Load BoxCast SDK
  const js = document.createElement('script');
  js.id = 'boxcast-sdk';
  js.src = '//js.boxcast.com/v3.min.js';
  js.charset = 'utf-8';
  js.onload = () => {
    if (window.boxcast) {
      try {
        boxcast.noConflict()('#boxcast-widget-preview').loadChannel(channelId, {
          showTitle: 1,
          showDescription: 1,
          showHighlights: 1,
          showRelated: true,
          autoPlay: "try-muted",
          defaultVideo: 'next',
          playInline: true,
          dvr: true,
          showCountdown: true,
          showDonations: true,
          showDocuments: true,
          showIndex: true,
          showChat: false,
          hidePreBroadcastTextOverlay: false,
          layout: "playlist-to-right",
          relatedBroadcastsQuery: {
            l: 6,
          }
        });
      } catch(e) {
        widget.innerHTML = `<div style="padding:20px;color:#f7746a;font-family:monospace;font-size:12px;">Error loading player: ${e.message}</div>`;
      }
    }
  };
  document.head.appendChild(js);
}

// ─── CSS OUTPUT ───────────────────────────────────────────────────────────
function renderCodeOutput() {
  const lines = [];
  lines.push('/* BoxCast Player — Custom Styles */');
  lines.push('/* Generated by BoxCast Style Customizer */');
  lines.push('/* Add this CSS to your site stylesheet  */');
  lines.push('');

  let any = false;
  allElements().forEach(el => {
    const props = styles[el.id];
    if (!Object.keys(props).length) return;
    any = true;
    lines.push(`/* ${el.label} */`);
    lines.push(`${el.selector} {`);
    Object.entries(props).forEach(([p, v]) => { lines.push(`  ${p}: ${v} !important;`); });
    lines.push('}');
    lines.push('');
  });

  if (!any) {
    lines.push('/* No custom styles yet.            */');
    lines.push('/* ← Select an element to get started */');
  }

  document.getElementById('code-output').value = lines.join('\n');
}

function copyCSS() {
  navigator.clipboard.writeText(document.getElementById('code-output').value).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.textContent = '✓ Copied!';
    btn.classList.add('ok');
    setTimeout(() => { btn.textContent = 'Copy CSS'; btn.classList.remove('ok'); }, 2200);
  });
}

function downloadCSS() {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([document.getElementById('code-output').value], { type: 'text/css' }));
  a.download = 'boxcast-custom.css';
  a.click();
}

// ─── RESET ────────────────────────────────────────────────────────────────
function resetElement(id) {
  styles[id] = {};
  injectStyles();
  renderStyleControls(id);
  renderElementList();
  renderCodeOutput();
}

function resetAll() {
  allElements().forEach(el => { styles[el.id] = {}; });
  selectedId = null;
  injectStyles();
  renderElementList();
  renderCodeOutput();
  document.getElementById('emptyState').style.display = '';
  document.getElementById('styleControls').style.display = 'none';
}

// ─── THEME TOGGLE ────────────────────────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement;
  const isLight = html.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);

  const icon = document.getElementById('themeIcon');
  const label = document.getElementById('themeLabel');
  if (newTheme === 'light') {
    icon.textContent = '🌙';
    label.textContent = 'Dark';
  } else {
    icon.textContent = '☀️';
    label.textContent = 'Light';
  }

  // Update the code output textarea bg which is hardcoded
  const codeOut = document.getElementById('code-output');
  codeOut.style.background = newTheme === 'light' ? '#f5f7fc' : '';
  codeOut.style.color = newTheme === 'light' ? '#2a3a6e' : '';
}

// ─── HELPERS ─────────────────────────────────────────────────────────────
function toHex(val) {
  if (!val || val === 'none' || val === 'transparent') return '#000000';
  if (val.startsWith('#')) return val.length === 4
    ? '#' + val[1]+val[1]+val[2]+val[2]+val[3]+val[3]
    : val.substring(0, 7);
  if (val.startsWith('rgba') || val.startsWith('rgb')) {
    const m = val.match(/\d+/g);
    if (m && m.length >= 3) return '#' + [m[0],m[1],m[2]].map(n => parseInt(n).toString(16).padStart(2,'0')).join('');
  }
  return '#000000';
}

init();