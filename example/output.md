# Cani-dynamo

Cani-dynamo makes using AWS dynamoDB feel like actual noSQL

```js
Cani.dynamo.save('item', nuItem).then(...);
Cani.dynamo.load('item', {owner:this.userId}).then(...);
```



```html
<script src="aws-sdk.js"></script>
<script src="canijs/cani.js"></script>
<script src="canijs/cani-dynamo/cani-dynamo.js"></script>
<script src="Caniconfig.js"></script>
```

just put this in your Caniconfig

```js
{
   schemas:{
      item:{
         fields:{somehash:'S', id:'N', owner:'S', price:'N'},
         table:{
            arn:'arn:aws:dynamodb:eu-west-1:000000000000:table/tablName',
            hashKey:'id', rangeKey:'somehash',
            indices:(([])) // still needs to be implemented
         }
      }
   },
   awsConfigPack:{region: 'eu-west-1'},
   initOn:['cognito: fb-login']
}
```

see [`demo-caniconfig.js`](https://github.com/nikfrank/canijs/blob/master/src/docs/democonfig.js)
for examples of all the config options for all the modules


## Getting Started
---

```
npm i -S canijs
```

then include the aws sdk, canijs core, cani-dynamo, and your Caniconfig.js of course


## Basic use
---

```js
Cani.dynamo.save('item', {
   owner:this.userId, id:1440, somehash:'blahblahblah', price:2000
}).then(function(res){
   // I can't remember what res is here. Should probably check that!
});
```
```js
Cani.dynamo.load('item', {price:{LT:3000}).then(function(items){
   console.log('there are '+items.length+' items under 3000 shmekels');
});
```

Read the AWS [docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html)
to learn about indices (GSI) that will let you query your data how you please


## Examples
---

Available at ((link))


## Full API
---

### Config Options
---

config.dynamo.schemas
---

"types" for the functional minded. Each schema has a table and a format

config.dynamo.schemas.<<schemaName>>
---

the keys here are the schema names


config.dynamo.schemas.<<schemaName>>.fields
---

object of:

keys - fields on every item;

values - dynamo type.

see: http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DataModel.html


config.dynamo.schemas.<<schemaName>>.table
---

Table description from AWS. Read the DataModel link re: indices


config.dynamo.schemas.<<schemaName>>.table.arn
---

grab this off the table properties


config.dynamo.schemas.<<schemaName>>.table.hashKey
---

exact query main hash key


config.dynamo.schemas.<<schemaName>>.table.rangeKey
---

operator query range key


config.dynamo.schemas.<<schemaName>>.table.indices
---

additional indices on table. Yet unimplemented here.


---
---


config.dynamo.awsConfigPack
---

object to configure region. This is inconsistent withe cognito conf :(


config.dynamo.initOn
---

array of events to trigger Cani.dynamo.init on. Use this with login events!


---


### Module Exposures


...