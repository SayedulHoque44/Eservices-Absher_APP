import './Settings.css'

function OptionCard({ title, name, options, value, onChange }) {
  return (
    <div className="settings-card" role="radiogroup" aria-label={title}>
      <h3 className="settings-card-title">{title}</h3>
      {options.map((option) => (
        <label key={option.value} className="settings-option">
          <span lang={option.lang}>{option.label}</span>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span className="settings-radio" aria-hidden="true" />
        </label>
      ))}
    </div>
  )
}

// Full-screen preferences sheet. Selections are kept in state only — no real effect yet.
export default function Settings({ open, text, prefs, onChange, onClose }) {
  return (
    <div className={`settings${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
      <div className="settings-bar">
        <button type="button" className="settings-done" onClick={onClose}>
          {text.done}
        </button>
      </div>

      <p className="settings-section">{text.preferences}</p>

      <OptionCard
        title={text.language}
        name="language"
        value={prefs.language}
        onChange={(language) => onChange({ ...prefs, language })}
        options={[
          { value: 'ar', label: 'العربية', lang: 'ar' },
          { value: 'en', label: 'English' },
        ]}
      />

      <OptionCard
        title={text.calendar}
        name="calendar"
        value={prefs.calendar}
        onChange={(calendar) => onChange({ ...prefs, calendar })}
        options={[
          { value: 'gregorian', label: text.gregorian },
          { value: 'hijri', label: text.hijri },
        ]}
      />
    </div>
  )
}
