enum userActionTypes {
  USER_LOGIN_START = 'USER_LOGIN_START',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',

  SET_ACTIVE_USER_TYPE = 'SET_ACTIVE_USER_TYPE',
  SET_USER_TYPES = 'SET_USER_TYPES',
  LOGOUT_USER = 'LOGOUT_USER',

  SWITCH_USER_TYPE = 'SWITCH_USER_TYPE',
  HANDLE_USER_TYPE_MODAL = 'HANDLE_USER_TYPE_MODAL',

  FETCH_CURRENT_USER_DETAILS_START = 'FETCH_CURRENT_USER_DETAILS_START',
  FETCH_CURRENT_USER_DETAILS_SUCCESS = 'FETCH_CURRENT_USER_DETAILS_SUCCESS',
  FETCH_CURRENT_USER_DETAILS_FAILURE = 'FETCH_CURRENT_USER_DETAILS_FAILURE',

  EDIT_USER_START = 'EDIT_USER_START',
  EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
  HANDLE_EDIT_USER = 'HANDLE_EDIT_USER',

  CREATE_EDIT_REQUEST_START = 'CREATE_EDIT_REQUEST_START',
  CREATE_EDIT_REQUEST_SUCCESS = 'CREATE_EDIT_REQUEST_SUCCESS',
  CREATE_EDIT_REQUEST_FAILURE = 'CREATE_EDIT_REQUEST_FAILURE',

  FETCH_STAFF_EDIT_REQUESTS_START = 'FETCH_STAFF_EDIT_REQUESTS_START',
  FETCH_STAFF_EDIT_REQUESTS_SUCCESS = 'FETCH_STAFF_EDIT_REQUESTS_SUCCESS',
  FETCH_STAFF_EDIT_REQUESTS_FAILURE = 'FETCH_STAFF_EDIT_REQUESTS_FAILURE',

  OPEN_WIZARD_USER = 'OPEN_WIZARD_USER',
  RESET_EVERYTHING_USER = 'RESET_EVERYTHING_USER',
  VIEW_EDIT_REQUEST_ACTION = 'VIEW_EDIT_REQUEST_ACTION',

  FETCH_USER_EDIT_REQUESTS_START = 'FETCH_USER_EDIT_REQUESTS_START',
  FETCH_USER_EDIT_REQUESTS_SUCCESS = 'FETCH_USER_EDIT_REQUESTS_SUCCESS',
  FETCH_USER_EDIT_REQUESTS_FAILURE = 'FETCH_USER_EDIT_REQUESTS_FAILURE',

  FETCH_USER_DOCS_START = 'FETCH_USER_DOCS_START',
  FETCH_USER_DOCS_SUCCESS = 'FETCH_USER_DOCS_SUCCESS',
  FETCH_USER_DOCS_FAIL = 'FETCH_USER_DOCS_FAIL',

  DOWNLOAD_USER_DOCS_START = 'DOWNLOAD_USER_DOCS_START',
  DOWNLOAD_USER_DOCS_SUCCESS = 'DOWNLOAD_USER_DOCS_SUCCESS',
  DOWNLOAD_USER_DOCS_FAIL = 'DOWNLOAD_USER_DOCS_FAIL',

  EDIT_CURRENT_USER_DETAILS = 'EDIT_CURRENT_USER_DETAILS',
  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
  SET_REFRESH_TOKEN = 'SET_REFRESH_TOKEN',
  SET_CURRENT_USER_DETAILS = 'SET_CURRENT_USER_DETAILS',
  SET_IS_REFRESHING_TOKEN = 'SET_IS_REFRESHING_TOKEN',

  RESET_SET_PASSWORD_START = 'RESET_SET_PASSWORD_START',
  RESET_SET_PASSWORD_SUCCESS = 'RESET_SET_PASSWORD_SUCCESS',
  RESET_SET_PASSWORD_FAILURE = 'RESET_SET_PASSWORD_FAILURE',

  GOOGLE_AUTH_LOGIN_START = 'GOOGLE_AUTH_LOGIN_START',
  GOOGLE_AUTH_LOGIN_SUCCESS = 'GOOGLE_AUTH_LOGIN_SUCCESS',
  GOOGLE_AUTH_LOGIN_FAILURE = 'GOOGLE_AUTH_LOGIN_FAILURE',

  CHANGE_USERNAME_START = 'CHANGE_USERNAME_START',
  CHANGE_USERNAME_SUCCESS = 'CHANGE_USERNAME_SUCCESS',
  CHANGE_USERNAME_FAILURE = 'CHANGE_USERNAME_FAILURE',

  SEND_OTP_START = 'SEND_OTP_START',
  SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS',
  SEND_OTP_FAILURE = 'SEND_OTP_FAILURE',

  VERIFY_NEW_EMAIL_START = 'VERIFY_NEW_EMAIL_START',
  VERIFY_NEW_EMAIL_SUCCESS = 'VERIFY_NEW_EMAIL_SUCCESS',
  VERIFY_NEW_EMAIL_FAILURE = 'VERIFY_NEW_EMAIL_FAILURE',

  GET_USER_DETAILS_START = 'GET_USER_DETAILS_START',
  GET_USER_DETAILS_SUCCESS = 'GET_USER_DETAILS_SUCCESS',
  GET_USER_DETAILS_FAILURE = 'GET_USER_DETAILS_FAILURE',

  SET_CURRENT_STAFF_SUBJECTS = 'SET_CURRENT_STAFF_SUBJECTS',
  SET_CURRENT_STAFF_ITEMS = 'SET_CURRENT_STAFF_ITEMS',
  SET_ACTIVE_CHILD_PAYMENT = 'SET_ACTIVE_CHILD_PAYMENT',

  SET_CURRENT_ONBOARDING_STEP = 'SET_CURRENT_ONBOARDING_STEP',
  SET_ONBOARDED = 'SET_ONBOARDED',
  SET_DISABLE_NEXT = 'SET_DISABLE_NEXT',
  SET_GET_STARTED = 'SET_GET_STARTED',
  HANDLE_SHOW_WIZARD = 'HANDLE_SHOW_WIZARD',

  SET_FEES_ACTIVE_TAB = 'SET_FEES_ACTIVE_TAB',
  SET_EARLY_YEARS_ACTIVE_TAB = 'SET_EARLY_YEARS_ACTIVE_TAB',
  SET_SKILLS_ACTIVE_TAB = 'SET_SKILLS_ACTIVE_TAB',
  SET_SESSIONS_ACTIVE_TAB = 'SET_SESSIONS_ACTIVE_TAB',
  SET_RUN = 'SET_RUN',
  HANDLE_FINISH_MODAL = 'HANDLE_FINISH_MODAL',

  UPDATE_ONBOARDING_STEPS_START = 'UPDATE_ONBOARDING_STEPS_START',
  UPDATE_ONBOARDING_STEPS_SUCCESS = 'UPDATE_ONBOARDING_STEPS_SUCCESS',
  UPDATE_ONBOARDING_STEPS_FAILURE = 'UPDATE_ONBOARDING_STEPS_FAILURE',

  SET_LOGIN_ATTEMPTS = 'SET_LOGIN_ATTEMPTS',
  SET_DISABLE_LOGIN = 'SET_DISABLE_LOGIN',
  SET_DISABLE_LOGIN_TIME = 'SET_DISABLE_LOGIN_TIME',

  UPDATE_APPUSER_STATE = 'UPDATE_APPUSER_STATE',
}

export default userActionTypes;
