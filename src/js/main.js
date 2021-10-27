import '../css/style.css'
import 'normalize.css/normalize.css'
import { setContent } from './content'
import { setActiveLink } from './navigation'
import { importImages } from './images'

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'application load')
  setContent()
  setActiveLink()
  importImages()
})
