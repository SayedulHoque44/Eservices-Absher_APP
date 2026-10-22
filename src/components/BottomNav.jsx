import { createContext, useContext } from 'react'
import './BottomNav.css'
import {
  HomeNavIcon,
  ServicesNavIcon,
  FamilyNavIcon,
  WorkersNavIcon,
  OtherNavIcon,
} from './Icons.jsx'

// Lets any BottomNav switch tabs without threading a callback through every page.
export const NavContext = createContext(null)

const NAV = [
  { key: 'home', Icon: HomeNavIcon },
  { key: 'services', Icon: ServicesNavIcon },
  { key: 'family', Icon: FamilyNavIcon },
  { key: 'workers', Icon: WorkersNavIcon },
  { key: 'other', Icon: OtherNavIcon },
]

// Shared bottom navigation. Tapping a tab switches the active screen.
export default function BottomNav({ labels, active = 'home', onSelect }) {
  const ctx = useContext(NavContext)
  const select = onSelect ?? ctx?.onSelect
  return (
    <nav className="bottom-nav">
      {NAV.map(({ key, Icon }) => (
        <button
          type="button"
          key={key}
          className={`nav-item${active === key ? ' is-active' : ''}`}
          onClick={() => select?.(key)}
        >
          <Icon size={24} />
          <span>{labels[key]}</span>
        </button>
      ))}
    </nav>
  )
}
