# organic-watch-json-dir

Organelle for emitting changes in directory with .json files.

## dna

```
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

```
{
  type: dna.emit.*,
  dna.emit.dataPropertyName: JSON
}
```

* `onChangeFile` emits when file has been touched
* `onNewFile` emits when file has been created or it has been initially found
* `onDeleteFile` emits when file has been removed (with a cached autoloaded data)
