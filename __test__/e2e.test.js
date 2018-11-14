const Plasma = require('organic-plasma')
const Organel = require('../index')
const path = require('path')
const fs = require('fs')

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

describe('watch-json-dir e2e', () => {
  describe('Remove file state', () => {
    const filepath = path.join(__dirname, 'dir', 'delete-file.json')
    beforeEach(done => createMockUpFile(done, filepath))
    test('file exist', done => {
      const instance = getInstanceConfigurations()
      instance.plasma.on('onDeleteFile', () => {
        instance.plasma.emit('kill')
        done()
      })

      instance.plasma.on('ready', async () => {
        await removeJSON(filepath)
      })
    })
  })

  describe('Create a file section', () => {
    const filepath = path.join(__dirname, 'dir', 'new-file.json')
    afterEach(done => deleteMockUpFile(done, filepath))

    test('create a new file', done => {
      const instance = getInstanceConfigurations()
      instance.plasma.on('onNewFile', () => {
        instance.plasma.emit('kill')
        done()
      })

      instance.plasma.on('ready', async () => {
        await writeJSON(filepath, {value: 'new-file'})
      })
    })
  })

  describe('Update section', () => {
    const filepath = path.join(__dirname, 'dir', 'update-file.json')

    beforeEach(done => createMockUpFile(done, filepath))
    afterAll(done => deleteMockUpFile(done, filepath))
    test('update an existing file', done => {
      const instance = getInstanceConfigurations()
      instance.plasma.on('onChangeFile', () => {
        instance.plasma.emit('kill')
        done()
      })

      instance.plasma.on('ready', async () => {
        await writeJSON(filepath, {value: 'updated-file'})
      })
    })
  })
})

async function createMockUpFile (done, filepath) {
  const content = JSON.stringify({value: 'content'})
  fs.writeFile(filepath, content, (err) => {
    if (err) throw err
    done()
  })
}

function deleteMockUpFile (done, filepath) {
  fs.unlink(filepath, () => {
    done()
  })
}

const writeJSON = function (filepath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, JSON.stringify(content), (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

const removeJSON = function (filepath) {
  return new Promise((resolve, reject) => {
    fs.unlink(filepath, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

const getInstanceConfigurations = function () {
  let plasma = new Plasma()
  let dna = {
    'location': path.join(__dirname, 'dir'),
    'emit': {
      'dataPropertyName': 'data',
      'onNewFile': 'onNewFile',
      'onChangeFile': 'onChangeFile',
      'onDeleteFile': 'onDeleteFile',
      'ready': 'ready'
    }
  }
  let instane = new Organel(plasma, dna)

  return instane
}
