/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

/* import font awesome icon component */
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText
} from '@fortawesome/vue-fontawesome'
import type { App } from 'vue'

export function setupFontAwesome(app: App<Element>) {
  library.add(fas, far, fab)
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.component('font-awesome-layers', FontAwesomeLayers)
  app.component('font-awesome-layer-text', FontAwesomeLayersText)
}
