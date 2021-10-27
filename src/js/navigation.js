const setActiveLink = () => {
  const links = document.querySelectorAll('.Navigation a')
  const url = window.location.href

  links.forEach(a => {
    if (url.includes(a.id.toLowerCase())) {
      a.classList.add('active')
    }
  })
}

export { setActiveLink }
