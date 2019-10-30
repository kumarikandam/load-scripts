export default class CacheItem {
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