import CacheItem from './Cache'
import { injectStyle, injectScript } from './inject'

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
  const cache = /** @type {CacheItem} */ (STYLES[url])
  const onLoad = (ev) => onload(null, ev)
  const onError = (ev) => onload(ev)

  const c = abstractLoader(url, injectStyle, cache, onLoad, onError, url['nocache'])
  if (c) STYLES[url] = c
}

/**
 * @param {string} url The URL to load.
 * @param {function(string, !Function, !Function)} loader The function to load URL with.
 * @param {CacheItem} cache The cache item, if exists.
 * @param {!Function} onLoad Callback on load.
 * @param {!Function} onError Callback on error.
 * @param {boolean} [nocache] Whether cache should be skipped.
 */
function abstractLoader(url, loader, cache, onLoad, onError, nocache) {
  if (nocache) {
    loader(url, onLoad, onError)
  } else if (cache && cache.loaded) {
    onLoad(cache.loaded)
  } else if (cache && cache.errored) {
    onError(cache.errored)
  } else if (cache) {
    cache.addOnLoad(onLoad)
    cache.addOnError(onError)
  } else {
    const ci = new CacheItem(onLoad, onError)
    loader(url, (ev) => {
      ci.load(ev)
    }, (ev) => {
      ci.error(ev)
    })
    return ci
  }
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
const STYLES = {}

/**
 * Loads script accounting for cache.
 * @param {string} src
 * @param {!Function} onLoad
 * @param {!Function} onError
 */
const loadScript = (src, onLoad, onError) => {
  const cache = /** @type {CacheItem} */ (SCRIPTS[src])

  const c = abstractLoader(src, injectScript, cache, onLoad, onError, src['nocache'])
  if (c) SCRIPTS[src] = c
}
