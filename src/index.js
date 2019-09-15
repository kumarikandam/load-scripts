/* eslint-env browser */

/**
 * Loads JSON via XHR.
 * @param {string} url The JSON url to load.
 * @param {function(Error, string=): void} onload The callback when the server returned text and status 200.
 */
export const loadJSON = (url, onload) => {
  const xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      onload(null, this.responseText)
    }
  }
  xmlhttp.onerror = (err) => onload(err)
  xmlhttp.open('GET', url, true)
  xmlhttp.send()
}

/**
 * Loads scripts by creating script elements, appending them to DOM and waiting for onload event. JSON is loaded via XHR. The callback will be called with an array of: event objects for scripts, and responseText for JSON.
 * @param {!Array<string>} scripts Path to scripts, including JSON.
 * @param {function(Error, !Array<!Event|string>=): void} callback The callback to execute when all data is loaded. In case of failure, called with the first error once.
 */
export default function loadScripts(scripts, callback) {
  let error = false, loaded = [], l = 0
  scripts.forEach((src, i) => {
    const onload = (res) => {
      if (error) return
      l++
      loaded[i] = res
      if (l == scripts.length) callback(null, loaded)
    }
    const onerror = (err) => {
      if (error) return
      error = err
      callback(err)
    }
    if (src.endsWith('.json')) {
      loadJSON(src, (err, result) => {
        if (err) onerror(err)
        else onload(result)
      })
      return
    }
    const script = document.createElement('script')
    script.src = src
    script.onload = onload
    script.onerror = onerror
    ;(document.head || document.body).appendChild(script)
  })
}