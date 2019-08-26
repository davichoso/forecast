import { SET_FORECAST } from '../constants/daysForecasts.constants'

const initialState = { days: {}, city:'' };

function daysForecast(state = initialState, action) {
    switch (action.type) {
        case SET_FORECAST:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export default daysForecast;
