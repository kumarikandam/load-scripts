/* eslint-env browser */

/**
 * Creates a script tag and appends into DOM.
 * @param {string} src
 * @param {!Function} onLoad
 * @param {!Function} onError
 */
export const injectScript = (src, onLoad, onError) => {
  const script = document.createElement('script')
  script.src = src
  script.onload = onLoad
  script.onerror = onError
  ;(document.head || document.body).appendChild(script)
}

/**
 * Creates a script tag and appends into DOM.
 * @param {string} src
 * @param {!Function} onLoad
 * @param {!Function} onError
 */
export const injectStyle = (src, onLoad, onError) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = src
  link.onload = onLoad
  link.onerror = onError
  ;(document.head || document.body).appendChild(link)
}