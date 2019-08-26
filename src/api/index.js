import axios from 'axios';
var _ = require('lodash');


export default async (city) => {
    const { data = {} } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt&appid=d6e937df2605f3c2ec3d742357f915aa`);
    return _.groupBy(data.list, i => i.dt_txt.substr(0, 10))
}