
const detailItems = [
  {
    label: 'Humidity',
    value: 'humidity',
    unit: '%',
    icon: '💧',
    description: 'Moisture in the air',
    color: 'bg-sky-50',
  },
  {
    label: 'Wind speed',
    value: 'windSpeed',
    unit: 'km/h',
    icon: '💨',
    description: 'Current wind conditions',
    color: 'bg-indigo-50',
  },
  {
    label: 'Visibility',
    value: 'visibility',
    unit: 'km',
    icon: '👁️',
    description: 'Distance you can see',
    color: 'bg-emerald-50',
  },
  {
    label: 'UV index',
    value: 'uvIndex',
    unit: '',
    icon: '☀️',
    description: 'Strength of the sun',
    color: 'bg-amber-50',
  },
]

function WeatherDetails({ details }) {
  return (
    <section className="mt-14">

      {/* Section heading */}
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
          Weather insights
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Today's conditions
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          The details behind your local weather.
        </p>
      </div>

      {/* Weather detail items */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">

        {detailItems.map((item) => (
          <article
            key={item.value}
            className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50 sm:rounded-3xl sm:p-6"
          >

            {/* Icon and label */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-slate-500 sm:text-sm">
                {item.label}
              </p>

              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.color} transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11`}
              >
                <span
                  className="text-lg sm:text-xl"
                  role="img"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </div>
            </div>

            {/* Value */}
            <div className="mt-6 flex flex-wrap items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                {details[item.value]}
              </span>

              <span className="text-sm font-medium text-slate-400">
                {item.unit}
              </span>
            </div>

            {/* Description */}
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400 sm:text-xs">
              {item.description}
            </p>

          </article>
        ))}

      </div>
    </section>
  )
}

export default WeatherDetails