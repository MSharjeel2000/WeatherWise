
const weatherConditions = {
  0: { condition: 'Clear sky', icon: '☀️' },
  1: { condition: 'Mainly clear', icon: '🌤️' },
  2: { condition: 'Partly cloudy', icon: '⛅' },
  3: { condition: 'Overcast', icon: '☁️' },
  45: { condition: 'Fog', icon: '🌫️' },
  48: { condition: 'Depositing rime fog', icon: '🌫️' },
  51: { condition: 'Light drizzle', icon: '🌦️' },
  53: { condition: 'Moderate drizzle', icon: '🌦️' },
  55: { condition: 'Dense drizzle', icon: '🌧️' },
  61: { condition: 'Slight rain', icon: '🌧️' },
  63: { condition: 'Moderate rain', icon: '🌧️' },
  65: { condition: 'Heavy rain', icon: '🌧️' },
  71: { condition: 'Slight snow', icon: '🌨️' },
  73: { condition: 'Moderate snow', icon: '❄️' },
  75: { condition: 'Heavy snow', icon: '❄️' },
  80: { condition: 'Rain showers', icon: '🌦️' },
  81: { condition: 'Moderate rain showers', icon: '🌧️' },
  82: { condition: 'Violent rain showers', icon: '🌧️' },
  95: { condition: 'Thunderstorm', icon: '⛈️' },
  96: { condition: 'Thunderstorm with hail', icon: '⛈️' },
  99: { condition: 'Thunderstorm with heavy hail', icon: '⛈️' },
}

function getWeatherCondition(code) {
  return weatherConditions[code] || {
    condition: 'Unknown conditions',
    icon: '🌡️',
  }
}

function formatHour(dateTime) {
  return new Date(dateTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone: 'UTC',
  })
}

function formatDay(date, index) {
  if (index === 0) return 'Today'

  return new Date(`${date}T12:00:00`).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      timeZone: 'UTC',
    }
  )
}

export function formatWeatherData(data) {
  const { current, hourly, daily } = data

  // Find the hourly entry matching the current hour
  const currentHour = current.time.slice(0, 13)
  const currentHourIndex = hourly.time.findIndex(
    (time) => time === currentHour
  )

  const safeHourIndex = Math.max(currentHourIndex, 0)

  const currentCondition = getWeatherCondition(
    current.weather_code
  )

  const todayIndex = daily.time.indexOf(
    current.time.slice(0, 10)
  )

  // Build the next eight hourly forecast entries
  const hourlyForecast = hourly.time
    .slice(safeHourIndex, safeHourIndex + 8)
    .map((time, index) => {
      const actualIndex = safeHourIndex + index
      const condition = getWeatherCondition(
        hourly.weather_code[actualIndex]
      )

      return {
        time: formatHour(time),
        temperature: hourly.temperature_2m[actualIndex],
        condition: condition.condition,
        icon: condition.icon,
        isCurrent: index === 0,
      }
    })

  // Build the seven-day forecast
  const dailyForecast = daily.time.map((date, index) => {
    const condition = getWeatherCondition(
      daily.weather_code[index]
    )

    return {
      day: formatDay(date, index),
      condition: condition.condition,
      icon: condition.icon,
      high: daily.temperature_2m_max[index],
      low: daily.temperature_2m_min[index],
    }
  })

  return {
    temperature: current.temperature_2m,
    feelsLike: current.apparent_temperature,
    condition: currentCondition.condition,
    icon: currentCondition.icon,

    high: daily.temperature_2m_max[todayIndex],
    low: daily.temperature_2m_min[todayIndex],

    humidity: current.relative_humidity_2m,
    windSpeed: current.wind_speed_10m,

    visibility:
      hourly.visibility[safeHourIndex] / 1000,

    uvIndex: hourly.uv_index[safeHourIndex],

    hourly: hourlyForecast,
    daily: dailyForecast,
  }
}