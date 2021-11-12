// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios')

const handler = async (event) => {
  const { city, lat, lon } = event.queryStringParameters

  const API_SECRET = "37949a1a13ff476de42a4bef90e83822"
  

  const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=moscow&appid=${API_SECRET}&lang=ar&units=metric`
  const urlCoor = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_SECRET}&lang=ar&units=metric`
  let url

  city == 'none' ? url = urlCoor : url = urlCity ;

  try {
    const { data } = await axios.get(url)

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: status,
      body: JSON.stringify({ status, statusText, headers, data })
    }
  }
}

module.exports = { handler }
