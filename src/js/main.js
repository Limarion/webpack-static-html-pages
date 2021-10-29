import '../css/style.scss'
import 'normalize.css/normalize.css'
import { setContent } from './content'
import { setActiveLink, toggleBurger } from './navigation'
import { importImages } from './images'

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', 'application load')
  setContent()
  setActiveLink()
  toggleBurger()
  importImages()
})
