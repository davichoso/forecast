import { SET_FORECAST } from '../constants/daysForecasts.constants'

export function setForecastAction(forecast) {
    return { type: SET_FORECAST, payload: forecast }
  }