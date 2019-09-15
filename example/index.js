/* alanode example/ */
import loadScripts from '../src'

(async () => {
  const res = await loadScripts({
    text: 'example',
  })
  console.log(res)
})()