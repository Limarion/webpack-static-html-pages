import data from '../../data/content.json'
import DOMPurify from 'dompurify'

let _contentMap = null

const getContent = () => {
  if (!_contentMap) {
    const strMap = new Map()
    for (const k of Object.keys(data)) {
      strMap.set(data[k].key, data[k].value)
    }
    _contentMap = strMap
  }

  return _contentMap
}

const setContent = () => {
  const contentMap = getContent()
  const elements = document.querySelectorAll('[data]')
  elements.forEach(element => {
    const key = element.getAttribute('data')
    const content = contentMap.get(key)
    element.innerHTML = DOMPurify.sanitize(content)
  })
}

export { setContent, getContent }
