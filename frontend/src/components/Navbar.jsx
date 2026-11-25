
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const getLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-sky-100 text-sky-700'
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">

        {/* Brand */}
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="WeatherWise home"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-2xl transition-transform duration-300 group-hover:rotate-6">
            🌤️
          </div>

          <div>
            <span className="block text-xl font-bold tracking-tight text-slate-900">
              WeatherWise
            </span>

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 sm:block">
              Weather, made simple
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50 p-1">
          <NavLink to="/" end className={getLinkClass}>
            Weather
          </NavLink>

          <NavLink to="/favorites" className={getLinkClass}>
            <span className="mr-1">♡</span>
            Favourites
          </NavLink>
        </div>

        {/* Developer credit - visible on all screen sizes */}
        <div className="w-full border-t border-slate-100 pt-3 text-center sm:text-right md:w-auto md:border-0 md:pt-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Developed by
          </p>

          <p className="mt-1 text-xs font-bold text-slate-800">
            Muhammad Sharjeel Sarwar
          </p>
        </div>

      </nav>
    </header>
  )
}

export default Navbar