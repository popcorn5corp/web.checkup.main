import type { App } from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

export function setupFontAwesome(app: App<Element>) {
  library.add(faUserSecret)
  app.component('font-awesome-icon', FontAwesomeIcon)
}
