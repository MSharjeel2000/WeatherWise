
function DailyForecast({ forecast }) {
  return (
    <section className="mt-14 mb-12">

      {/* Section heading */}
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
          The week ahead
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          7-day forecast
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Plan ahead with the upcoming weather outlook.
        </p>
      </div>

      {/* Forecast list */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">

        {forecast.map((day, index) => (
          <article
            key={day.day}
            className={`grid grid-cols-[1fr_auto_auto] items-center gap-3 px-4 py-4 transition duration-200 hover:bg-slate-50/80 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:px-7 ${
              index !== forecast.length - 1
                ? 'border-b border-slate-100'
                : ''
            }`}
          >

            {/* Day and condition */}
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800 sm:text-base">
                {index === 0 ? 'Today' : day.day}
              </p>

              <p className="mt-1 truncate text-xs text-slate-400 sm:text-sm">
                {day.condition}
              </p>
            </div>

            {/* Weather icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-50 sm:h-12 sm:w-12">
              <span
                className="text-2xl"
                role="img"
                aria-label={day.condition}
              >
                {day.icon}
              </span>
            </div>

            {/* Temperature range */}
            <div className="flex items-center justify-end gap-3 sm:gap-5">

              <span className="text-sm font-bold tabular-nums text-slate-800 sm:text-base">
                {day.high}°
              </span>

              <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-slate-100 sm:block">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-sky-300 to-amber-300" />
              </div>

              <span className="text-sm font-medium tabular-nums text-slate-400 sm:text-base">
                {day.low}°
              </span>

            </div>

          </article>
        ))}

      </div>
    </section>
  )
}

export default DailyForecast