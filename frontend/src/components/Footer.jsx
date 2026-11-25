
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">

      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">

        {/* Footer top section */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-2xl">
                🌤️
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                WeatherWise
              </span>
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Your weather companion. Explore current conditions
              and forecasts for the places that matter to you.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Explore
            </h3>

            <div className="mt-4 flex flex-col items-start gap-3">
              <Link
                to="/"
                className="text-sm text-slate-500 transition hover:text-sky-600"
              >
                Weather
              </Link>

              <Link
                to="/favorites"
                className="text-sm text-slate-500 transition hover:text-sky-600"
              >
                Favourites
              </Link>
            </div>
          </div>

          {/* Developer credit */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              About this project
            </h3>

            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400">
              Developed by
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              Muhammad Sharjeel Sarwar
            </p>
          </div>

        </div>

        {/* Footer bottom section */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} WeatherWise. All rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Weather data by{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sky-600 transition hover:text-sky-700"
            >
              Open-Meteo
            </a>
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer