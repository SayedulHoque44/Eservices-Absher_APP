import brand from '../brand/brand.config.json'

// All of the user's data lives in brand.config.json under "user".
// The photo is referenced there by filename and resolved from src/assets here.
const images = import.meta.glob('./assets/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const user = brand.user
export const userPhoto = images[`./assets/${brand.user.photo}`] ?? images['./assets/profile.png']
