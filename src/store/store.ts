import { configureStore } from "@reduxjs/toolkit";


const initialSettingsState = {
  currency: 'USD',
  defaultScreen: 'Home',
  enablePushNotifications: false
}

export const changeCurrency = (newCurrency) => {
  return {
    type: 'changeCurrency',
    payload: newCurrency
  }
}

export const changeDefaultScreen = (newDefaultScreen) => {
  return {
    type: 'changeDefaultScreen',
    payload: newDefaultScreen
  }
}

export const enablePushNotifications = (pushNotificationsEnabled) => {
  return {
    type: 'enablePushNotifcations',
    payload: pushNotificationsEnabled
  }
}

const settingsReducer = (state = initialSettingsState, action) => {
  switch (action.type) {
    case 'changeCurrency':
      return {
        ...state,
        currency: action.payload,
      }
    case 'changeDefaultScreen':
      return {
        ...state,
        defaultScreen: action.payload
      }
    case 'enablePushNotifications':
      return {
        ...state,
        enablePushNotifications: action.payload
      }
    default: 
     return state
  }
}


export const store = configureStore({reducer: settingsReducer})