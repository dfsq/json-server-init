# JSON Server Init [![Build Status](https://travis-ci.org/dfsq/json-server-init.svg)](https://travis-ci.org/dfsq/json-server-init) [![npm version](https://badge.fury.io/js/json-server-init.svg)](https://www.npmjs.com/package/json-server-init)

Generate JSON database for [JSON server][1] using [Filltext.com][2] as random JSON data source.

## Install

```bash
$ npm install -g json-server-init
```

## Commands

- [**create**](#create) - Create new JSON database.
- [**collection**](#collection) - Add new collection to existent database file (todo).

## Options

Possible options are:

- **--name, -n** - Specify name of the database JSON file to create (in case of create command) or use (collection command). Default name if not provided is "db.json".
- **--help, -h** - Show help.
- **--version, -v** - Show version number.

For example, to create "dev.json" schema file:

```bash
$ json-server-init create -n dev.json
```

## Commands overview

### create

Command produces several prompts.

#### Collection prompt

Prompt for collection name and number of rows renders something like this:

```
> Collection name and number of rows, 5 if omitted (ex: posts 10):
```

Valid input would be a new collection name with optional number separated by space indicating how many rows should be generated for this collection. For example, `users 10` will generate collection "users" with 10 records in it, `sessions` will result into collection "sessions" with default 5 records, etc.

#### Fields prompt

After collection name is entered one would need to configure what fields collection should have:

```
>> What fields should "users" have?
   Comma-separated fieldname:fieldtype pairs (ex: id:index, username:username)
```

Entry must have specific format: `fieldname:fieldtype`.

- **fieldname** - name of the field, only alpha-numeric characters.
- **fieldtype** - type of the data. Corresponds to types [filltext][2] generator uses for fields, refer entire [list][2] for possible values. Multiple fields concatenation is possible with `+` operator.

For example, to generate `users` collection with four fields: id, username, name and age, one could enter this command:

```
>> What fields should "users" have?
   Comma-separated fieldname:fieldtype pairs (ex: id:index, username:username)
id:index, username:username, name:firstName+lastName, age:numberRange|18,80
```

#### Add another

You can add as many collections as necessary: after fields prompt there is a confirmation if more collections need to be created:

```
> Add another collection? (y/n) n
```

If "y" is entered flow repeats "Collection prompt" step, otherwise it fetches JSON data and saves it to the file.

### collection

TODO...

## Example

Here is how typical workflow looks like with `create` command:

```bash
$ json-server-init create
> Collection name and number of rows, 5 if omitted (ex: posts 10): users 2
>> What fields should "users" have?
   Comma-separated fieldname:fieldtype pairs (ex: id:index, username:username)
 id:index, username:username, motto:lorem|5
> Add another collection? (y/n) n
db.json saved.
```

Above will produce db.json file with content similar to this:

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
