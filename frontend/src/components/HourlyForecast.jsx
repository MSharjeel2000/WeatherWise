
function HourlyForecast({ forecast }) {
  return (
    <section className="mt-14">

      {/* Section heading */}
      <div className="mb-7">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-600">
          Next hours
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Hourly forecast
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Follow the weather throughout the day.
        </p>
      </div>

      {/* Forecast timeline */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-6">

        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin">

          {forecast.map((hour) => (
            <article
              key={hour.time}
              className={`relative flex min-w-[100px] flex-col items-center rounded-2xl px-4 py-5 transition duration-300 sm:min-w-[112px] ${
                hour.isCurrent
                  ? 'bg-[#EFF7FC] ring-1 ring-sky-200'
                  : 'bg-slate-50/70 hover:bg-slate-100'
              }`}
            >

              {/* Current hour indicator */}
              {hour.isCurrent && (
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-sky-500 ring-4 ring-sky-100" />
              )}

              {/* Time */}
              <p
                className={`text-sm font-semibold ${
                  hour.isCurrent
                    ? 'text-sky-700'
                    : 'text-slate-500'
                }`}
              >
                {hour.isCurrent ? 'Now' : hour.time}
              </p>

              {/* Weather icon */}
              <div className="my-5 flex h-12 items-center justify-center">
                <span
                  className="text-4xl transition-transform duration-300 hover:scale-110"
                  role="img"
                  aria-label={hour.condition}
                >
                  {hour.icon}
                </span>
              </div>

              {/* Temperature */}
              <p className="text-2xl font-bold tracking-tight text-slate-900">
                {hour.temperature}
                <span className="text-base font-medium text-slate-400">
                  °C
                </span>
              </p>

              {/* Condition */}
              <p className="mt-2 max-w-full truncate text-xs font-medium text-slate-400">
                {hour.condition}
              </p>

            </article>
          ))}

        </div>

        {/* Scroll hint */}
        <div className="flex items-center justify-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-400 sm:justify-end">
          <span>Scroll to explore</span>
          <span aria-hidden="true">→</span>
        </div>

      </div>
    </section>
  )
}

export default HourlyForecast