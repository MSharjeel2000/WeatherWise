const weatherPreview = {
  city: 'Islamabad',
  country: 'Pakistan',

  // Current weather
  temperature: 28,
  feelsLike: 30,
  condition: 'Partly Cloudy',
  icon: '⛅',
  high: 31,
  low: 22,

  // Additional weather details
  humidity: 65,
  windSpeed: 12,
  visibility: 10,
  uvIndex: 5,

  // Hourly forecast
  hourly: [
    { time: '3 PM', temperature: 28, condition: 'Partly cloudy', icon: '⛅', isCurrent: true },
    { time: '4 PM', temperature: 29, condition: 'Sunny', icon: '☀️', isCurrent: false },
    { time: '5 PM', temperature: 27, condition: 'Sunny', icon: '☀️', isCurrent: false },
    { time: '6 PM', temperature: 25, condition: 'Clear', icon: '🌤️', isCurrent: false },
    { time: '7 PM', temperature: 24, condition: 'Clear', icon: '🌙', isCurrent: false },
    { time: '8 PM', temperature: 23, condition: 'Clear', icon: '🌙', isCurrent: false },
    { time: '9 PM', temperature: 22, condition: 'Clear', icon: '🌙', isCurrent: false },
    { time: '10 PM', temperature: 21, condition: 'Cloudy', icon: '☁️', isCurrent: false },
  ],

  // Seven-day forecast
  daily: [
    { day: 'Today', condition: 'Partly cloudy', icon: '⛅', high: 31, low: 22 },
    { day: 'Wednesday', condition: 'Sunny', icon: '☀️', high: 32, low: 23 },
    { day: 'Thursday', condition: 'Cloudy', icon: '☁️', high: 29, low: 21 },
    { day: 'Friday', condition: 'Light rain', icon: '🌧️', high: 26, low: 19 },
    { day: 'Saturday', condition: 'Sunny', icon: '☀️', high: 30, low: 20 },
    { day: 'Sunday', condition: 'Partly cloudy', icon: '🌤️', high: 31, low: 22 },
    { day: 'Monday', condition: 'Cloudy', icon: '☁️', high: 28, low: 20 },
  ],
}

export default weatherPreview