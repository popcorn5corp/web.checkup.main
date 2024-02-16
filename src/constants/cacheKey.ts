const SYSTEM_NAME = 'checkup'

class CacheKey {
  static readonly TOKEN = `${SYSTEM_NAME}_token`
  static readonly REFRESH_TOKEN = `${SYSTEM_NAME}_refresh_token`
  static readonly LOCALE = `${SYSTEM_NAME}_locale`
  static readonly THEME = `${SYSTEM_NAME}_theme`
  static readonly USER_INFO = `${SYSTEM_NAME}_user_info`
  static readonly TABS_ROUTES = `${SYSTEM_NAME}_tabs_routes`
  static readonly WORKSPACE = `${SYSTEM_NAME}_workspace`
  static readonly WORKSPACE_ID = `${SYSTEM_NAME}_workspace_id`

  constructor() {}
}

export default new CacheKey()
