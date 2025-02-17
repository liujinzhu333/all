import axios from 'axios';

export const getWeatherData = async () => {
  const res = await axios.get('https://wis.qq.com/weather/common?source=pc&weather_type=observe&province=四川&city=成都&county=成华区')
  return res.data.data.observe
}