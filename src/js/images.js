const importImages = () => {
  importAll(require.context('../images/', false, /\.(png|jpe?g|svg)$/))
}

const importAll = r => {
  return r.keys().map(r)
}

export { importImages }
