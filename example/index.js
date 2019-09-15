import loadScripts from '../src'

document.body.onload = () => {
  loadScripts([
    'data.json',
    'js/dep.js',
    'js/dep2.js',
  ], (err, res) => {
    if (err) return console.warn(err.message)
    const [data] = res
    const parsed = JSON.parse(data)
    console.log(parsed)
  })
}