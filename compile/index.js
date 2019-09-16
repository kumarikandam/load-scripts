const { _loadScripts, _loadJSON, _loadStyle } = require('./depack')

/**
 * Loads scripts by creating script elements, appending them to DOM and waiting for onload event. JSON is loaded via XHR. The callback will be called with an array of: event objects for scripts, and responseText for JSON.
 * @param {!Array<string>} scripts Path to scripts, including JSON.
 * @param {function(Error, !Array<!Event|string>=): void} callback The callback to execute when all data is loaded. In case of failure, called with the first error once.
 */
function loadScripts(scripts, callback) {
  return _loadScripts(scripts, callback)
}

/**
 * Loads JSON via XHR.
 * @param {string} url The JSON url to load.
 * @param {function(Error, string=): void} callback The callback when the server returned text and status 200.
 */
function loadJSON(url, onload) {
  return _loadJSON(url, onload)
}

/**
 * Loads a style by creating the link element.
 * @param {string} url The style url to load.
 * @param {function(Event, Event=): void} onload The callback when the `onload` or `onerror` even was fired on the link, with the first arg being the error event.
 */
function loadStyle(url, onload) {
  return _loadStyle(url, onload)
}

module.exports = loadScripts
module.exports.loadJSON = loadJSON
module.exports.loadStyle = loadStyle
