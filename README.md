# organic-watch-json-dir

Organelle for emitting changes in directory with .json files.

## How to install

The minimal version of nodejs is: `Nodejs version 4+`

Open your terminal and run:

```bash
npm install organic-watch-json-dir --save
```

## dna

```javascript
{
  "location": "/full/path/with/json/files",
  "reactOn": ChemicalPattern,
  "emit": {
    "dataPropertyName": "data",
    "onChangeFile": ChemicalType,
    "onNewFile": ChemicalType,
    "onDeleteFile": ChemicalType,
    "ready": ChemicalType
  },
  "chokidar": {
    "awaitWriteFinish": {
      "stabilityThreshold": 100,
      "pollInterval": 10
    }
  }
}
```

## reacts

`reactOn` chemical pattern is optional, if not present will execute during build(construction) phase.

## emits 

### .json file related 

* `onChangeFile` emits when file has been touched
* `onNewFile` emits when file has been created or it has been initially found
* `onDeleteFile` emits when file has been removed (with a cached autoloaded data)

all chemicals have the following shape:

```javascript
{
  type: dna.emit.*,
  <dna.emit.dataPropertyName>: JSON,
  path: String
}
```

### ready

`ready` is optional, if present will emit in plasma dna specified plain chemical type.

## Contributing

We :hearts: contribution so send your PRs accordingly. Dont forget to update the README and tests along the way ;)
