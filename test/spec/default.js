import { equal, ok } from '@zoroaster/assert'
import Context from '../context'
import loadScripts from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof loadScripts, 'function')
  },
  async 'calls package without error'() {
    await loadScripts()
  },
  async 'gets a link to the fixture'({ fixture }) {
    const text = fixture`text.txt`
    const res = await loadScripts({
      text,
    })
    ok(res, text)
  },
}

export default T