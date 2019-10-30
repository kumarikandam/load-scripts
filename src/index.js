/* eslint-env browser */

/**
 * Loads JSON via XHR.
 * @param {string} url The JSON url to load.
 * @param {function(Error, string=): void} onload The callback when the server returned text and status 200.
 */
export const loadJSON = (url, onload) => {
  const xmlhttp = new XMLHttpRequest()

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      onload(null, xmlhttp.responseText)
    }
  }
  xmlhttp.onerror = (err) => onload(err)
  xmlhttp.open('GET', url, true)
  xmlhttp.send()
}

/**
 * Loads a style by creating the link element.
 * @param {string} url The style url to load.
 * @param {function(Event, Event=): void} onload The callback when the `onload` or `onerror` even was fired on the link, with the first arg being the error event.
 */
export const loadStyle = (url, onload) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  link.onload = (ev) => onload(null, ev)
  link.onerror = (ev) => onload(ev)
  document.head.appendChild(link)
}

/**
 * Loads scripts by creating script elements, appending them to DOM and waiting for onload event. JSON is loaded via XHR. The callback will be called with an array of: event objects for scripts, and responseText for JSON.
 * @param {!Array<string>} scripts Path to scripts, including JSON.
 * @param {function(Error, !Array<!Event|string>=): void} callback The callback to execute when all data is loaded. In case of failure, called with the first error once.
 */
export default function loadScripts(scripts, callback) {
  let error = false, loaded = [], l = 0
  scripts.forEach((src, i) => {
    const onLoad = (res) => {
      if (error) return
      l++
      loaded[i] = res
      if (l == scripts.length) callback(null, loaded)
    }
    const onError = (err) => {
      if (error) return
      error = err
      callback(err)
    }
    if (src.endsWith('.json')) {
      loadJSON(src, (err, result) => {
        if (err) onError(err)
        else onLoad(result)
      })
      return
    }
    loadScript(src, onLoad, onError)
  })
}

const SCRIPTS = {}

/**
 * Loads script accounting for cache.
 * @param {string} src
 * @param {!Function} onLoad
 * @param {!Function} onError
 */
const loadScript = (src, onLoad, onError) => {
  const cache = /** @type {CacheItem} */ (SCRIPTS[src])

  if (src['nocache']) {
    injectScript(src, onLoad, onError)
  } else if (cache && cache.loaded) {
    onLoad(cache.loaded)
  } else if (cache && cache.errored) {
    onError(cache.errored)
  } else if (cache) {
    cache.addOnLoad(onLoad)
    cache.addOnError(onError)
  } else {
    const ci = new CacheItem(onLoad, onError)
    SCRIPTS[src] = ci
    injectScript(src, (ev) => {
      ci.load(ev)
    }, (ev) => {
      ci.error(ev)
    })
  }
}

/**
 * Creates a script tag and appends into DOM.
 * @param {string} src
 * @param {!Function} onLoad
 * @param {!Function} onError
 */
const injectScript = (src, onLoad, onError) => {
  const script = document.createElement('script')
  script.src = src
  script.onload = onLoad
  script.onerror = onError
  ;(document.head || document.body).appendChild(script)
}

class CacheItem {
  /**
   * Creates a cache iterm with given inital listeners, and allows to add more listeners.
   * The listeners are called when `load` and `error` methods are fired on this instance.
   * @param {!Function} onLoad
   * @param {!Function} onError
   */
  constructor(onLoad, onError) {
    /**
     * @type {Event}
     */
    this.errored = null
    /**
     * @type {Event}
     */
    this.loaded = null
    this.onloads = [onLoad]
    this.onerrors = [onError]
  }
  /**
   * Adds an onload listener.
   * @param {!Function} onLoad
   */
  addOnLoad(onLoad) {
    this.onloads.push(onLoad)
  }
  /**
   * Adds an onerror listener.
   * @param {!Function} onError
   */
  addOnError(onError) {
    this.onerrors.push(onError)
  }
  /**
   * @param {Event} ev
   */
  error(ev) {
    this.errored = ev
    this.onerrors.forEach((oe) => {
      oe(ev)
    })
  }
  /**
   * @param {Event} ev
   */
  load(ev) {
    this.loaded = ev
    this.onloads.forEach((ol) => {
      ol(ev)
    })
  }
}

// const abstractLoad = () => {

// }