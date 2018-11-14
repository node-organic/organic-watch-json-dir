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
  "emit": {
    "dataPropertyName": "data",
    "onChangeFile": "",
    "onNewFile": "",
    "onDeleteFile": "",
  }
}
```

## emits 

```javascript
{
  type: dna.emit.*,
  dna.emit.dataPropertyName: JSON
}
```

* `onChangeFile` emits when file has been touched
* `onNewFile` emits when file has been created or it has been initially found
* `onDeleteFile` emits when file has been removed (with a cached autoloaded data)

## Contributing

We :hearts: contribution. Please follow these simple rules: 

- Update the `README.md` with details of changes. This includes new environment variables, useful file locations and parameters.
- Increase the version numbers in any examples files and the `README.md` to the new version that this Pull Request would represent. 
- Have fun :fire::dizzy:
