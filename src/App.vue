<script setup lang="ts">
/// src/App.vue
import { Icon } from '@iconify/vue'
import { ref, onMounted, computed } from 'vue'
import BoxcastPlayer from './components/BoxcastPlayer.vue'
import { useResizable } from './composables/useResizable'
import { useCssGenerator } from './composables/useCssGenerator'
import ListItem from './components/ListItem.vue'
import PropertiesPanel from './components/PropertiesPanel.vue'
import { useUiStore } from './stores/ui'

const store = useUiStore()

const featureHandle = useResizable(35)
const cssHandle = useResizable(75)

const maxCssLines = 50
const truncatedCss = computed(() => {
  const lines = store.cssOutput.split('\n')
  if (lines.length > maxCssLines) {
    return [...lines.slice(0, maxCssLines), '/* ...output truncated */'].join('\n')
  }
  return store.cssOutput
})

const playerComponents = ref([
  {
    label: 'Video Player',
    id: 'video-player',
    description: 'The video player itself.',
    icon: 'fluent:filmstrip-play-16-filled',
    features: [
      {
        label: 'Container',
        id: 'video-player-container',
        description: 'The container for the video player.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Border',
            label: 'Color',
            id: 'video-player-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-player-container',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'video-player-border-thickness',
            cssProperty: 'border-width',
            cssSelector: '.boxcast-player-container',
            input: {
              type: 'range',
              default: 0,
              min: 0,
              max: 20,
              step: 1
            }
          },
          {
            group: 'Border',
            label: 'Style',
            id: 'video-player-border-style',
            cssProperty: 'border-style',
            cssSelector: '.boxcast-player-container',
            input: {
              type: 'select',
              default: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Solid', value: 'solid' },
                { label: 'Dashed', value: 'dashed' },
                { label: 'Dotted', value: 'dotted' },
              ]
            }
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'video-player-border-radius',
            cssProperty: 'border-radius',
            cssSelector: '.boxcast-player-container',
            input: {
              type: 'range',
              default: 0,
              min: 0,
              max: 64,
              step: 4
            }
          },
          {
            group: 'Border',
            label: 'Clip Overflow',
            id: 'video-player-clip-overflow',
            cssProperty: 'overflow',
            cssSelector: '.boxcast-player-container',
            input: {
              type: 'toggle',
              default: false
            }
          }
        ]
      },
      {
        label: 'Large Play Button',
        id: 'large-play-button',
        description: 'Play button visible when player first loads.',
        icon: 'fluent:play-circle-28-filled',
        props: [
          {
            group: 'Button',
            label: 'Color',
            id: 'play-button-bg-color',
            cssProperty: 'background-color',
            cssSelector: '#boxcast-big-play-button',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Button',
            label: 'Width',
            id: 'play-button-width',
            cssProperty: 'width',
            cssSelector: '#boxcast-big-play-button',
            input: {
              type: 'range',
              default: 80,
              min: 20,
              max: 200,
              step: 5
            }
          },
          {
            group: 'Button',
            label: 'Height',
            id: 'play-button-height',
            cssProperty: 'height',
            cssSelector: '#boxcast-big-play-button',
            input: {
              type: 'range',
              default: 80,
              min: 20,
              max: 200,
              step: 5
            }
          },
          {
            group: 'Icon',
            label: 'Color',
            id: 'play-button-icon-color',
            cssProperty: 'fill',
            cssSelector: '#boxcast-big-play-button > svg > path',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Icon',
            label: 'Width',
            id: 'play-button-icon-width',
            cssProperty: 'width',
            cssSelector: '#boxcast-big-play-button > svg',
            input: {
              type: 'range',
              default: 80,
              min: 20,
              max: 200,
              step: 5
            }
          },
          {
            group: 'Icon',
            label: 'Height',
            id: 'play-button-icon-height',
            cssProperty: 'height',
            cssSelector: '#boxcast-big-play-button > svg',
            input: {
              type: 'range',
              default: 80,
              min: 20,
              max: 200,
              step: 5
            }
          }
        ]
      },
      {
        label: 'Controls',
        id: 'video-player-controls',
        description: 'Controls visible when player is active.',
        icon: 'fluent:video-play-pause-20-filled',
        props: [
          {
            group: 'Scrubber',
            label: 'Handle Color',
            id: 'controls-scrubber-handle-color',
            cssProperty: 'background-color',
            cssSelector: '.bar-scrubber-icon',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Scrubber',
            label: 'Progress Color',
            id: 'controls-scrubber-progress-color',
            cssProperty: 'background-color',
            cssSelector: '.bar-fill-2',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Scrubber',
            label: 'Buffered Color',
            id: 'controls-scrubber-buffered-color',
            cssProperty: 'background-color',
            cssSelector: '.bar-fill-1',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          }
        ]
      },
    ],
  },
  {
    label: 'Description Box',
    id: 'description-box',
    description: 'The description box below the video player.',
    icon: 'fluent:text-description-16-filled',
    features: [
      {
        label: 'Container',
        id: 'description-box-container',
        description: 'The container for the description box.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Border',
            label: 'Color',
            id: 'description-box-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-with-playlist-to-right-col-1 > .boxcast-well',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'description-box-border-thickness',
            cssProperty: 'border-width',
            cssSelector: '.boxcast-with-playlist-to-right-col-1 > .boxcast-well',
            input: {
              type: 'range',
              default: 0,
              min: 0,
              max: 20,
              step: 1
            }
          },
          {
            group: 'Border',
            label: 'Style',
            id: 'description-box-border-style',
            cssProperty: 'border-style',
            cssSelector: '.boxcast-with-playlist-to-right-col-1 > .boxcast-well',
            input: {
              type: 'select',
              default: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Solid', value: 'solid' },
                { label: 'Dashed', value: 'dashed' },
                { label: 'Dotted', value: 'dotted' },
              ]
            }
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'description-box-border-radius',
            cssProperty: 'border-radius',
            cssSelector: '.boxcast-with-playlist-to-right-col-1 > .boxcast-well',
            input: {
              type: 'range',
              default: 0,
              min: 0,
              max: 64,
              step: 4
            }
          },
          {
            group: 'Background',
            label: 'Color',
            id: 'description-box-background-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-with-playlist-to-right-col-1 > .boxcast-well',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.1)'
            }
          }
        ]
      },
      {
        label: 'Broadcast Title',
        id: 'description-broadcast-title',
        description: 'Name of the broadcast',
        icon: 'fluent:slide-text-title-16-filled',
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'broadcast-title-color',
            cssProperty: 'color',
            cssSelector: 'h1.boxcast-title',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.9)'
            }
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'broadcast-title-size',
            cssProperty: 'font-size',
            cssSelector: 'h1.boxcast-title',
            input: {
              type: 'range',
              default: 24,
              min: 12,
              max: 48,
              step: 1
            }
          },
          {
            group: 'Typography',
            label: 'Weight',
            id: 'broadcast-title-weight',
            cssProperty: 'font-weight',
            cssSelector: 'h1.boxcast-title',
            input: {
              type: 'select',
              default: 400,
              options: [
                { label: 'Normal', value: 400 },
                { label: 'Bold', value: 700 },
              ]
            }
          }
        ]
      },
      {
        label: 'Broadcast Description',
        id: 'description-broadcast-description',
        description: 'The description text for the broadcast.',
        icon: 'fluent:subtitles-20-filled',
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'broadcast-description-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-description',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.8)'
            }
          },
          {
            group: 'Typography',
            label: 'Link Color',
            id: 'broadcast-description-link-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-description > * a',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.8)'
            }
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'broadcast-description-size',
            cssProperty: 'font-size',
            cssSelector: '.boxcast-description > *',
            input: {
              type: 'range',
              default: 14,
              min: 10,
              max: 24,
              step: 1
            }
          },
          {
            group: 'Typography',
            label: 'Weight',
            id: 'broadcast-description-weight',
            cssProperty: 'font-weight',
            cssSelector: '.boxcast-description',
            input: {
              type: 'select',
              default: 400,
              options: [
                { label: 'Normal', value: 400 },
                { label: 'Bold', value: 700 },
              ]
            }
          }
        ]
      },
      {
        label: "Start/Stop Times",
        id: 'description-start-stop-times',
        description: 'The scheduled start and stop times for the broadcast.',
        icon: 'fluent:clock-12-filled',
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'start-stop-times-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-start-stop',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.8)'
            }
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'start-stop-times-size',
            cssProperty: 'font-size',
            cssSelector: '.boxcast-start-stop',
            input: {
              type: 'range',
              default: 12,
              min: 10,
              max: 20,
              step: 1
            }
          }
        ]
      },
      {
        label: "Ticket Button",
        id: 'description-ticket-button',
        description: 'The ticket button for the broadcast.',
        icon: 'fluent:ticket-20-filled',
        props: [
          {
            group: 'Appearance',
            label: 'Background Color',
            id: 'ticket-button-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-ticket > span:first-child > button.boxcast-ticket-button',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Appearance',
            label: 'Border Color',
            id: 'ticket-button-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-ticket > span:first-child > button.boxcast-ticket-button',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Appearance',
            label: 'Text Color',
            id: 'ticket-button-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-ticket > span:first-child > button.boxcast-ticket-button',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          }
        ]
      },
      {
        label: "Donate Button",
        id: 'description-donate-button',
        description: 'The donate button for the broadcast.',
        icon: 'fluent:heart-16-filled',
        props: [
          {
            group: 'Appearance',
            label: 'Background Color',
            id: 'donate-button-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-ticket > span:nth-child(2) > button.boxcast-ticket-button',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Appearance',
            label: 'Border Color',
            id: 'donate-button-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-ticket > span:nth-child(2) > button.boxcast-ticket-button',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Appearance',
            label: 'Text Color',
            id: 'donate-button-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-ticket > span:nth-child(2) > button.boxcast-ticket-button',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          }
        ]
      },
    ],
  },
  {
    label: 'Related Videos',
    id: 'related-videos',
    description: 'The playlist for viewing other broadcasts in the channel.',
    icon: 'fluent:text-bullet-list-square-16-filled',
    features: [
      {
        label: 'Container',
        id: 'playlist-container',
        description: 'The container for the related videos playlist.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Background',
            label: 'Color',
            id: 'playlist-bg-color',
            cssProperty: 'background-color',
            cssSelector: 'div.boxcast-playlist',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Border',
            label: 'Color',
            id: 'playlist-border-color',
            cssProperty: 'border-color',
            cssSelector: 'div.boxcast-playlist',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'playlist-border-thickness',
            cssProperty: 'border-width',
            cssSelector: 'div.boxcast-playlist',
            input: {
              type: 'range',
              default: 1,
              min: 0,
              max: 20,
              step: 1
            }
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'playlist-border-radius',
            cssProperty: 'border-radius',
            cssSelector: 'div.boxcast-playlist',
            input: {
              type: 'range',
              default: 1,
              min: 0,
              max: 20,
              step: 1
            }
          },
          {
            group: 'Border',
            label: 'Clip Overflow',
            id: 'playlist-clip-overflow',
            cssProperty: 'overflow',
            cssSelector: 'div.boxcast-playlist',
            input: {
              type: 'toggle',
              default: false
            }
          }
        ]
      },
      {
        label: 'Heading Text',
        id: 'playlist-heading-text',
        description: "'Related Videos text'",
        icon: 'fluent:text-16-filled',
        props: [
          {
            group: 'Typography',
            label: 'Color',
            id: 'playlist-heading-color',
            cssProperty: 'color',
            cssSelector: 'div.boxcast-playlist > .boxcast-well-title > div > h3',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.9)'
            }
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'playlist-heading-size',
            cssProperty: 'font-size',
            cssSelector: 'div.boxcast-playlist > .boxcast-well-title > div > h3',
            input: {
              type: 'range',
              default: 18,
              min: 8,
              max: 32,
              step: 2,
            }
          }
        ]
      },
      {
        label: 'Search Bar',
        id: 'playlist-search-bar',
        description: 'The search bar for filtering related videos.',
        icon: 'fluent:search-16-filled',
        props: [
          {
            group: 'Spacing',
            label: 'Horizontal Padding',
            id: 'playlist-search-padding',
            cssProperty: 'padding-inline',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'range',
              default: 0,
              min: 0,
              max: 32,
              step: 1
            }
          },
          {
            group: 'Spacing',
            label: 'Vertical Padding',
            id: 'playlist-search-padding-vertical',
            cssProperty: 'padding-block',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'range',
              default: 0,
              min: 0,
              max: 32,
              step: 1
            }
          },
          {
            group: 'Spacing',
            label: 'Width',
            id: 'playlist-search-width',
            cssProperty: 'width',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'range',
              default: 130,
              min: 0,
              max: 280,
              step: 10
            }
          },
          {
            group: 'Spacing',
            label: 'Height',
            id: 'playlist-search-height',
            cssProperty: 'height',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'range',
              default: 28,
              min: 28,
              max: 64,
              step: 4
            }
          },
          {
            group: 'Color',
            label: 'Background',
            id: 'playlist-search-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Color',
            label: 'Text',
            id: 'playlist-search-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Color',
            label: 'Placeholder',
            id: 'playlist-search-placeholder-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-search > input::placeholder',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.25)'
            }
          },
          {
            group: 'Color',
            label: 'Border',
            id: 'playlist-search-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.25)'
            }
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'playlist-search-border-width',
            cssProperty: 'border-width',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'range',
              default: 1,
              min: 0,
              max: 8,
              step: 1
            }
          },
          {
            group: 'Typography',
            label: 'Font Size',
            id: 'playlist-search-text-size',
            cssProperty: 'font-size',
            cssSelector: '.boxcast-playlist-search > input',
            input: {
              type: 'range',
              default: 16,
              min: 8,
              max: 32,
              step: 1
            }
          }
        ]
      },
      {
        label: 'Playlist Items',
        id: 'playlist-items',
        description: 'The list of related videos.',
        icon: 'fluent:list-16-filled',
        props: [
          {
            group: 'Color',
            label: 'Broadcast Title',
            id: 'playlist-item-title-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-item-meta > h3',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.9)'
            }
          },
          {
            group: 'Color',
            label: 'Broadcast Description',
            id: 'playlist-item-description-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-item-meta > p:nth-child(2)',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.9)'
            }
          },
          {
            group: 'Color',
            label: 'Broadcast Date-Time',
            id: 'playlist-item-datetime-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-playlist-item-meta > p:nth-child(3)',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.9)'
            }
          }
        ]
      },
      {
        label: 'Pagination Controls',
        id: 'playlist-pagination-controls',
        description: 'The pagination controls for the playlist.',
        icon: 'fluent:arrow-next-12-filled',
        props: [
          {
            group: 'Color',
            label: 'Background',
            id: 'playlist-pagination-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-page-controls',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Color',
            label: 'Label',
            id: 'playlist-pagination-label-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-page-controls > span',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Color',
            label: 'Button Background',
            id: 'playlist-pagination-button-bg-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-page-controls > a',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Color',
            label: 'Button Text',
            id: 'playlist-pagination-button-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-page-controls > a',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
        ]
      },
    ],
  },
  {
    label: 'Viewer Chat',
    id: 'viewer-chat',
    description: 'The window for viewer chat messages.',
    icon: 'fluent:people-chat-20-filled',
    features: [
      {
        label: 'Container',
        id: 'chat-container',
        description: 'The container for the viewer chat.',
        icon: 'fluent:frame-16-regular',
        props: [
          {
            group: 'Border',
            label: 'Color',
            id: 'chat-border-color',
            cssProperty: 'border-color',
            cssSelector: '.boxcast-chat--shell',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Border',
            label: 'Radius',
            id: 'chat-border-radius',
            cssProperty: 'border-radius',
            cssSelector: '.boxcast-chat--shell',
            input: {
              type: 'range',
              default: 0,
              min: 0,
              max: 16,
              step: 1
            }
          },
          {
            group: 'Border',
            label: 'Thickness',
            id: 'chat-border-width',
            cssProperty: 'border-width',
            cssSelector: '.boxcast-chat--shell',
            input: {
              type: 'range',
              default: 1,
              min: 0,
              max: 16,
              step: 1
            }
          },
          {
            group: 'Background',
            label: 'Color',
            id: 'chat-background-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-chat--shell, .boxcast-chat--msgcontainer',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          }
        ]
      },
      {
        label: 'Header',
        id: 'chat-header',
        description: 'The header for the viewer chat.',
        icon: 'fluent:text-16-filled',
        props: [
          {
            group: 'Layout',
            label: 'Flex Alignment',
            id: 'chat-header-alignment',
            cssProperty: 'align-items',
            cssSelector: '.boxcast-chat--shell > .boxcast-well-title',
            input: {
              type: 'select',
              default: 'start',
              options: [
                { label: 'Start', value: 'start' },
                { label: 'Center', value: 'center' },
                { label: 'End', value: 'end' },
              ]
            }
          },
          {
            group: 'Typography',
            label: 'Color',
            id: 'chat-header-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-chat--shell > .boxcast-well-title > h3',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.9)'
            }
          },
          {
            group: 'Typography',
            label: 'Size',
            id: 'chat-header-size',
            cssProperty: 'font-size',
            cssSelector: '.boxcast-chat--shell > .boxcast-well-title > h3',
            input: {
              type: 'range',
              default: 18,
              min: 8,
              max: 32,
              step: 2,
            }
          }
        ]
      },
      {
        label: 'Messages',
        id: 'chat-messages',
        description: 'The viewer chat messages.',
        icon: 'fluent:chat-16-filled',
        props: [
          {
            group: 'Color',
            label: 'Bubble',
            id: 'chat-message-bubble-color',
            cssProperty: 'background-color',
            cssSelector: '.boxcast-chat--msgcontainer .boxcast-chat--msg',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          },
          {
            group: 'Color',
            label: 'Message Text',
            id: 'chat-message-text-color',
            cssProperty: 'color',
            cssSelector: '.boxcast-chat--msg:not(strong)',
            input: {
              type: 'color',
              default: 'hsla(0, 0, 0, 0.5)'
            }
          }
        ]
      }
    ]
  },
  {
    label: 'Experimental',
    id: 'experimental-features',
    description: 'Features that are in development or testing.',
    icon: 'fluent:beaker-16-filled',
    features: [
      {
        label: 'No Gaps',
        id: 'experimental-no-gaps',
        description: 'Removes gaps between player components for a more seamless look.',
        icon: 'fluent:eraser-20-filled'
      },
      {
        label: 'Modern Description Order',
        id: 'experimental-modern-description-order',
        description: 'Reorders the description box elements for a more modern look.',
        icon: 'fluent:layout-row-three-20-filled'
      }
    ]
  }
])

// Initialize CSS generator
const { generateCss } = useCssGenerator(playerComponents.value)

function handleComponentClick(comp: any) {
  if(store.selectedComponent.id === comp.id) {
    store.selectedComponent = {}
    store.selectedFeature = {}
    return
  }
  store.selectedComponent = comp
  store.selectedFeature = {}
}

function handleFeatureClick(feature: any) {
  if(store.selectedFeature.id === feature.id) {
    store.selectedFeature = {}
    return
  }
  store.selectedFeature = feature
}

function handleResetFeature(featureId: string) {
  store.resetFeature(featureId)
  generateCss()
}

function togglePreviewTheme() {
  store.togglePreviewTheme()
}

function handleResetAll() {
  store.resetAll()
  generateCss()
}

function handleCopyCss() {
  navigator.clipboard.writeText(store.cssOutput)
}

function handleDownloadCss() {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(store.cssOutput))
  element.setAttribute('download', 'custom-styles.css')
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

function dismissDisclaimer() {
  const disclaimer = document.getElementById('support-disclaimer')
  if (disclaimer) {
    disclaimer.style.display = 'none'
  }
}
</script>

<template>
  <!-- 2-column layout discalimer -->
  <div id="support-disclaimer" class="text-slate-50 absolute left-1/4 top-2 right-1/4 bg-cyan-600 shadow-md shadow-cyan-800 rounded-md p-3 flex justify-between">
    <p class="text-center"><span class="font-bold">NOTE:</span> Only the 2-Column player layout is supported at this time.</p>
    <button @click="dismissDisclaimer" class="cursor-pointer hover:bg-cyan-800 p-1 rounded-lg">
      <Icon icon="fluent:dismiss-12-filled"/>
    </button>
  </div>
  <div class="flex h-screen flex-col">
    <header class="flex items-center justify-between border-b border-slate-700 bg-slate-900 px-4 py-2 text-slate-50">
      <div class="flex items-center gap-2">
        <Icon
          class="text-bxblue"
          icon="fluent:code-16-filled" />
        <h1 class="text-bxblue">Embed Style Editor</h1>
        <span>|</span>
        <h2>CSS Generator</h2>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="togglePreviewTheme"
          class="flex cursor-pointer items-center gap-2 rounded-md border border-cyan-700 bg-cyan-900 px-2 py-1 text-cyan-300 transition-all hover:border-cyan-400 hover:bg-cyan-800 hover:text-cyan-100">
          <Icon icon="fluent:dark-theme-20-filled" />
          Preview Background
        </button>
        <button
          @click="handleResetAll"
          class="flex cursor-pointer items-center gap-2 rounded-md border border-red-700 bg-red-900 px-2 py-1 text-red-300 transition-all hover:border-red-400 hover:bg-red-800 hover:text-red-100">
          <Icon icon="fluent:arrow-reset-24-filled" />
          Reset All
        </button>
      </div>
    </header>

    <!-- main grid -->
    <main class="grid flex-1 grid-cols-[2fr_8fr_2fr] text-slate-50">
      <!-- left sidebar -->
      <aside
        :ref="(el) => (featureHandle.containerRef.value = el as HTMLElement)"
        class="flex flex-col min-w-0">
        <!-- components panel -->
        <section
          class="flex flex-col bg-slate-800"
          :style="{ height: featureHandle.topHeight.value + '%' }">
          <h3 class="text-bxblue border-b border-slate-700 bg-slate-900 px-4 py-2">Components</h3>
          <div class="flex flex-col overflow-y-auto">
            <ListItem
              v-for="component in playerComponents"
              :key="component.label"
              :item-name="component.label"
              :item-description="component.description"
              :item-icon="component.icon"
              :component="component"
              :is-selected="component.id === store.selectedComponent.id"
              @click="handleComponentClick(component)" />
          </div>
        </section>

        <!-- drag handle -->
        <div
          class="group relative z-10 flex h-1.5 cursor-row-resize items-center justify-center bg-slate-700 transition-all hover:py-2"
          :class="featureHandle.isDragging.value ? 'bg-purple-500!' : ''"
          @mousedown="featureHandle.onMouseDown"
          @dblclick="featureHandle.onDblClick">
          <!-- grip indicator -->
          <div class="flex gap-0.5 opacity-50 group-hover:opacity-100">
            <span class="h-0.5 w-3 rounded-full bg-slate-300" />
            <span class="h-0.5 w-3 rounded-full bg-slate-300" />
          </div>
        </div>

        <!-- features panel -->
        <section class="flex flex-1 flex-col overflow-hidden bg-slate-800">
          <h3 class="text-bxblue border-b border-slate-700 bg-slate-900 px-4 py-2">Features</h3>
          <div
            v-if="Object.keys(store.selectedComponent).length === 0"
            class="flex flex-1 flex-col items-center justify-center gap-4 text-slate-500">
            <Icon
              icon="fluent:arrow-up-32-filled"
              class="size-16" />
            <p>Select an embed component</p>
          </div>
          <div v-else class="flex flex-col overflow-y-auto">
            <ListItem
              v-for="feature in store.selectedComponent.features"
              :key="feature.label"
              :item-name="feature.label"
              :item-icon="feature.icon || 'fluent:star-16-filled'"
              :item-description="feature.description"
              :item-id="feature.id"
              :is-selected="feature.id === store.selectedFeature.id"
              @click="handleFeatureClick(feature)"/>
          </div>
        </section>
      </aside>

      <!-- player preview -->
      <div class="flex gap-8 items-center justify-center p-4 text-black" :class="store.previewThemeDark ? 'bg-slate-950' : 'bg-slate-100'">
        <BoxcastPlayer class="flex-1" />
      </div>

      <!-- right sidebar -->
      <aside
        :ref="(el) => (cssHandle.containerRef.value = el as HTMLElement)"
        class="flex flex-col min-w-0">
        <!-- properties panel -->
        <section
          class="flex flex-col bg-slate-800"
          :style="{ height: cssHandle.topHeight.value + '%' }">
          <h3 class="text-bxblue border-b border-slate-700 bg-slate-900 px-4 py-2">Properties</h3>
          <div
            v-if="Object.keys(store.selectedFeature).length === 0"
            class="flex flex-1 flex-col items-center justify-center gap-4 text-slate-500">
            <Icon
              icon="fluent:arrow-left-32-filled"
              class="size-16" />
            <p>Select a component feature</p>
          </div>
          <PropertiesPanel
            v-else
            :feature="store.selectedFeature"
            @reset-feature="handleResetFeature" />
        </section>

        <!-- drag handle -->
        <div
          class="group relative z-10 flex h-1.5 cursor-row-resize items-center justify-center bg-slate-700 transition-all hover:py-2"
          :class="cssHandle.isDragging.value ? 'bg-purple-500!' : ''"
          @mousedown="cssHandle.onMouseDown"
          @dblclick="cssHandle.onDblClick">
          <!-- grip indicator -->
          <div class="flex gap-0.5 opacity-50 group-hover:opacity-100">
            <span class="h-0.5 w-3 rounded-full bg-slate-300" />
            <span class="h-0.5 w-3 rounded-full bg-slate-300" />
          </div>
        </div>

        <!-- css output panel -->
        <section class="flex flex-1 flex-col overflow-hidden bg-slate-800">
          <div class="flex items-center justify-between border-b border-slate-700 bg-slate-900">
            <h3 class="text-bxblue px-4 py-2">CSS Output</h3>
            <div class="flex items-center gap-2">
              <button
                @click="handleCopyCss"
                title="copy CSS"
                class="cursor-pointer rounded-md border border-cyan-700 p-2 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-800 hover:text-cyan-50">
                <Icon icon="fluent:copy-16-filled" />
              </button>
              <button
                @click="handleDownloadCss"
                title="download CSS"
                class="cursor-pointer rounded-md border border-orange-700 p-2 text-orange-300 hover:border-orange-400 hover:bg-orange-800 hover:text-orange-50">
                <Icon icon="fluent:arrow-download-16-filled" />
              </button>
            </div>
          </div>
          <div class="flex h-full p-2">
            <pre class="flex-1 w-full overflow-auto rounded-md bg-slate-900 p-2 text-xs text-slate-300 max-h-32">{{ truncatedCss }}</pre>
          </div>
        </section>
      </aside>
    </main>
  </div>
</template>

<style>
/* ============================================================
   MODERN THIN SCROLLBARS — Vue 3 App
   Covers: WebKit (Chrome, Safari, Edge), Firefox, and future
   standard properties. Drop into your App.vue <style> or a
   global CSS file imported in main.js / main.ts
   ============================================================ */

/* ──────────────────────────────────────────────────────────────
   1. FIREFOX  (standards-based)
   ────────────────────────────────────────────────────────────── */
* {
  scrollbar-width: thin;                  /* "auto" | "thin" | "none" */
  scrollbar-color: #888 transparent;      /* thumb  track */
}

/* ──────────────────────────────────────────────────────────────
   2. WEBKIT / BLINK  (Chrome, Edge, Safari, Opera)
   ────────────────────────────────────────────────────────────── */

/* 2a. Overall scrollbar size */
::-webkit-scrollbar {
  width: 6px;           /* vertical scrollbar width   */
  height: 6px;          /* horizontal scrollbar height */
}

/* 2b. The track (the groove the thumb slides in) */
::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 999px;
}

/* 2c. The draggable thumb */
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 999px;
  border: 2px solid transparent;         /* creates padding around thumb */
  background-clip: content-box;          /* keeps colour inside the border */
  transition: background-color 0.2s ease;
}

/* 2d. Thumb on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

/* 2e. Thumb while being dragged */
::-webkit-scrollbar-thumb:active {
  background-color: #333;
}

/* 2f. The corner where vertical + horizontal scrollbars meet */
::-webkit-scrollbar-corner {
  background: transparent;
}

/* 2g. The increment / decrement buttons (arrows) — hide them */
::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
}

/* ──────────────────────────────────────────────────────────────
   3. DARK MODE  — auto-switches via prefers-color-scheme
   ────────────────────────────────────────────────────────────── */
@media (prefers-color-scheme: dark) {
  * {
    scrollbar-color: #555 transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #555;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: #aaa;
  }
}

/* ──────────────────────────────────────────────────────────────
   4. HIDE scrollbars entirely on specific elements
      (content still scrollable — great for carousels / sidebars)
   ────────────────────────────────────────────────────────────── */
.scrollbar-hidden {
  scrollbar-width: none;        /* Firefox */
  -ms-overflow-style: none;     /* IE / Edge legacy */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;                /* WebKit */
}

/* ──────────────────────────────────────────────────────────────
   5. OVERLAY scrollbars — only appear on hover
      Apply class="scrollbar-overlay" to any scrollable container
   ────────────────────────────────────────────────────────────── */
.scrollbar-overlay {
  overflow: auto;
}

.scrollbar-overlay::-webkit-scrollbar-thumb {
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.scrollbar-overlay:hover::-webkit-scrollbar-thumb {
  background-color: #888;
}

/* ──────────────────────────────────────────────────────────────
   6. ACCENT-COLOURED scrollbars
      Use a CSS variable so Vue components can override the colour
      e.g. <div class="scrollbar-accent" style="--sb-color: #6366f1">
   ────────────────────────────────────────────────────────────── */
.scrollbar-accent {
  --sb-color: #6366f1;          /* default: indigo — override per element */
  scrollbar-color: var(--sb-color) transparent;
}

.scrollbar-accent::-webkit-scrollbar-thumb {
  background-color: var(--sb-color);
}

.scrollbar-accent::-webkit-scrollbar-thumb:hover {
  filter: brightness(1.2);
}

/* ──────────────────────────────────────────────────────────────
   7. EXTRA THIN variant (4 px) for dense UI panels
   ────────────────────────────────────────────────────────────── */
.scrollbar-xs::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

/* ──────────────────────────────────────────────────────────────
   8. SMOOTH SCROLLING — good companion rule
   ────────────────────────────────────────────────────────────── */
html {
  scroll-behavior: smooth;
}

/* ──────────────────────────────────────────────────────────────
   9. MOMENTUM SCROLLING for iOS / touch (Safari on iPhone/iPad)
   ────────────────────────────────────────────────────────────── */
.scroll-touch {
  -webkit-overflow-scrolling: touch;
}
</style>