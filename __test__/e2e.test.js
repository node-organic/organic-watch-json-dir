const Plasma = require('organic-plasma')
const Organel = require('../index')
const path = require('path')
const fs = require('fs')

process.on('unhandledRejection', (err) => {
  console.error(err)
  process.exit(1)
})

test('watch-json-dir e2e', (done) => {
  let plasma = new Plasma()
  let dna = {
    'location': path.join(__dirname, 'dir'),
    'emit': {
      'dataPropertyName': 'data',
      'onChangeFile': 'eventName',
      'onNewFile': 'eventName',
      'onDeleteFile': 'eventName',
      'ready': 'ready'
    }
  }
  let instance = new Organel(plasma, dna)
  let hit = 0
  instance.plasma.on('eventName', () => {
    hit += 1
    if (hit === 4) {
      instance.plasma.emit('kill')
      done()
    }
  })
  instance.plasma.on('ready', async () => {
    await writeJSON(path.join(__dirname, 'dir', 'new-file.json'), {value: 'new-file'})
    await sleep(100)
    await writeJSON(path.join(__dirname, 'dir', 'new-file.json'), {value: 'updated-file'})
    await sleep(100)
    await removeJSON(path.join(__dirname, 'dir', 'new-file.json'))
  })
})

const sleep = function (timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, timeout)
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
