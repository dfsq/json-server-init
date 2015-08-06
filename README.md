# JSON Server Init [![Build Status](https://travis-ci.org/dfsq/json-server-init.svg)](https://travis-ci.org/dfsq/json-server-init) [![npm version](https://badge.fury.io/js/json-server-init.svg)](https://www.npmjs.com/package/json-server-init)

Generate JSON database for [JSON server](https://github.com/typicode/json-server) using [Filltext.com](http://filltext.com) as random JSON data source.

## Install

```bash
$ npm install -g json-server-init
```

## Example

```bash
$ json-server-init -s
> Collection name and number of rows, 5 if omited (ex: posts 10):  users 6
>> What fields should "users" have?
   Comma-separated pairs fieldname:fieldtype (ex: id:number, username:username)
id:index, username:username, age:number, name:firstName
> Add another collection? (y/n) n
Scheme saved to db.json
```

Above will produce db.json file with content similar to

```json
{
    "users": [
        {
            "id": 1,
            "username": "VMel"
        },
        {
            "id": 2,
            "username": "GSchwartzberg"
        }
    ]
}
```

Now you can start json-server:

```bash
$ json-server --watch db.json
```