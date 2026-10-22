import './SearchPage.css'
import SubPage from './SubPage.jsx'
import { ChevronIcon } from './Icons.jsx'

// Static search results list. Items are tappable but perform no action.
export default function SearchPage({ open, zIndex, text, results, onBack }) {
  return (
    <SubPage open={open} zIndex={zIndex} title={text.title} onBack={onBack} fullscreen>
      <div className="search-subhead">
        <span className="search-count">{text.results}</span>
        <button type="button" className="search-filter">
          {text.filterBy}
          <ChevronIcon size={16} />
        </button>
      </div>

      <div className="search-list">
        {results.map((item) => (
          <button type="button" key={item.title} className="search-item">
            <strong>{item.title}</strong>
            <span>{item.category}</span>
          </button>
        ))}
      </div>
    </SubPage>
  )
}
