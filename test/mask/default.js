import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import loadScripts from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await loadScripts({
      text: this.input,
    })
    return res
  },
  context: Context,
})