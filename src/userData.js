// Resolves a user photo (a bundled asset filename like "profile.png", or a full
// URL / data URI from the API) to a usable <img src>. Falls back to the
// bundled profile.png when nothing matches.
const images = import.meta.glob('./assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const fallback = images['./assets/profile.png']
const cardFallback = images['./assets/document-card.png']

export function resolvePhoto(photo) {
  if (!photo) return fallback
  if (/^(https?:|data:|blob:)/i.test(photo)) return photo
  return images[`./assets/${photo}`] ?? fallback
}

// Resolves the digital-document card image (absher_card) the same way.
export function resolveCard(card) {
  if (!card) return cardFallback
  if (/^(https?:|data:|blob:)/i.test(card)) return card
  return images[`./assets/${card}`] ?? cardFallback
}
