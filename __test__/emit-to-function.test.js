const Plasma = require('organic-plasma')
const Organel = require('../index')
const path = require('path')
const fsWrite = require('util').promisify(require('fs').writeFile)
const fsUnlink = require('util').promisify(require('fs').unlink)

const sleep = function (timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

test('emit to function', async function (done) {
  let plasma = new Plasma()
  let dirPath = path.join(__dirname, 'dir2')
  let aFilePath = path.join(dirPath, 'afile.json')
  let instance = new Organel(plasma, {
    location: dirPath,
    emit: {
      onNewFile: function (c) {
        expect(c.path).toBeDefined()
        expect(c.data).toBeDefined()
        done()
      }
    }
  })
  await fsWrite(aFilePath, '{}')
  await sleep(1000) // give it some time to make sure the file is acknowledged
  await fsUnlink(aFilePath)
  instance.dispose()
})
