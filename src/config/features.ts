import consolidatedSidebarJs from '../addons/consolidated-sidebar.js?raw'
import simplifiedDateJs from '../addons/simplified-date.js?raw'
import uiOverhaulCss from '../addons/ui-overhaul.css?raw'
import uiOverhaulJs from '../addons/ui-overhaul.js?raw'

// All customizable parts of the BoxCast player, organized as
// feature groups (left sidebar, first level) -> subfeatures (second level) -> style props (right sidebar).
//
// Selector notes (gathered by inspecting the rendered player, layout "playlist-to-right"):
// - The Document Box (also used for the cue point "Index") reuses `.boxcast-playlist.boxcast-well`, same as
//   the Playlist. Only the Playlist wraps its heading in a div (`.boxcast-well-title > div > h3`), so that's
//   how they're told apart. (Not `:has(iframe)`: with several documents it shows a list, not an iframe.)
// - The PDF itself renders in a cross-origin iframe, so only the box around it can be styled.
// - Chat bubbles and the message input only render while a chat session is live. Their selectors come
//   from the player's bundled CSS, not from an inspected live session.

export type PropInput =
  | { type: 'color'; default: string }
  | { type: 'range'; default: number; min: number; max: number; step: number }
  | { type: 'select'; default: string | number; options: { label: string; value: string | number }[] }
  | { type: 'toggle'; default: boolean }
  // Single number = all corners, or [top-left, top-right, bottom-right, bottom-left].
  // `clip` adds `overflow: hidden` to the same selector while any corner is rounded,
  // so children like the video don't bleed past the rounded corners.
  | { type: 'radius'; default: number | number[]; max: number; clip?: boolean }

export interface StyleProp {
  id: string
  group: string
  label: string
  cssSelector: string
  cssProperty: string
  input: PropInput
}

export interface Subfeature {
  id: string
  label: string
  description: string
  icon: string
  props: StyleProp[]
  // On/off features (Experimental): a fixed block of CSS and/or an add-on script
  presetCss?: string
  // `name` matches the key the script registers in `window.BoxcastAddons`
  addon?: Addon
  // Extra on/off switches within a subfeature that need an add-on script (CSS can't do them)
  options?: AddonOption[]
  // Enabling it resets every other customization and locks them while it's on
  exclusive?: boolean
}

export interface Addon {
  name: string
  js: string
}

export interface AddonOption {
  id: string
  label: string
  description: string
  addon: Addon
}

export const isToggleFeature = (s: Subfeature) => !!(s.presetCss || s.addon)

export interface FeatureGroup {
  id: string
  label: string
  description: string
  icon: string
  // Shown in the sidebar when the group only renders for some broadcasts
  renderNote?: string
  subfeatures: Subfeature[]
}

const borderStyleOptions = [
  { label: 'None', value: 'none' },
  { label: 'Solid', value: 'solid' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Dotted', value: 'dotted' },
]

const fontWeightOptions = [
  { label: 'Normal', value: 400 },
  { label: 'Bold', value: 700 },
]

// The UI Overhaul script carries its stylesheet, so sites only include one file.
// Escaped for a JS template literal.
const uiOverhaulAddonJs = uiOverhaulJs.replace(
  '__BXO_CSS__',
  // A function, so `$` sequences in the CSS aren't treated as replacement patterns
  () => '`\n' + uiOverhaulCss.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`'
)

const PLAYLIST = '.boxcast-playlist:has(> .boxcast-well-title > div > h3)'
const DOCUMENT = '.boxcast-playlist:not(:has(> .boxcast-well-title > div > h3))'
const DESCRIPTION = '.boxcast-with-playlist-to-right-col-1 > .boxcast-well'
const TICKET_BUTTON = '.boxcast-ticket > span:first-child > button.boxcast-ticket-button'
const DONATE_BUTTON = '.boxcast-ticket > span:nth-child(2) > button.boxcast-ticket-button'

export const featureGroups: FeatureGroup[] = [
  {
    id: 'player',
    label: 'Player',
    description: 'The video player and its controls.',
    icon: 'fluent:filmstrip-play-16-filled',
    subfeatures: [
      {
        id: 'player-frame',
        label: 'Frame',
        description: 'The element containing the video player.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Border',
            label: 'Color',
            id: 'player-frame-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-player-container',
            input: { type: 'color', default: '#000000' },
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'player-frame-border-width',
            cssProperty: 'border-width',
            cssSelector: '.boxcast-player-container',
            input: { type: 'range', default: 0, min: 0, max: 20, step: 1 },
          },
          {
            group: 'Border',
            label: 'Style',
            id: 'player-frame-border-style',
            cssProperty: 'border-style',
            cssSelector: '.boxcast-player-container',
            input: { type: 'select', default: 'none', options: borderStyleOptions },
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'player-frame-border-radius',
            cssProperty: 'border-radius',
            cssSelector: '.boxcast-player-container',
            input: { type: 'radius', default: 0, max: 64, clip: true },
          },
        ],
      },
      {
        id: 'player-controls',
        label: 'Player Controls',
        description: 'Seek bar and buttons shown while the video is active.',
        icon: 'fluent:video-play-pause-20-filled',
        props: [
          {
            group: 'Seek Bar',
            label: 'Handle Color',
            id: 'player-controls-scrubber-handle-color',
            cssProperty: 'background-color',
            cssSelector: '.bar-scrubber-icon',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Seek Bar',
            label: 'Progress Color',
            id: 'player-controls-scrubber-progress-color',
            cssProperty: 'background-color',
            cssSelector: '.bar-fill-2',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Seek Bar',
            label: 'Buffered Color',
            id: 'player-controls-scrubber-buffered-color',
            cssProperty: 'background-color',
            cssSelector: '.bar-fill-1',
            input: { type: 'color', default: '#888888' },
          },
        ],
      },
      {
        id: 'player-play-button',
        label: 'Initial Play Button',
        description: 'Centered play button shown before playback starts.',
        icon: 'fluent:play-circle-28-filled',
        props: [
          {
            group: 'Button',
            label: 'Color',
            id: 'player-play-button-bg-color',
            cssProperty: 'background-color',
            cssSelector: '#boxcast-big-play-button',
            input: { type: 'color', default: '#000000' },
          },
          {
            group: 'Button',
            label: 'Width',
            id: 'player-play-button-width',
            cssProperty: 'width',
            cssSelector: '#boxcast-big-play-button',
            input: { type: 'range', default: 80, min: 20, max: 200, step: 5 },
          },
          {
            group: 'Button',
            label: 'Height',
            id: 'player-play-button-height',
            cssProperty: 'height',
            cssSelector: '#boxcast-big-play-button',
            input: { type: 'range', default: 80, min: 20, max: 200, step: 5 },
          },
          {
            group: 'Icon',
            label: 'Color',
            id: 'player-play-button-icon-color',
            cssProperty: 'fill',
            cssSelector: '#boxcast-big-play-button > svg > path',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Icon',
            label: 'Width',
            id: 'player-play-button-icon-width',
            cssProperty: 'width',
            cssSelector: '#boxcast-big-play-button > svg',
            input: { type: 'range', default: 80, min: 20, max: 200, step: 5 },
          },
          {
            group: 'Icon',
            label: 'Height',
            id: 'player-play-button-icon-height',
            cssProperty: 'height',
            cssSelector: '#boxcast-big-play-button > svg',
            input: { type: 'range', default: 80, min: 20, max: 200, step: 5 },
          },
        ],
      },
    ],
  },
  {
    id: 'description',
    label: 'Description Box',
    description: 'Broadcast details below the player.',
    icon: 'fluent:text-description-16-filled',
    subfeatures: [
      {
        id: 'description-frame',
        label: 'Frame',
        description: 'The box containing the broadcast details.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Background',
            label: 'Color',
            id: 'description-frame-bg-color',
            cssProperty: 'background-color',
            cssSelector: DESCRIPTION,
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Border',
            label: 'Color',
            id: 'description-frame-border-color',
            cssProperty: 'border-color',
            cssSelector: DESCRIPTION,
            input: { type: 'color', default: '#dddddd' },
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'description-frame-border-width',
            cssProperty: 'border-width',
            cssSelector: DESCRIPTION,
            input: { type: 'range', default: 0, min: 0, max: 20, step: 1 },
          },
          {
            group: 'Border',
            label: 'Style',
            id: 'description-frame-border-style',
            cssProperty: 'border-style',
            cssSelector: DESCRIPTION,
            input: { type: 'select', default: 'none', options: borderStyleOptions },
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'description-frame-border-radius',
            cssProperty: 'border-radius',
            cssSelector: DESCRIPTION,
            input: { type: 'radius', default: 0, max: 64, clip: true },
          },
        ],
      },
      {
        id: 'description-title',
        label: 'Broadcast Title',
        description: 'Name of the broadcast.',
        icon: 'fluent:slide-text-title-16-filled',
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'description-title-color',
            cssProperty: 'color',
            cssSelector: 'h1.boxcast-title',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'description-title-font-size',
            cssProperty: 'font-size',
            cssSelector: 'h1.boxcast-title',
            input: { type: 'range', default: 24, min: 12, max: 48, step: 1 },
          },
          {
            group: 'Typography',
            label: 'Weight',
            id: 'description-title-font-weight',
            cssProperty: 'font-weight',
            cssSelector: 'h1.boxcast-title',
            input: { type: 'select', default: 400, options: fontWeightOptions },
          },
        ],
      },
      {
        id: 'description-text',
        label: 'Description',
        description: 'Description text of the broadcast.',
        icon: 'fluent:subtitles-20-filled',
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'description-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-description',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Typography',
            label: 'Link Color',
            id: 'description-text-link-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-description a',
            input: { type: 'color', default: '#006c80' },
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'description-text-font-size',
            cssProperty: 'font-size',
            cssSelector: '.boxcast-description, .boxcast-description > *',
            input: { type: 'range', default: 14, min: 10, max: 24, step: 1 },
          },
          {
            group: 'Typography',
            label: 'Weight',
            id: 'description-text-font-weight',
            cssProperty: 'font-weight',
            cssSelector: '.boxcast-description',
            input: { type: 'select', default: 400, options: fontWeightOptions },
          },
        ],
      },
      {
        id: 'description-datetime',
        label: 'Broadcast Date/Time',
        description: 'Scheduled start and stop times.',
        icon: 'fluent:clock-12-filled',
        options: [
          {
            id: 'description-datetime-simplified',
            label: 'Simplified Date',
            description: 'Show only the start date and time, e.g. "7/23/23 1:00pm".',
            addon: { name: 'simplified-date', js: simplifiedDateJs },
          },
        ],
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'description-datetime-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-start-stop',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'description-datetime-font-size',
            cssProperty: 'font-size',
            cssSelector: '.boxcast-start-stop',
            input: { type: 'range', default: 12, min: 10, max: 20, step: 1 },
          },
        ],
      },
      {
        id: 'description-donate-button',
        label: 'Donation Button',
        description: 'Shown when donations are enabled.',
        icon: 'fluent:heart-16-filled',
        props: [
          {
            group: 'Appearance',
            label: 'Background Color',
            id: 'description-donate-button-bg-color',
            cssProperty: 'background-color',
            cssSelector: DONATE_BUTTON,
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Appearance',
            label: 'Border Color',
            id: 'description-donate-button-border-color',
            cssProperty: 'border-color',
            cssSelector: DONATE_BUTTON,
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Appearance',
            label: 'Text Color',
            id: 'description-donate-button-text-color',
            cssProperty: 'color',
            cssSelector: DONATE_BUTTON,
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Appearance',
            label: 'Corner Radius',
            id: 'description-donate-button-border-radius',
            cssProperty: 'border-radius',
            cssSelector: DONATE_BUTTON,
            input: { type: 'radius', default: 4, max: 24 },
          },
        ],
      },
      {
        id: 'description-ticket-button',
        label: 'Ticket Purchase Button',
        description: 'Shown for ticketed broadcasts.',
        icon: 'fluent:ticket-20-filled',
        props: [
          {
            group: 'Appearance',
            label: 'Background Color',
            id: 'description-ticket-button-bg-color',
            cssProperty: 'background-color',
            cssSelector: TICKET_BUTTON,
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Appearance',
            label: 'Border Color',
            id: 'description-ticket-button-border-color',
            cssProperty: 'border-color',
            cssSelector: TICKET_BUTTON,
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Appearance',
            label: 'Text Color',
            id: 'description-ticket-button-text-color',
            cssProperty: 'color',
            cssSelector: TICKET_BUTTON,
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Appearance',
            label: 'Corner Radius',
            id: 'description-ticket-button-border-radius',
            cssProperty: 'border-radius',
            cssSelector: TICKET_BUTTON,
            input: { type: 'radius', default: 4, max: 24 },
          },
        ],
      },
      {
        id: 'description-brand-link',
        label: 'Brand Callback Button',
        description: '"Powered by BoxCast" link.',
        icon: 'fluent:link-16-filled',
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'description-brand-link-color',
            cssProperty: 'color',
            cssSelector: 'a.boxcast-linkback',
            input: { type: 'color', default: '#aaaaaa' },
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'description-brand-link-font-size',
            cssProperty: 'font-size',
            cssSelector: 'a.boxcast-linkback',
            input: { type: 'range', default: 10, min: 8, max: 20, step: 1 },
          },
        ],
      },
    ],
  },
  {
    id: 'playlist',
    label: 'Playlist',
    description: 'Other broadcasts in the channel.',
    icon: 'fluent:text-bullet-list-square-16-filled',
    subfeatures: [
      {
        id: 'playlist-frame',
        label: 'Frame',
        description: 'The box containing the playlist.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Background',
            label: 'Color',
            id: 'playlist-frame-bg-color',
            cssProperty: 'background-color',
            cssSelector: PLAYLIST,
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Border',
            label: 'Color',
            id: 'playlist-frame-border-color',
            cssProperty: 'border-color',
            cssSelector: PLAYLIST,
            input: { type: 'color', default: '#dddddd' },
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'playlist-frame-border-width',
            cssProperty: 'border-width',
            cssSelector: PLAYLIST,
            input: { type: 'range', default: 1, min: 0, max: 20, step: 1 },
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'playlist-frame-border-radius',
            cssProperty: 'border-radius',
            cssSelector: PLAYLIST,
            input: { type: 'radius', default: 0, max: 32, clip: true },
          },
        ],
      },
      {
        id: 'playlist-header',
        label: 'Header',
        description: 'Playlist heading text and search input.',
        icon: 'fluent:search-16-filled',
        props: [
          {
            group: 'Heading',
            label: 'Color',
            id: 'playlist-header-heading-color',
            cssProperty: 'color',
            cssSelector: `${PLAYLIST} > .boxcast-well-title h3`,
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Heading',
            label: 'Size',
            id: 'playlist-header-heading-font-size',
            cssProperty: 'font-size',
            cssSelector: `${PLAYLIST} > .boxcast-well-title h3`,
            input: { type: 'range', default: 18, min: 8, max: 32, step: 1 },
          },
          {
            group: 'Search Input',
            label: 'Background',
            id: 'playlist-header-search-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-playlist-search > input',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Search Input',
            label: 'Text',
            id: 'playlist-header-search-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-search > input',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Search Input',
            label: 'Placeholder',
            id: 'playlist-header-search-placeholder-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-search > input::placeholder',
            input: { type: 'color', default: '#999999' },
          },
          {
            group: 'Search Input',
            label: 'Border Color',
            id: 'playlist-header-search-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-playlist-search > input',
            input: { type: 'color', default: '#cccccc' },
          },
          {
            group: 'Search Input',
            label: 'Border Thickness',
            id: 'playlist-header-search-border-width',
            cssProperty: 'border-width',
            cssSelector: '.boxcast-playlist-search > input',
            input: { type: 'range', default: 1, min: 0, max: 8, step: 1 },
          },
          {
            group: 'Search Input',
            label: 'Corner Radius',
            id: 'playlist-header-search-border-radius',
            cssProperty: 'border-radius',
            cssSelector: '.boxcast-playlist-search > input',
            input: { type: 'radius', default: 12, max: 32 },
          },
          {
            group: 'Search Input',
            label: 'Width',
            id: 'playlist-header-search-width',
            cssProperty: 'width',
            cssSelector: '.boxcast-playlist-search > input',
            input: { type: 'range', default: 130, min: 0, max: 280, step: 10 },
          },
          {
            group: 'Search Input',
            label: 'Height',
            id: 'playlist-header-search-height',
            cssProperty: 'height',
            cssSelector: '.boxcast-playlist-search > input',
            input: { type: 'range', default: 28, min: 28, max: 64, step: 4 },
          },
          {
            group: 'Search Input',
            label: 'Font Size',
            id: 'playlist-header-search-font-size',
            cssProperty: 'font-size',
            cssSelector: '.boxcast-playlist-search > input',
            input: { type: 'range', default: 16, min: 8, max: 32, step: 1 },
          },
        ],
      },
      {
        id: 'playlist-videos',
        label: 'Video List',
        description: 'Rows with each broadcast thumbnail, title, description and air date.',
        icon: 'fluent:list-16-filled',
        props: [
          {
            group: 'Color',
            label: 'Title',
            id: 'playlist-videos-title-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-item-meta > h3, .boxcast-playlist-item-meta > h3 > a',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Color',
            label: 'Description',
            id: 'playlist-videos-description-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-item-meta > p:nth-of-type(1)',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Color',
            label: 'Air Date',
            id: 'playlist-videos-datetime-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-item-meta > p:nth-of-type(2)',
            input: { type: 'color', default: '#333333' },
          },
        ],
      },
      {
        id: 'playlist-footer',
        label: 'Footer',
        description: 'Pagination controls.',
        icon: 'fluent:arrow-next-12-filled',
        props: [
          {
            group: 'Color',
            label: 'Background',
            id: 'playlist-footer-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-page-controls',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Color',
            label: 'Page Label',
            id: 'playlist-footer-label-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-page-controls > span',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Color',
            label: 'Button Background',
            id: 'playlist-footer-button-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-page-controls > button',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Color',
            label: 'Button Text',
            id: 'playlist-footer-button-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-page-controls > button',
            input: { type: 'color', default: '#333333' },
          },
        ],
      },
    ],
  },
  {
    id: 'documents',
    label: 'Document Box',
    description: 'PDF viewer for documents attached to the broadcast.',
    icon: 'fluent:document-pdf-16-filled',
    renderNote: 'Only rendered when the playing broadcast has documents attached.',
    subfeatures: [
      {
        id: 'documents-frame',
        label: 'Frame',
        description: 'The box around the PDF viewer. The PDF itself cannot be styled.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Background',
            label: 'Color',
            id: 'documents-frame-bg-color',
            cssProperty: 'background-color',
            cssSelector: DOCUMENT,
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Border',
            label: 'Color',
            id: 'documents-frame-border-color',
            cssProperty: 'border-color',
            cssSelector: DOCUMENT,
            input: { type: 'color', default: '#dddddd' },
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'documents-frame-border-width',
            cssProperty: 'border-width',
            cssSelector: DOCUMENT,
            input: { type: 'range', default: 1, min: 0, max: 20, step: 1 },
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'documents-frame-border-radius',
            cssProperty: 'border-radius',
            cssSelector: DOCUMENT,
            input: { type: 'radius', default: 0, max: 32, clip: true },
          },
        ],
      },
      {
        id: 'documents-title',
        label: 'File Name',
        description: 'Document file name shown above the viewer.',
        icon: 'fluent:text-16-filled',
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'documents-title-color',
            cssProperty: 'color',
            cssSelector: `${DOCUMENT} > .boxcast-well-title h3`,
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'documents-title-font-size',
            cssProperty: 'font-size',
            cssSelector: `${DOCUMENT} > .boxcast-well-title h3`,
            input: { type: 'range', default: 18, min: 8, max: 32, step: 1 },
          },
        ],
      },
    ],
  },
  {
    id: 'chat',
    label: 'Chat Box',
    description: 'Viewer chat for the broadcast.',
    icon: 'fluent:people-chat-20-filled',
    renderNote: 'Only rendered when Viewer Chat is enabled for the playing broadcast.',
    subfeatures: [
      {
        id: 'chat-frame',
        label: 'Frame',
        description: 'The chat box and its "Chat" header.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Background',
            label: 'Color',
            id: 'chat-frame-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-chat--shell, .boxcast-chat--msgcontainer',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Border',
            label: 'Color',
            id: 'chat-frame-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-chat--shell',
            input: { type: 'color', default: '#dddddd' },
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'chat-frame-border-width',
            cssProperty: 'border-width',
            cssSelector: '.boxcast-chat--shell',
            input: { type: 'range', default: 1, min: 0, max: 16, step: 1 },
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'chat-frame-border-radius',
            cssProperty: 'border-radius',
            cssSelector: '.boxcast-chat--shell',
            input: { type: 'radius', default: 0, max: 32, clip: true },
          },
          {
            group: 'Header',
            label: 'Text Color',
            id: 'chat-frame-header-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-chat--shell > .boxcast-well-title > h3',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Header',
            label: 'Text Size',
            id: 'chat-frame-header-font-size',
            cssProperty: 'font-size',
            cssSelector: '.boxcast-chat--shell > .boxcast-well-title > h3',
            input: { type: 'range', default: 18, min: 8, max: 32, step: 1 },
          },
        ],
      },
      {
        id: 'chat-messages',
        label: 'Messages',
        description: 'Chat message bubbles.',
        icon: 'fluent:chat-16-filled',
        props: [
          {
            group: 'Bubble',
            label: 'Background',
            id: 'chat-messages-bubble-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-chat--msgcontainer .boxcast-chat--msg',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Bubble',
            label: 'Radius',
            id: 'chat-messages-bubble-border-radius',
            cssProperty: 'border-radius',
            cssSelector: '.boxcast-chat--msgcontainer .boxcast-chat--msg',
            input: { type: 'radius', default: 4, max: 24 },
          },
          {
            group: 'Text',
            label: 'Name Color',
            id: 'chat-messages-name-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-chat--msg .boxcast-chat--name',
            input: { type: 'color', default: '#333333' },
          },
          {
            group: 'Text',
            label: 'Message Color',
            id: 'chat-messages-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-chat--msg .boxcast-chat--text',
            input: { type: 'color', default: '#333333' },
          },
        ],
      },
      {
        id: 'chat-input',
        label: 'Message Input',
        description: 'Field for viewers to type and send messages.',
        icon: 'fluent:textbox-16-regular',
        props: [
          {
            group: 'Container',
            label: 'Background',
            id: 'chat-input-container-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-chat--inputcontainer',
            input: { type: 'color', default: '#fafafa' },
          },
          {
            group: 'Text Field',
            label: 'Background',
            id: 'chat-input-field-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-chat--form input[type=text]',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Text Field',
            label: 'Text Color',
            id: 'chat-input-field-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-chat--form input[type=text]',
            input: { type: 'color', default: '#333333' },
          },
        ],
      },
    ],
  },
  {
    id: 'experimental',
    label: 'Experimental',
    description: 'Layout changes that go beyond the default player design.',
    icon: 'fluent:beaker-16-filled',
    subfeatures: [
      {
        id: 'experimental-ui-overhaul',
        label: 'UI Overhaul',
        description:
          'A complete modern redesign of the player: tabbed sidebar, refreshed details and playlist. Not further customizable.',
        icon: 'fluent:sparkle-20-filled',
        exclusive: true,
        addon: { name: 'ui-overhaul', js: uiOverhaulAddonJs },
        props: [],
      },
      {
        id: 'experimental-description-layout',
        label: 'New Description Layout',
        description: 'YouTube-style order: title + resolution badge, date + buttons, description, then BoxCast link.',
        icon: 'fluent:layout-row-three-20-filled',
        props: [],
        // A wrapping flex row (not a column) so title/badge and date/buttons can share a line.
        // `::before` acts as the line break after the title row; the player doesn't use it on this element.
        presetCss: `${DESCRIPTION} {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: center !important;
  column-gap: 10px !important;
}
${DESCRIPTION}::before {
  content: '' !important;
  order: 3 !important;
  flex-basis: 100% !important;
  height: 0 !important;
}
${DESCRIPTION} > * {
  order: 9 !important;
  margin: 0 !important;
}
${DESCRIPTION} > h1.boxcast-title {
  order: 1 !important;
}
${DESCRIPTION} > aside {
  order: 2 !important;
}
${DESCRIPTION} > aside dd {
  margin: 0 !important;
}
${DESCRIPTION} > .boxcast-start-stop {
  order: 4 !important;
  margin-top: 8px !important;
}
${DESCRIPTION} > .boxcast-ticket {
  order: 5 !important;
  margin-top: 8px !important;
}
${DESCRIPTION} > .boxcast-description {
  order: 7 !important;
  flex-basis: 100% !important;
  margin-top: 12px !important;
}
${DESCRIPTION} > .boxcast-linkback {
  order: 10 !important;
  flex-basis: 100% !important;
  margin-top: 12px !important;
}`,
      },
      {
        id: 'experimental-consolidated-sidebar',
        label: 'Consolidated Sidebar',
        description:
          'Shows Playlist, Documents and Chat one at a time with tabs, matching the height of the player + description.',
        icon: 'fluent:tab-desktop-20-filled',
        addon: { name: 'consolidated-sidebar', js: consolidatedSidebarJs },
        props: [
          {
            group: 'Tab Bar',
            label: 'Background',
            id: 'experimental-consolidated-sidebar-bar-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.bx-tabs',
            input: { type: 'color', default: '#f5f5f5' },
          },
          {
            group: 'Tab Bar',
            label: 'Border Color',
            id: 'experimental-consolidated-sidebar-bar-border-color',
            cssProperty: 'border-color',
            cssSelector: '.bx-tabs',
            input: { type: 'color', default: '#bfbfbf' },
          },
          {
            group: 'Tabs',
            label: 'Text',
            id: 'experimental-consolidated-sidebar-tab-text-color',
            cssProperty: 'color',
            cssSelector: '.bx-tabs .bx-tab',
            input: { type: 'color', default: '#555555' },
          },
          {
            group: 'Tabs',
            label: 'Active Background',
            id: 'experimental-consolidated-sidebar-active-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.bx-tabs .bx-tab[aria-selected="true"]',
            input: { type: 'color', default: '#00a3bb' },
          },
          {
            group: 'Tabs',
            label: 'Active Text',
            id: 'experimental-consolidated-sidebar-active-text-color',
            cssProperty: 'color',
            cssSelector: '.bx-tabs .bx-tab[aria-selected="true"]',
            input: { type: 'color', default: '#ffffff' },
          },
          {
            group: 'Tabs',
            label: 'Corner Radius',
            id: 'experimental-consolidated-sidebar-tab-border-radius',
            cssProperty: 'border-radius',
            cssSelector: '.bx-tabs .bx-tab',
            input: { type: 'radius', default: 4, max: 16 },
          },
        ],
      },
      {
        id: 'experimental-zero-gaps',
        label: 'Zero Gaps',
        description: 'Removes the spacing between the player, description box, playlist, chat, etc.',
        icon: 'fluent:arrow-minimize-20-filled',
        props: [],
        presetCss: `.boxcast-with-playlist-to-right-col-1 {
  padding: 0 !important;
}
.boxcast-with-playlist-to-right-col-2 {
  margin: 0 !important;
  padding: 0 !important;
}
.boxcast-boxoffice .boxcast-well,
.boxcast-boxoffice .bx-tabs {
  margin: 0 !important;
}`,
      },
      {
        id: 'experimental-playlist-header',
        label: 'New Playlist Design',
        description: 'Moves the search bar below the "Related Videos" heading, at full width.',
        icon: 'fluent:text-bullet-list-square-search-20-filled',
        props: [],
        // The heading and search wrappers are positioned with inline `float` styles
        presetCss: `${PLAYLIST} > .boxcast-well-title {
  display: flex !important;
  flex-direction: column !important;
  gap: 8px !important;
}
${PLAYLIST} > .boxcast-well-title > div {
  float: none !important;
}
${PLAYLIST} > .boxcast-well-title > br {
  display: none !important;
}
${PLAYLIST} .boxcast-playlist-search,
${PLAYLIST} .boxcast-playlist-search > input {
  width: 100% !important;
}`,
      },
    ],
  },
]

export const findSubfeature = (id: string | null) =>
  featureGroups.flatMap((g) => g.subfeatures).find((s) => s.id === id) ?? null
