const Plasma = require('organic-plasma')
const Organel = require('../index')
const path = require('path')
const fsWrite = require('util').promisify(require('fs').writeFile)
const fsUnlink = require('util').promisify(require('fs').unlink)

const sleep = function (timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

test('do not crash on invalid json', async function () {
  let plasma = new Plasma()
  let dirPath = path.join(__dirname, 'dir2')
  let invalidPath = path.join(dirPath, 'invalid.json')
  let instance = new Organel(plasma, {
    location: dirPath,
    emit: {
      onNewFile: 'newfile'
    }
  })
  plasma.on('newfile', function (c) {
    throw new Error('should not happen')
  })
  await fsWrite(invalidPath, '{invalid: undefined :)}')
  await sleep(1000) // give it some time to make sure the file is acknowledged
  await fsUnlink(invalidPath)
  instance.dispose()
})

test('emit on invalid json', async function () {
  let plasma = new Plasma()
  let dirPath = path.join(__dirname, 'dir2')
  let invalidPath = path.join(dirPath, 'invalid.json')
  let gotError
  let instance = new Organel(plasma, {
    location: dirPath,
    emit: {
      onNewFile: 'newfile',
      errors: 'error'
    }
  })
  plasma.on('newfile', function () {
    throw new Error('should not happen')
  })
  plasma.on('error', function (c) {
    gotError = c.err
  })
  await fsWrite(invalidPath, '{invalid: undefined :)}')
  await sleep(1000)
  await fsUnlink(invalidPath)
  expect(gotError).toBeDefined()
  instance.dispose()
})
