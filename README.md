# JSON Server Init [![Build Status](https://travis-ci.org/dfsq/json-server-init.svg)](https://travis-ci.org/dfsq/json-server-init) [![npm version](https://badge.fury.io/js/json-server-init.svg)](https://www.npmjs.com/package/json-server-init)

Generate JSON database for [JSON server][1] using [Filltext.com][2] as random JSON data source.

## Install

```bash
$ npm install -g json-server-init
```

## Options

Possible options are:

- **-s, --scaffold** [default: db.json]- Create JSON database with specified name. Default name if not provided is "db.json"
- **-h, --help** - Show help.

For example, to create "dev.json" schema file:

```
$ json-server-init -s dev.json
```

### -s, --scaffold

Command produces several prompts.

#### Collection prompt

Prompt for collection name and number of rows render something like this:

```
> Collection name and number of rows, 5 if omited (ex: posts 10):
```

Valid input would be a new collection name with optional number separated by space indicating how many rows to generate for this collection. For example, `users 10` will generate collection "users" with 10 records in it, `sesstions` will result into collection "sessions" with default 5 records, etc.

#### Fields prompt

After collection name is entered one would need to configure what fields collection should have:

```
>> What fields should "users" have?
   Comma-separated pairs fieldname:fieldtype (ex: id:number, username:username)
```

Entry should have specific format: fieldname:fieldtype.

- **fieldname** - name of the field, only alpha-numeric characters.
- **fieldtype** - type of the data. Corresponds to types [filltext][2] generator uses for fields, refere entire [list][2] for possible values.

For example, to generate users collection with three fields: id, fname and age, one would enter this command:

```
>> What fields should "users" have?
   Comma-separated pairs fieldname:fieldtype (ex: id:number, username:username)
id:index, fname:firsrName, age:number
```

#### Add another

You can add as many collections as necessary, after fields prompt there is a confirmation if more collections needs to be created:

```
> Add another collection? (y/n) n
```

If "y" is entered flow repeats "Collection prompt" step, otherwise it fetches JSON data and saves it to the file.

## Example

```
$ json-server-init -s
> Collection name and number of rows, 5 if omited (ex: posts 10):  users 2
>> What fields should "users" have?
   Comma-separated fieldname:fieldtype pairs (ex: id:index, username:username, age:numberRange|18,60)
 id:index, username:username, motto:lorem|5
> Add another collection? (y/n) n
db.json saved.
```

Above will produce db.json file with content similar to

```json
{
    "users": [
        {
            "id": 1,
            "username": "RGershowitz",
            "motto": "curabitur et magna placerat tellus"
        },
        {
            "id": 2,
            "username": "NMuroski",
            "motto": "ante nullam dolor sit placerat"
        }
    ]
}
```

Now you can start json-server:

```bash
$ json-server --watch db.json
```

## License

[MIT License](http://opensource.org/licenses/mit-license.php)  © Aliaksandr Astashenkau


[1]: https://github.com/typicode/json-server
[2]: http://www.filltext.com/
