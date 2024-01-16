[![Build Status](https://travis-ci.com/adrenalin/helpers.js.svg?branch=master)](https://travis-ci.com/adrenalin/helpers.js) [![Coverage Status](https://coveralls.io/repos/github/adrenalin/helpers.js/badge.svg?branch=master)](https://coveralls.io/github/adrenalin/helpers.js?branch=master)

## Modules

<dl>
<dt><a href="#module_Errors">Errors</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#BrowserEvents">BrowserEvents</a></dt>
<dd></dd>
<dt><a href="#Config">Config</a></dt>
<dd></dd>
<dt><a href="#Datamap">Datamap</a></dt>
<dd></dd>
<dt><a href="#Dataset">Dataset</a></dt>
<dd></dd>
<dt><a href="#LocalizationError">LocalizationError</a></dt>
<dd></dd>
<dt><a href="#InvalidTimestamp">InvalidTimestamp</a></dt>
<dd></dd>
<dt><a href="#InvalidFormatter">InvalidFormatter</a></dt>
<dd></dd>
<dt><a href="#Localization">Localization</a></dt>
<dd></dd>
<dt><a href="#Storage">Storage</a></dt>
<dd></dd>
<dt><a href="#TreeError">TreeError</a></dt>
<dd></dd>
<dt><a href="#PropertyError">PropertyError</a></dt>
<dd></dd>
<dt><a href="#PropertyError">PropertyError</a></dt>
<dd></dd>
<dt><a href="#NodeNotFound">NodeNotFound</a></dt>
<dd></dd>
<dt><a href="#Tree">Tree</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#setSchema">setSchema(schema)</a> ⇒ <code><a href="#Config">Config</a></code></dt>
<dd><p>Set JSON schema validation for the configuration. This sets the main schema
for the configuration instead of adding a schema by its id, which can be
used to add optional referenced schemas.</p></dd>
<dt><a href="#addSchema">addSchema(schema)</a> ⇒ <code><a href="#Config">Config</a></code></dt>
<dd><p>Add a JSON schema to config validator. Use this to add any referenced
schemas and Config.setSchema for the main schema.</p></dd>
<dt><a href="#normalizeSchemaId">normalizeSchemaId(id)</a> ⇒ <code>string</code></dt>
<dd><p>Normalize schema id</p></dd>
<dt><a href="#buildUrl">buildUrl([args])</a></dt>
<dd><p>Build URL from the given parameters</p></dd>
<dt><a href="#buildUrl">buildUrl(protocol, [host], [port], [username], [password], [location], [query])</a> ⇒ <code>string</code></dt>
<dd><p>Build URL from the given parameters</p></dd>
<dt><a href="#castObjectAsArray">castObjectAsArray(source, recurse)</a> ⇒ <code>array</code></dt>
<dd><p>Cast an indexed object as array</p></dd>
<dt><a href="#castToArray">castToArray(input)</a> ⇒ <code>mixed</code></dt>
<dd><p>Cast values</p></dd>
<dt><a href="#copyObject">copyObject(source)</a> ⇒ <code>mixed</code></dt>
<dd><p>Create a deep copy of an object or an array</p></dd>
<dt><a href="#escapeSql">escapeSql(arg, [quote], [force])</a> ⇒ <code>mixed</code></dt>
<dd><p>Escape SQL argument</p></dd>
<dt><a href="#expandObject">expandObject(input)</a></dt>
<dd><p>Expand a flattened object. This method unpacks values flattened with
flattenObject</p></dd>
<dt><a href="#flattenObject">flattenObject(input)</a></dt>
<dd><p>Flatten an object. This is a serialization method that takes an object and
flattens it into a single-level object with deep keys joined with a dot.</p></dd>
<dt><a href="#getClassName">getClassName(input)</a> ⇒ <code>string</code></dt>
<dd><p>Get unique class names from a string or an array input</p></dd>
<dt><a href="#getObjectPaths">getObjectPaths(source)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Get an array or a set mapped by the given attribute</p></dd>
<dt><a href="#getObjectPaths">getObjectPaths(source)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Get object paths</p></dd>
<dt><a href="#getPath">getPath(path)</a> ⇒ <code>Array.&lt;string&gt;</code></dt>
<dd><p>Internal helper to get path from the given argument</p></dd>
<dt><a href="#getRandomString">getRandomString(length)</a></dt>
<dd><p>Get random string of the given length</p></dd>
<dt><a href="#getValue">getValue(source, path, [defaultValue])</a> ⇒ <code>mixed</code></dt>
<dd><p>Get value by path, each node separated by a dot (.). If an array of paths is
given, the first available value is returned. If no value is found the
default value is returned.</p></dd>
<dt><a href="#getValue">getValue(haystack, needles)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if the haystack has all of the needles</p></dd>
<dt><a href="#getValue">getValue(haystack, needles)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if the haystack has any of the needles</p></dd>
<dt><a href="#getValue">getValue(haystack, needles)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if the haystack has other values than the needle</p></dd>
<dt><a href="#httpBuildQuery">httpBuildQuery(query, options)</a> ⇒ <code>string</code></dt>
<dd><p>Build a HTTP query from an object</p></dd>
<dt><a href="#intersection">intersection()</a> ⇒ <code>array</code></dt>
<dd><p>Get intersection of the given arrays</p></dd>
<dt><a href="#isEqual">isEqual(value)</a></dt>
<dd><p>Compare two or more items to check if they are equal</p></dd>
<dt><a href="#isInstance">isInstance(source, targets, loose)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if the given object is instance of the given types</p></dd>
<dt><a href="#isObject">isObject(value)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if the input value is a plain object</p></dd>
<dt><a href="#roundTo">roundTo(value, [precision], [method])</a></dt>
<dd><p>Round to precision</p></dd>
<dt><a href="#sleep">sleep(duration)</a></dt>
<dd><p>Sleep for the given amount of time</p></dd>
<dt><a href="#sortObject">sortObject(input)</a></dt>
<dd><p>Sort an object by key or an array by its values</p></dd>
<dt><a href="#splitStringIntoChunks">splitStringIntoChunks(input, length, separator, [left])</a> ⇒ <code>string</code></dt>
<dd><p>Split string into chunks of the given size and merge them with the given
separator string. Default chunk grouping order is from right to left.</p></dd>
</dl>

<a name="module_Errors"></a>

## Errors

* [Errors](#module_Errors)
    * [~ConfigError](#module_Errors..ConfigError)
        * [new ConfigError()](#new_module_Errors..ConfigError_new)
    * [~ConfigNotFoundError](#module_Errors..ConfigNotFoundError) ⇐ <code>ConfigError</code>
        * [new ConfigNotFoundError()](#new_module_Errors..ConfigNotFoundError_new)
    * [~ConfigParseError](#module_Errors..ConfigParseError) ⇐ <code>ConfigError</code>
        * [new ConfigParseError()](#new_module_Errors..ConfigParseError_new)

<a name="module_Errors..ConfigError"></a>

### Errors~ConfigError
**Kind**: inner class of [<code>Errors</code>](#module_Errors)
**Summary**: <p>Config error</p>.
<a name="new_module_Errors..ConfigError_new"></a>

#### new ConfigError()
<p>Config error</p>

<a name="module_Errors..ConfigNotFoundError"></a>

### Errors~ConfigNotFoundError ⇐ <code>ConfigError</code>
**Kind**: inner class of [<code>Errors</code>](#module_Errors)
**Summary**: <p>Config not found error</p>.
**Extends**: <code>ConfigError</code>
<a name="new_module_Errors..ConfigNotFoundError_new"></a>

#### new ConfigNotFoundError()
<p>Config not found error</p>

<a name="module_Errors..ConfigParseError"></a>

### Errors~ConfigParseError ⇐ <code>ConfigError</code>
**Kind**: inner class of [<code>Errors</code>](#module_Errors)
**Summary**: <p>Config parse error</p>.
**Extends**: <code>ConfigError</code>
<a name="new_module_Errors..ConfigParseError_new"></a>

#### new ConfigParseError()
<p>Config parse error</p>

<a name="BrowserEvents"></a>

## BrowserEvents
**Kind**: global class
**Summary**: <p>Browser events class</p>.

* [BrowserEvents](#BrowserEvents)
    * [new BrowserEvents()](#new_BrowserEvents_new)
    * [.on(eventName, callback)](#BrowserEvents+on)
    * [.off(eventName, [callback])](#BrowserEvents+off)
    * [.trigger(eventName)](#BrowserEvents+trigger)

<a name="new_BrowserEvents_new"></a>

### new BrowserEvents()
<p>Browser events class</p>

<a name="BrowserEvents+on"></a>

### browserEvents.on(eventName, callback)
<p>Register an event listener</p>

**Kind**: instance method of [<code>BrowserEvents</code>](#BrowserEvents)
**Summary**: <p>Register an event listener</p>.

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | <p>Event name</p> |
| callback | <code>function</code> | <p>Event listener</p> |

<a name="BrowserEvents+off"></a>

### browserEvents.off(eventName, [callback])
<p>Unregister event listeners, optionally only the given</p>

**Kind**: instance method of [<code>BrowserEvents</code>](#BrowserEvents)
**Summary**: <p>Unregister event listeners, optionally only the given</p>.

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | <p>Event name</p> |
| [callback] | <code>function</code> | <p>Event listener</p> |

<a name="BrowserEvents+trigger"></a>

### browserEvents.trigger(eventName)
<p>Trigger an event</p>

**Kind**: instance method of [<code>BrowserEvents</code>](#BrowserEvents)
**Summary**: <p>Trigger an event</p>.

| Param | Type | Description |
| --- | --- | --- |
| eventName | <code>string</code> | <p>Event name</p> |
| ...args | <code>mixed</code> | <p>Event arguments</p> |

<a name="Config"></a>

## Config
**Kind**: global class
**Summary**: <p>Configuration class</p>.

* [Config](#Config)
    * [new Config()](#new_Config_new)
    * [.constructor([values], [schema])](#Config+constructor)
    * [.setDefaultValues()](#Config+setDefaultValues) ⇒ [<code>Config</code>](#Config)
    * [.getValidator()](#Config+getValidator) ⇒ <code>jsonschema.Validator</code>
    * [.getPath(path)](#Config+getPath) ⇒ <code>array</code>
    * [.set([path], value)](#Config+set) ⇒ [<code>Config</code>](#Config)
    * [.del([path])](#Config+del)
    * [.validateBeforeSet([path], value)](#Config+validateBeforeSet) ⇒ [<code>Config</code>](#Config)
    * [.validate([values], [schema])](#Config+validate) ⇒ [<code>Config</code>](#Config)
    * [.setValuesToPath([path], value, target)](#Config+setValuesToPath) ⇒ <code>object</code>
    * [.get(paths, defaultValue)](#Config+get) ⇒ <code>mixed</code>
    * [.toJSON()](#Config+toJSON) ⇒ <code>object</code>

<a name="new_Config_new"></a>

### new Config()
<p>Configuration class</p>

<a name="Config+constructor"></a>

### config.constructor([values], [schema])
<p>Constructor</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Constructor</p>.

| Param | Type | Description |
| --- | --- | --- |
| [values] | <code>object</code> | <p>Instance values</p> |
| [schema] | <code>object</code> | <p>Instance schema</p> |

<a name="Config+setDefaultValues"></a>

### config.setDefaultValues() ⇒ [<code>Config</code>](#Config)
<p>Set default values</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Set default values</p>.
**Returns**: [<code>Config</code>](#Config) - <p>Self</p>
<a name="Config+getValidator"></a>

### config.getValidator() ⇒ <code>jsonschema.Validator</code>
<p>Get a singleton instance of validator</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Get a singleton instance of validator</p>.
**Returns**: <code>jsonschema.Validator</code> - <p>Validator instance</p>
<a name="Config+getPath"></a>

### config.getPath(path) ⇒ <code>array</code>
<p>Internal helper to get path from the given argument</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Internal helper to get path from the given argument</p>.
**Returns**: <code>array</code> - <p>Path as an array</p>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>mixed</code> | <p>String or an array of strings</p> |

<a name="Config+set"></a>

### config.set([path], value) ⇒ [<code>Config</code>](#Config)
<p>Set configuration value</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Set configuration value</p>.
**Returns**: [<code>Config</code>](#Config) - <p>Self</p>

| Param | Type | Description |
| --- | --- | --- |
| [path] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>or an array of strings</p> |
| value | <code>mixed</code> | <p>Any value that can be serialized as JSON</p> |

<a name="Config+del"></a>

### config.del([path])
<p>Delete a configuration value</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Delete a configuration value</p>.

| Param | Type | Description |
| --- | --- | --- |
| [path] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>or an array of strings</p> |

<a name="Config+validateBeforeSet"></a>

### config.validateBeforeSet([path], value) ⇒ [<code>Config</code>](#Config)
<p>Validate the value before setting it</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Validate the value before setting it</p>.
**Returns**: [<code>Config</code>](#Config) - <p>Self</p>

| Param | Type | Description |
| --- | --- | --- |
| [path] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>or an array of strings</p> |
| value | <code>mixed</code> | <p>Any value that can be serialized as JSON</p> |

<a name="Config+validate"></a>

### config.validate([values], [schema]) ⇒ [<code>Config</code>](#Config)
<p>Validate configuration</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Validate configuration</p>.
**Returns**: [<code>Config</code>](#Config) - <p>Self</p>

| Param | Type | Description |
| --- | --- | --- |
| [values] | <code>object</code> | <p>Values; stored values when omitted</p> |
| [schema] | <code>object</code> | <p>Schema to validate against</p> |

<a name="Config+setValuesToPath"></a>

### config.setValuesToPath([path], value, target) ⇒ <code>object</code>
<p>Set value to path for the given target object</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Set value to path for the given target object</p>.
**Returns**: <code>object</code> - <p>Target object</p>

| Param | Type | Description |
| --- | --- | --- |
| [path] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>or an array of strings</p> |
| value | <code>mixed</code> | <p>Any value that can be serialized as JSON</p> |
| target | <code>object</code> | <p>Target object</p> |

<a name="Config+get"></a>

### config.get(paths, defaultValue) ⇒ <code>mixed</code>
<p>Get configuration value</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>Get configuration value</p>.
**Returns**: <code>mixed</code> - <p>Stored configuration value or the given default value</p>

| Param | Type | Description |
| --- | --- | --- |
| paths | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>String or an array of strings</p> |
| defaultValue | <code>mixed</code> | <p>Default value if the stored is null or undefined</p> |

<a name="Config+toJSON"></a>

### config.toJSON() ⇒ <code>object</code>
<p>JSON serializer</p>

**Kind**: instance method of [<code>Config</code>](#Config)
**Summary**: <p>JSON serializer</p>.
**Returns**: <code>object</code> - <p>JSON serializeable object</p>
<a name="Datamap"></a>

## Datamap
**Kind**: global class
**Summary**: <p>Replacement for Javascript's native Map that is very slow to access data
versus a purecode object.</p>

* [Datamap](#Datamap)
    * [new Datamap()](#new_Datamap_new)
    * _instance_
        * [.length](#Datamap+length) : <code>number</code>
        * [.size](#Datamap+size) : <code>number</code>
        * [.clone](#Datamap+clone) : <code>function</code>
        * [.has(key)](#Datamap+has) ⇒ <code>boolean</code>
        * [.get(key)](#Datamap+get) ⇒ <code>mixed</code>
        * [.set(key, value)](#Datamap+set)
        * [.add(value)](#Datamap+add)
        * [.setIndex(index)](#Datamap+setIndex)
        * [.keys()](#Datamap+keys) ⇒ <code>Array.&lt;string&gt;</code>
        * [.values()](#Datamap+values) ⇒ <code>Array.&lt;mixed&gt;</code>
        * [.clear()](#Datamap+clear)
        * [.delete(key)](#Datamap+delete)
        * [.forEach(iterator)](#Datamap+forEach)
        * [.map(iterator)](#Datamap+map) ⇒ <code>Array.&lt;mixed&gt;</code>
        * [.reduce(iterator, initialValue)](#Datamap+reduce) ⇒ <code>mixed</code>
        * [.filter(iterator)](#Datamap+filter) ⇒ [<code>Datamap</code>](#Datamap)
        * [.copy()](#Datamap+copy) ⇒ [<code>Datamap</code>](#Datamap)
        * [.slice([start], [end])](#Datamap+slice) ⇒ [<code>Datamap</code>](#Datamap)
    * _static_
        * [.Options](#Datamap.Options) : [<code>Options</code>](#Datamap.Options)

<a name="new_Datamap_new"></a>

### new Datamap()
<p>Replacement for Javascript's native Map that is very slow to access data
versus a purecode object. This will also utilize methods familiar from
Array and Set for iterating, copying, filtering, mapping, reducing the
content.</p>

<a name="Datamap+length"></a>

### datamap.length : <code>number</code>
<p>Datamap length</p>

**Kind**: instance constant of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Datamap length</p>.
<a name="Datamap+size"></a>

### datamap.size : <code>number</code>
<p>Datamap size, alias to length</p>

**Kind**: instance constant of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Datamap size, alias to length</p>.
<a name="Datamap+clone"></a>

### datamap.clone : <code>function</code>
<p>Clone a datamap, alias for copy</p>

**Kind**: instance constant of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Clone a datamap, alias for copy</p>.
<a name="Datamap+has"></a>

### datamap.has(key) ⇒ <code>boolean</code>
<p>Check if the datamap has the given key</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Check if the datamap has the given key</p>.
**Returns**: <code>boolean</code> - <p>True if a value exists</p>

| Param | Type | Description |
| --- | --- | --- |
| key | <code>mixed</code> | <p>Map key</p> |

<a name="Datamap+get"></a>

### datamap.get(key) ⇒ <code>mixed</code>
<p>Get the datamap value</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Get the datamap value</p>.
**Returns**: <code>mixed</code> - <p>Stored value</p>

| Param | Type | Description |
| --- | --- | --- |
| key | <code>mixed</code> | <p>Map key</p> |

<a name="Datamap+set"></a>

### datamap.set(key, value)
<p>Set the datamap value</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Set the datamap value</p>.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>mixed</code> | <p>Map key</p> |
| value | <code>mixed</code> | <p>Stored value</p> |

<a name="Datamap+add"></a>

### datamap.add(value)
<p>Add an indexed datamap value</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Add an indexed datamap value</p>.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>object</code> | <p>Any value</p> |

<a name="Datamap+setIndex"></a>

### datamap.setIndex(index)
<p>Set index for datamap values</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Set index for datamap values</p>.

| Param | Type | Description |
| --- | --- | --- |
| index | <code>string</code> | <p>Any value</p> |

<a name="Datamap+keys"></a>

### datamap.keys() ⇒ <code>Array.&lt;string&gt;</code>
<p>Get the datamap keys</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Get the datamap keys</p>.
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Stored keys</p>
<a name="Datamap+values"></a>

### datamap.values() ⇒ <code>Array.&lt;mixed&gt;</code>
<p>Get the datamap values</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Get the datamap values</p>.
**Returns**: <code>Array.&lt;mixed&gt;</code> - <p>Stored values</p>
<a name="Datamap+clear"></a>

### datamap.clear()
<p>Clear the datamap</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Clear the datamap</p>.
<a name="Datamap+delete"></a>

### datamap.delete(key)
<p>Delete a datamap key</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Delete a datamap key</p>.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>mixed</code> | <p>Map key</p> |

<a name="Datamap+forEach"></a>

### datamap.forEach(iterator)
<p>Iterate a datamap</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Iterate a datamap</p>.

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>function</code> | <p>Iterator callback function</p> |

<a name="Datamap+map"></a>

### datamap.map(iterator) ⇒ <code>Array.&lt;mixed&gt;</code>
<p>Map function for a datamap</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Map function for a datamap</p>.
**Returns**: <code>Array.&lt;mixed&gt;</code> - <p>Iterator output</p>

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>function</code> | <p>Iterator callback function</p> |

<a name="Datamap+reduce"></a>

### datamap.reduce(iterator, initialValue) ⇒ <code>mixed</code>
<p>Reduce function for a datamap</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Reduce function for a datamap</p>.
**Returns**: <code>mixed</code> - <p>Iterator output</p>

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>function</code> | <p>Iterator callback function</p> |
| initialValue | <code>mixed</code> | <p>Initial value</p> |

<a name="Datamap+filter"></a>

### datamap.filter(iterator) ⇒ [<code>Datamap</code>](#Datamap)
<p>Filter function for Datamap</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Filter function for Datamap</p>.
**Returns**: [<code>Datamap</code>](#Datamap) - <p>Filtered datamap</p>

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>function</code> | <p>Iterator callback function</p> |

<a name="Datamap+copy"></a>

### datamap.copy() ⇒ [<code>Datamap</code>](#Datamap)
<p>Copy function for datamap</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Copy function for datamap</p>.
**Returns**: [<code>Datamap</code>](#Datamap) - <p>Copy of the datamap</p>
<a name="Datamap+slice"></a>

### datamap.slice([start], [end]) ⇒ [<code>Datamap</code>](#Datamap)
<p>Slice function for datamap</p>

**Kind**: instance method of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Slice function for datamap</p>.
**Returns**: [<code>Datamap</code>](#Datamap) - <p>Sliced copy of the datamap</p>

| Param | Type | Description |
| --- | --- | --- |
| [start] | <code>number</code> | <p>Start index</p> |
| [end] | <code>number</code> | <p>End index</p> |

<a name="Datamap.Options"></a>

### Datamap.Options : [<code>Options</code>](#Datamap.Options)
<p>Options object for Datamaps</p>

**Kind**: static constant of [<code>Datamap</code>](#Datamap)
**Summary**: <p>Options object for Datamaps</p>.
<a name="Dataset"></a>

## Dataset
**Kind**: global class
**Summary**: <p>Dataset</p>.
**Implements**: <code>Set</code>

* [Dataset](#Dataset)
    * [new Dataset([data], [options])](#new_Dataset_new)
    * [.size](#Dataset+size)
    * [.includes](#Dataset+includes)
    * [.contains](#Dataset+contains)
    * [.clear](#Dataset+clear)
    * [.*iterator()](#Dataset+*iterator)
    * [.toArray()](#Dataset+toArray) ⇒
    * [.addToMap(values)](#Dataset+addToMap) ⇒ [<code>Dataset</code>](#Dataset)
    * [.add(values)](#Dataset+add)
    * [.addToIndices(values)](#Dataset+addToIndices) ⇒ [<code>Dataset</code>](#Dataset)
    * [.copy()](#Dataset+copy) ⇒ [<code>Dataset</code>](#Dataset)
    * [.merge(data)](#Dataset+merge) ⇒ [<code>Dataset</code>](#Dataset)
    * [.concat()](#Dataset+concat)
    * [.delete(values)](#Dataset+delete)
    * [.clear()](#Dataset+clear)
    * [.getById(id)](#Dataset+getById) ⇒ <code>mixed</code>
    * [.getByIndex(index, id)](#Dataset+getByIndex) ⇒ <code>mixed</code>
    * [.getByProperty(prop, value, recursive)](#Dataset+getByProperty)
    * [.map(iterator)](#Dataset+map) ⇒ [<code>Dataset</code>](#Dataset)
    * [.filetr(iterator, matchAny)](#Dataset+filetr) ⇒ <code>Array.&lt;mixed&gt;</code>
    * [.reduce(reducer, initial)](#Dataset+reduce) ⇒ <code>mixed</code>
    * [.sort(callback)](#Dataset+sort) ⇒ [<code>Dataset</code>](#Dataset)
    * [.reverse()](#Dataset+reverse) ⇒ [<code>Dataset</code>](#Dataset)
    * [.find(callback)](#Dataset+find) ⇒ <code>mixed</code>
    * [.findLast(callback)](#Dataset+findLast) ⇒ <code>mixed</code>
    * [.toJSON()](#Dataset+toJSON) ⇒ <code>array</code>
    * [.splitIntoChunks(length)](#Dataset+splitIntoChunks) ⇒ [<code>Array.&lt;Dataset&gt;</code>](#Dataset)

<a name="new_Dataset_new"></a>

### new Dataset([data], [options])
<p>Dataset</p>


| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Array</code> \| <code>Set</code> | <p>Initial data</p> |
| [options] | <code>object</code> | <p>Options</p> |

<a name="Dataset+size"></a>

### dataset.size
<p>Alias &quot;length&quot; for &quot;size&quot;</p>

**Kind**: instance property of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Alias &quot;length&quot; for &quot;size&quot;</p>.
<a name="Dataset+includes"></a>

### dataset.includes
<p>Alias &quot;includes&quot; for &quot;has&quot;</p>

**Kind**: instance property of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Alias &quot;includes&quot; for &quot;has&quot;</p>.
<a name="Dataset+contains"></a>

### dataset.contains
<p>Alias &quot;contains&quot; for has</p>

**Kind**: instance property of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Alias &quot;contains&quot; for has</p>.
<a name="Dataset+clear"></a>

### dataset.clear
<p>Alias &quot;truncate&quot; for &quot;clear&quot;</p>

**Kind**: instance property of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Alias &quot;truncate&quot; for &quot;clear&quot;</p>.
<a name="Dataset+*iterator"></a>

### dataset.\*iterator()
<p>Iterator protocol</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Iterator protocol</p>.
<a name="Dataset+toArray"></a>

### dataset.toArray() ⇒
<p>Convert dataset to an array</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Convert dataset to an array</p>.
**Returns**: <p>Array</p>
<a name="Dataset+addToMap"></a>

### dataset.addToMap(values) ⇒ [<code>Dataset</code>](#Dataset)
<p>Add values to map. This is for backwards compatibility.</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: Add values to map.
**Returns**: [<code>Dataset</code>](#Dataset) - <p>This instance</p>

| Param | Type | Description |
| --- | --- | --- |
| values | <code>mixed</code> | <p>An individual value, an array or a Set</p> |

<a name="Dataset+add"></a>

### dataset.add(values)
<p>Add an item</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Add an item</p>.

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;mixed&gt;</code> | <p>Any value</p> |

<a name="Dataset+addToIndices"></a>

### dataset.addToIndices(values) ⇒ [<code>Dataset</code>](#Dataset)
<p>Add values to indices</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Add values to indices</p>.
**Returns**: [<code>Dataset</code>](#Dataset) - <p>This instance</p>

| Param | Type | Description |
| --- | --- | --- |
| values | <code>mixed</code> | <p>An individual value, an array or a Set</p> |

<a name="Dataset+copy"></a>

### dataset.copy() ⇒ [<code>Dataset</code>](#Dataset)
<p>Copy the current dataset</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Copy the current dataset</p>.
**Returns**: [<code>Dataset</code>](#Dataset) - <p>Copy of this instance</p>
<a name="Dataset+merge"></a>

### dataset.merge(data) ⇒ [<code>Dataset</code>](#Dataset)
<p>Merge datasets</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Merge datasets</p>.
**Returns**: [<code>Dataset</code>](#Dataset) - <p>Merged datasets</p>

| Param | Type | Description |
| --- | --- | --- |
| data | [<code>Array.&lt;Dataset&gt;</code>](#Dataset) | <p>Datasets to merge</p> |

<a name="Dataset+concat"></a>

### dataset.concat()
<p>Alias for merge</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Alias for merge</p>.
<a name="Dataset+delete"></a>

### dataset.delete(values)
<p>Delete an item</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Delete an item</p>.

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array.&lt;mixed&gt;</code> | <p>Any value</p> |

<a name="Dataset+clear"></a>

### dataset.clear()
<p>Clear the dataset</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Clear the dataset</p>.
<a name="Dataset+getById"></a>

### dataset.getById(id) ⇒ <code>mixed</code>
<p>Get item by id</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Get item by id</p>.
**Returns**: <code>mixed</code> - <p>Stored value</p>

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> \| <code>string</code> | <p>Value of the id property</p> |

<a name="Dataset+getByIndex"></a>

### dataset.getByIndex(index, id) ⇒ <code>mixed</code>
<p>Get item by indexed value</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Get item by indexed value</p>.
**Returns**: <code>mixed</code> - <p>Stored value</p>

| Param | Type | Description |
| --- | --- | --- |
| index | <code>string</code> | <p>Index</p> |
| id | <code>number</code> \| <code>string</code> | <p>Value of the id property</p> |

<a name="Dataset+getByProperty"></a>

### dataset.getByProperty(prop, value, recursive)
<p>Get by property</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Get by property</p>.

| Param | Type | Description |
| --- | --- | --- |
| prop | <code>string</code> | <p>Property</p> |
| value | <code>mixed</code> | <p>Needle</p> |
| recursive | <code>string</code> | <p>Recursive property</p> |

<a name="Dataset+map"></a>

### dataset.map(iterator) ⇒ [<code>Dataset</code>](#Dataset)
<p>Map like an array map</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Map like an array map</p>.
**Returns**: [<code>Dataset</code>](#Dataset) - <p>Dataset of the values returned by the iterator</p>

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>function</code> | <p>Iterator function</p> |

<a name="Dataset+filetr"></a>

### dataset.filetr(iterator, matchAny) ⇒ <code>Array.&lt;mixed&gt;</code>
<p>Filter like an array filter</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Filter like an array filter</p>.
**Returns**: <code>Array.&lt;mixed&gt;</code> - <p>An array with the value iterator gives</p>

| Param | Type | Description |
| --- | --- | --- |
| iterator | <code>function</code> \| <code>object</code> | <p>Iterator function or an object filter</p> |
| matchAny | <code>boolean</code> | <p>Match any flag</p> |

<a name="Dataset+reduce"></a>

### dataset.reduce(reducer, initial) ⇒ <code>mixed</code>
<p>Reduce the dataset</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Reduce the dataset</p>.
**Returns**: <code>mixed</code> - <p>Reduced value</p>

| Param | Type | Description |
| --- | --- | --- |
| reducer | <code>function</code> | <p>Reducer function</p> |
| initial | <code>mixed</code> | <p>Initial value</p> |

<a name="Dataset+sort"></a>

### dataset.sort(callback) ⇒ [<code>Dataset</code>](#Dataset)
<p>Sort a dataset. Unlike Array.sort this will not change the original data
but will return a new sorted Dataset instead.</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: Sort a dataset.
**Returns**: [<code>Dataset</code>](#Dataset) - <p>Sorted dataset</p>

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | <p>Sort callback</p> |

<a name="Dataset+reverse"></a>

### dataset.reverse() ⇒ [<code>Dataset</code>](#Dataset)
<p>Reverse a dataset. Unlike Array.reverse this will not change the original
data but will return a new sorted Dataset instead.</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: Reverse a dataset.
**Returns**: [<code>Dataset</code>](#Dataset) - <p>Reversed dataset</p>
<a name="Dataset+find"></a>

### dataset.find(callback) ⇒ <code>mixed</code>
<p>Find the first occurence from a dataset</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Find the first occurence from a dataset</p>.
**Returns**: <code>mixed</code> - <p>Dataset item</p>

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | <p>Find callback</p> |

<a name="Dataset+findLast"></a>

### dataset.findLast(callback) ⇒ <code>mixed</code>
<p>Find the last occurence from a dataset</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Find the last occurence from a dataset</p>.
**Returns**: <code>mixed</code> - <p>Dataset item</p>

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | <p>Find callback</p> |

<a name="Dataset+toJSON"></a>

### dataset.toJSON() ⇒ <code>array</code>
<p>Serialize dataset as JSON</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Serialize dataset as JSON</p>.
**Returns**: <code>array</code> - <p>JSON serializable array</p>
<a name="Dataset+splitIntoChunks"></a>

### dataset.splitIntoChunks(length) ⇒ [<code>Array.&lt;Dataset&gt;</code>](#Dataset)
<p>Split the dataset into chunks</p>

**Kind**: instance method of [<code>Dataset</code>](#Dataset)
**Summary**: <p>Split the dataset into chunks</p>.
**Returns**: [<code>Array.&lt;Dataset&gt;</code>](#Dataset) - <p>An array of datasets</p>

| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | <p>Number of chunks</p> |

<a name="LocalizationError"></a>

## LocalizationError
**Kind**: global class
**Summary**: <p>Localization error</p>.
<a name="new_LocalizationError_new"></a>

### new LocalizationError()
<p>Localization error</p>

<a name="InvalidTimestamp"></a>

## InvalidTimestamp
**Kind**: global class
**Summary**: <p>Invalid timestamp error</p>.
<a name="new_InvalidTimestamp_new"></a>

### new InvalidTimestamp()
<p>Invalid timestamp error</p>

<a name="InvalidFormatter"></a>

## InvalidFormatter
**Kind**: global class
**Summary**: <p>Invalid formatter error</p>.
<a name="new_InvalidFormatter_new"></a>

### new InvalidFormatter()
<p>Invalid formatter error</p>

<a name="Localization"></a>

## Localization
**Kind**: global class
**Summary**: <p>Localization class</p>.

* [Localization](#Localization)
    * [new Localization([lang], [fallbackLang])](#new_Localization_new)
    * _instance_
        * [.errors](#Localization+errors) : <code>object</code>
        * [.registerLogger(logger)](#Localization+registerLogger) ⇒ [<code>Localization</code>](#Localization)
        * [.logger(level, args)](#Localization+logger) ⇒ [<code>Localization</code>](#Localization)
        * [.registerLocale()](#Localization+registerLocale) ⇒ <code>function</code>
        * [.registerLocales()](#Localization+registerLocales) ⇒ <code>function</code>
        * [.getLocales([lang])](#Localization+getLocales) ⇒ <code>object</code>
        * [.unregisterLocales()](#Localization+unregisterLocales) ⇒ <code>function</code>
        * [.unregisterLocale()](#Localization+unregisterLocale) ⇒ <code>function</code>
        * [.toCase()](#Localization+toCase) ⇒ <code>function</code>
    * _static_
        * [.UPPERCASE](#Localization.UPPERCASE) : <code>string</code>
        * [.LOWERCASE](#Localization.LOWERCASE) : <code>string</code>
        * [.TITLECASE](#Localization.TITLECASE) : <code>string</code>
        * [.PARAGRAPHCASE](#Localization.PARAGRAPHCASE) : <code>string</code>
        * [.CAMELCASE](#Localization.CAMELCASE) : <code>string</code>
        * [.UNDERSCORECASE](#Localization.UNDERSCORECASE) : <code>string</code>
        * [.INVALID_TIMESTAMP](#Localization.INVALID_TIMESTAMP) : <code>Errors.InvalidTimestamp</code>
        * [.errors](#Localization.errors) : <code>object</code>
        * [.validateRounding(rounding)](#Localization.validateRounding)
        * [.getRoundedNumber(value, [precision], [rounding])](#Localization.getRoundedNumber) ⇒ <code>number</code>
        * [.toCase(input, toCase)](#Localization.toCase) ⇒ <code>string</code>
        * [.registerLogger(logger)](#Localization.registerLogger)
        * [.registerLocale(locale, translations)](#Localization.registerLocale) ⇒ [<code>Localization</code>](#Localization)
        * [.registerLocales(data)](#Localization.registerLocales) ⇒ [<code>Localization</code>](#Localization)
        * [.getLocales([lang])](#Localization.getLocales) ⇒ <code>object</code>
        * [.unregisterLocales(data)](#Localization.unregisterLocales) ⇒ [<code>Localization</code>](#Localization)
        * [.unregisterLocale()](#Localization.unregisterLocale) ⇒ <code>function</code>

<a name="new_Localization_new"></a>

### new Localization([lang], [fallbackLang])
<p>Localization class</p>


| Param | Type | Description |
| --- | --- | --- |
| [lang] | <code>string</code> | <p>Localization language</p> |
| [fallbackLang] | <code>string</code> | <p>Fallback language if the main language is not found</p> |

**Example**
```js
`const l10n = new Localization('fi', 'en')`
```
<a name="Localization+errors"></a>

### localization.errors : <code>object</code>
<p>Errors wrapper</p>

**Kind**: instance constant of [<code>Localization</code>](#Localization)
**Summary**: <p>Errors wrapper</p>.
<a name="Localization+registerLogger"></a>

### localization.registerLogger(logger) ⇒ [<code>Localization</code>](#Localization)
<p>Shorthand for the static method Localization.registerLogger</p>

**Kind**: instance method of [<code>Localization</code>](#Localization)
**Summary**: <p>Shorthand for the static method Localization.registerLogger</p>.
**Returns**: [<code>Localization</code>](#Localization) - <p>This instance</p>

| Param | Type | Description |
| --- | --- | --- |
| logger | <code>function</code> | <p>Callback function</p> |

<a name="Localization+logger"></a>

### localization.logger(level, args) ⇒ [<code>Localization</code>](#Localization)
<p>Call logger</p>

**Kind**: instance method of [<code>Localization</code>](#Localization)
**Summary**: <p>Call logger</p>.
**Returns**: [<code>Localization</code>](#Localization) - <p>This instance</p>

| Param | Type | Description |
| --- | --- | --- |
| level | <code>number</code> | <p>Log level</p> |
| args | <code>array</code> | <p>Logger arguments</p> |

<a name="Localization+registerLocale"></a>

### localization.registerLocale() ⇒ <code>function</code>
<p>Alias to the static registerLocale method</p>

**Kind**: instance method of [<code>Localization</code>](#Localization)
**Summary**: <p>Alias to the static registerLocale method</p>.
**Returns**: <code>function</code> - <p>Constructor.toCase function</p>
<a name="Localization+registerLocales"></a>

### localization.registerLocales() ⇒ <code>function</code>
<p>Alias to the static registerLocales method</p>

**Kind**: instance method of [<code>Localization</code>](#Localization)
**Summary**: <p>Alias to the static registerLocales method</p>.
**Returns**: <code>function</code> - <p>Constructor.toCase function</p>
<a name="Localization+getLocales"></a>

### localization.getLocales([lang]) ⇒ <code>object</code>
<p>Get locales, an instance convenience alias for the static method
Localization.getLocales</p>

**Kind**: instance method of [<code>Localization</code>](#Localization)
**Summary**: <p>Get locales, an instance convenience alias for the static method
Localization.getLocales</p>.
**Returns**: <code>object</code> - <p>Registered locales</p>

| Param | Type | Description |
| --- | --- | --- |
| [lang] | <code>string</code> | <p>Language constraint</p> |

<a name="Localization+unregisterLocales"></a>

### localization.unregisterLocales() ⇒ <code>function</code>
<p>Alias to the static registerLocales method</p>

**Kind**: instance method of [<code>Localization</code>](#Localization)
**Summary**: <p>Alias to the static registerLocales method</p>.
**Returns**: <code>function</code> - <p>Constructor.toCase function</p>
<a name="Localization+unregisterLocale"></a>

### localization.unregisterLocale() ⇒ <code>function</code>
<p>Alias to the static registerLocales method</p>

**Kind**: instance method of [<code>Localization</code>](#Localization)
**Summary**: <p>Alias to the static registerLocales method</p>.
**Returns**: <code>function</code> - <p>Constructor.toCase function</p>
<a name="Localization+toCase"></a>

### localization.toCase() ⇒ <code>function</code>
<p>Alias to the static toCase method</p>

**Kind**: instance method of [<code>Localization</code>](#Localization)
**Summary**: <p>Alias to the static toCase method</p>.
**Returns**: <code>function</code> - <p>Constructor.toCase function</p>
<a name="Localization.UPPERCASE"></a>

### Localization.UPPERCASE : <code>string</code>
**Kind**: static constant of [<code>Localization</code>](#Localization)
<a name="Localization.LOWERCASE"></a>

### Localization.LOWERCASE : <code>string</code>
**Kind**: static constant of [<code>Localization</code>](#Localization)
<a name="Localization.TITLECASE"></a>

### Localization.TITLECASE : <code>string</code>
**Kind**: static constant of [<code>Localization</code>](#Localization)
<a name="Localization.PARAGRAPHCASE"></a>

### Localization.PARAGRAPHCASE : <code>string</code>
**Kind**: static constant of [<code>Localization</code>](#Localization)
<a name="Localization.CAMELCASE"></a>

### Localization.CAMELCASE : <code>string</code>
**Kind**: static constant of [<code>Localization</code>](#Localization)
<a name="Localization.UNDERSCORECASE"></a>

### Localization.UNDERSCORECASE : <code>string</code>
**Kind**: static constant of [<code>Localization</code>](#Localization)
<a name="Localization.INVALID_TIMESTAMP"></a>

### Localization.INVALID\_TIMESTAMP : <code>Errors.InvalidTimestamp</code>
**Kind**: static constant of [<code>Localization</code>](#Localization)
<a name="Localization.errors"></a>

### Localization.errors : <code>object</code>
<p>Static errros wrapper</p>

**Kind**: static constant of [<code>Localization</code>](#Localization)
**Summary**: <p>Static errros wrapper</p>.
<a name="Localization.validateRounding"></a>

### Localization.validateRounding(rounding)
<p>Validate rounding type</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: <p>Validate rounding type</p>.

| Param | Type | Description |
| --- | --- | --- |
| rounding | <code>string</code> | <p>Enumerates &quot;round&quot;, &quot;ceil&quot;, &quot;floor&quot;</p> |

<a name="Localization.getRoundedNumber"></a>

### Localization.getRoundedNumber(value, [precision], [rounding]) ⇒ <code>number</code>
<p>Get rounded number</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: <p>Get rounded number</p>.
**Returns**: <code>number</code> - <p>Rounded number</p>

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> \| <code>string</code> |  | <p>Number or a numeric string to round</p> |
| [precision] | <code>number</code> |  | <p>Rounding precision</p> |
| [rounding] | <code>string</code> | <code>&quot;\&quot;round\&quot;&quot;</code> | <p>Enumerates &quot;round&quot;, &quot;ceil&quot;, &quot;floor&quot;</p> |

<a name="Localization.toCase"></a>

### Localization.toCase(input, toCase) ⇒ <code>string</code>
<p>Convert case for a string</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: <p>Convert case for a string</p>.
**Returns**: <code>string</code> - <p>String converted to the given case</p>

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | <p>Input string</p> |
| toCase | <code>string</code> | <p>Case for the output</p> |

<a name="Localization.registerLogger"></a>

### Localization.registerLogger(logger)
<p>Register a logger for the localization. This will log e.g. missing locales</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: Register a logger for the localization.

| Param | Type | Description |
| --- | --- | --- |
| logger | <code>function</code> | <p>Callback function</p> |

**Example**
```
Localization.registerLogger((...args) => console.log(...args))
```
<a name="Localization.registerLocale"></a>

### Localization.registerLocale(locale, translations) ⇒ [<code>Localization</code>](#Localization)
<p>Register locales</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: <p>Register locales</p>.
**Returns**: [<code>Localization</code>](#Localization) - <p>This instance</p>

| Param | Type | Description |
| --- | --- | --- |
| locale | <code>string</code> | <p>Locale key</p> |
| translations | <code>object</code> | <p>Translations</p> |

<a name="Localization.registerLocales"></a>

### Localization.registerLocales(data) ⇒ [<code>Localization</code>](#Localization)
<p>Register locales</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: <p>Register locales</p>.
**Returns**: [<code>Localization</code>](#Localization) - <p>This instance</p>

| Param | Type | Description |
| --- | --- | --- |
| data | <code>object</code> | <p>Locales to register</p> |

<a name="Localization.getLocales"></a>

### Localization.getLocales([lang]) ⇒ <code>object</code>
<p>Get locales</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: <p>Get locales</p>.
**Returns**: <code>object</code> - <p>Registered locales</p>

| Param | Type | Description |
| --- | --- | --- |
| [lang] | <code>string</code> | <p>Language constraint</p> |

<a name="Localization.unregisterLocales"></a>

### Localization.unregisterLocales(data) ⇒ [<code>Localization</code>](#Localization)
<p>Unregister locales</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: <p>Unregister locales</p>.
**Returns**: [<code>Localization</code>](#Localization) - <p>This instance</p>

| Param | Type | Description |
| --- | --- | --- |
| data | <code>mixed</code> | <p>Locales to be registered as a string or array of strings</p> |

<a name="Localization.unregisterLocale"></a>

### Localization.unregisterLocale() ⇒ <code>function</code>
<p>Alias to the static registerLocales method</p>

**Kind**: static method of [<code>Localization</code>](#Localization)
**Summary**: <p>Alias to the static registerLocales method</p>.
**Returns**: <code>function</code> - <p>Constructor.toCase function</p>
<a name="Storage"></a>

## Storage
**Kind**: global class
**Summary**: <p>Storage class</p>.

* [Storage](#Storage)
    * [new Storage(engine)](#new_Storage_new)
    * _instance_
        * [.setEngines(engine)](#Storage+setEngines)
        * [.set(key, value, expiresAt)](#Storage+set)
        * [.get(key, defaultValue)](#Storage+get) ⇒
        * [.del(key)](#Storage+del)
        * [.clear()](#Storage+clear)
    * _static_
        * [.StorageEngine](#Storage.StorageEngine) : <code>StorageEngine</code>
        * [.validateKey(key)](#Storage.validateKey)
        * [.getExpiresAt(expiresAt)](#Storage.getExpiresAt) ⇒ <code>undefined</code> \| <code>Moment</code>
        * [.hasExpired(expiresAt)](#Storage.hasExpired) ⇒ <code>boolean</code>

<a name="new_Storage_new"></a>

### new Storage(engine)
<p>Storage class</p>


| Param | Type | Description |
| --- | --- | --- |
| engine | <code>mixed</code> | <p>Storage engine</p> |

<a name="Storage+setEngines"></a>

### storage.setEngines(engine)
<p>Set storage engine</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)
**Summary**: <p>Set storage engine</p>.

| Param | Type | Description |
| --- | --- | --- |
| engine | <code>mixed</code> | <p>Storage engine</p> |

<a name="Storage+set"></a>

### storage.set(key, value, expiresAt)
<p>Set stored value</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)
**Summary**: <p>Set stored value</p>.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Storage key</p> |
| value | <code>mixed</code> | <p>Storage value</p> |
| expiresAt | <code>mixed</code> | <p>ISO 8601 temporal, seconds as number or anything Moment.js accepts</p> |

<a name="Storage+get"></a>

### storage.get(key, defaultValue) ⇒
<p>Get stored value</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)
**Summary**: <p>Get stored value</p>.
**Returns**: <p>mixed                   Stored value, default value or null</p>

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Storage key</p> |
| defaultValue | <code>mixed</code> | <p>Value if storage does not have anything</p> |

<a name="Storage+del"></a>

### storage.del(key)
<p>Delete a storage key</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)
**Summary**: <p>Delete a storage key</p>.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Storage key</p> |

<a name="Storage+clear"></a>

### storage.clear()
<p>Clear storage</p>

**Kind**: instance method of [<code>Storage</code>](#Storage)
**Summary**: <p>Clear storage</p>.
<a name="Storage.StorageEngine"></a>

### Storage.StorageEngine : <code>StorageEngine</code>
<p>Storage engine</p>

**Kind**: static constant of [<code>Storage</code>](#Storage)
**Summary**: <p>Storage engine</p>.
<a name="Storage.validateKey"></a>

### Storage.validateKey(key)
<p>Validate storage key</p>

**Kind**: static method of [<code>Storage</code>](#Storage)
**Summary**: <p>Validate storage key</p>.

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Storage key</p> |

<a name="Storage.getExpiresAt"></a>

### Storage.getExpiresAt(expiresAt) ⇒ <code>undefined</code> \| <code>Moment</code>
<p>Get expires at</p>

**Kind**: static method of [<code>Storage</code>](#Storage)
**Summary**: <p>Get expires at</p>.
**Returns**: <code>undefined</code> \| <code>Moment</code> - <p>Undefined when no expiration is given, an instance of Moment otherwise</p>

| Param | Type | Description |
| --- | --- | --- |
| expiresAt | <code>mixed</code> | <p>ISO 8601 temporal, seconds as number or anything Moment.js accepts</p> |

<a name="Storage.hasExpired"></a>

### Storage.hasExpired(expiresAt) ⇒ <code>boolean</code>
<p>Check if the timestamp is in the past</p>

**Kind**: static method of [<code>Storage</code>](#Storage)
**Summary**: <p>Check if the timestamp is in the past</p>.
**Returns**: <code>boolean</code> - <p>True if expired, otherwise false</p>

| Param | Type | Description |
| --- | --- | --- |
| expiresAt | <code>string</code> | <p>Expiration timestamp as ISO 8601 string</p> |

<a name="TreeError"></a>

## TreeError
**Kind**: global class
**Summary**: <p>Tree error baseclass</p>.
**Implements**: <code>Error</code>
<a name="new_TreeError_new"></a>

### new TreeError()
<p>Tree error baseclass</p>

<a name="PropertyError"></a>

## PropertyError
**Kind**: global class
**Summary**: <p>PropertyError</p>.
**Implements**: [<code>TreeError</code>](#TreeError)

* [PropertyError](#PropertyError)
    * [new PropertyError()](#new_PropertyError_new)
    * [new PropertyError()](#new_PropertyError_new)

<a name="new_PropertyError_new"></a>

### new PropertyError()
<p>PropertyError</p>

<a name="new_PropertyError_new"></a>

### new PropertyError()
<p>InvalidArgument</p>

<a name="PropertyError"></a>

## PropertyError
**Kind**: global class
**Summary**: <p>InvalidArgument</p>.
**Implements**: [<code>TreeError</code>](#TreeError)

* [PropertyError](#PropertyError)
    * [new PropertyError()](#new_PropertyError_new)
    * [new PropertyError()](#new_PropertyError_new)

<a name="new_PropertyError_new"></a>

### new PropertyError()
<p>PropertyError</p>

<a name="new_PropertyError_new"></a>

### new PropertyError()
<p>InvalidArgument</p>

<a name="NodeNotFound"></a>

## NodeNotFound
**Kind**: global class
**Summary**: <p>NodeNotFound</p>.
**Implements**: [<code>TreeError</code>](#TreeError)
<a name="new_NodeNotFound_new"></a>

### new NodeNotFound()
<p>NodeNotFound</p>

<a name="Tree"></a>

## Tree
**Kind**: global class
**Summary**: <p>Tree traversal class</p>.

* [Tree](#Tree)
    * [new Tree([items], [idProperty], [parentProperty])](#new_Tree_new)
    * _instance_
        * [.addNode()](#Tree+addNode) ⇒ [<code>Tree</code>](#Tree)
        * [.addNodes(items)](#Tree+addNodes) ⇒ [<code>Tree</code>](#Tree)
        * [.getNode(needle)](#Tree+getNode) ⇒ <code>Node</code>
        * [.getBranch(needle, [metadata])](#Tree+getBranch) ⇒ <code>Array.&lt;object&gt;</code>
        * [.getParents(needle, [metadata])](#Tree+getParents) ⇒ <code>Array.&lt;object&gt;</code>
        * [.getParents(needle, [metadata])](#Tree+getParents) ⇒ <code>object</code>
        * [.getParents([needle], [metadata])](#Tree+getParents) ⇒ <code>object</code>
        * [.isInTree(needle, haystack, [metadata])](#Tree+isInTree) ⇒ <code>boolean</code>
        * [.getItems([metadata])](#Tree+getItems)
        * [.removeItem(needle)](#Tree+removeItem)
        * [.removeItems([needles])](#Tree+removeItems)
        * [.removeItems([needles])](#Tree+removeItems)
    * _static_
        * [.errors](#Tree.errors)
        * [.DEFAULT_ID_PROPERTY](#Tree.DEFAULT_ID_PROPERTY) : <code>string</code>
        * [.DEFAULT_PARENT_PROPERTY](#Tree.DEFAULT_PARENT_PROPERTY) : <code>string</code>

<a name="new_Tree_new"></a>

### new Tree([items], [idProperty], [parentProperty])
<p>Tree traversal class</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [items] | <code>Array.&lt;object&gt;</code> |  | <p>Items</p> |
| [idProperty] | <code>string</code> | <code>&quot;&#x27;id&#x27;&quot;</code> | <p>Attribute used for identifier</p> |
| [parentProperty] | <code>string</code> | <code>&quot;&#x27;parent&#x27;&quot;</code> | <p>Attribute used for parent</p> |

**Example**
```js
const nodes = [
      {
        attr_id: 1,
        attr_parent: null
      },
      {
        attr_id: 11,
        attr_parent: 1
      },
      {
        attr_id: 12,
        attr_parent: 1
      },
      {
        attr_id: 2,
        attr_parent: null
      }
    ]
    const tree = new Tree(nodes, 'attr_id', 'attr_parent)
```
<a name="Tree+addNode"></a>

### tree.addNode() ⇒ [<code>Tree</code>](#Tree)
<p>An alias to addNodes</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>An alias to addNodes</p>.
**Returns**: [<code>Tree</code>](#Tree) - <p>This instance</p>
<a name="Tree+addNodes"></a>

### tree.addNodes(items) ⇒ [<code>Tree</code>](#Tree)
<p>Add nodes to the tree</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Add nodes to the tree</p>.
**Returns**: [<code>Tree</code>](#Tree) - <p>This instance</p>

| Param | Type | Description |
| --- | --- | --- |
| items | <code>object</code> \| <code>Array.&lt;object&gt;</code> | <p>Nodes to add</p> |

<a name="Tree+getNode"></a>

### tree.getNode(needle) ⇒ <code>Node</code>
<p>Get node</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Get node</p>.
**Returns**: <code>Node</code> - <p>Matching node</p>

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>mixed</code> | <p>Needle to search</p> |

<a name="Tree+getBranch"></a>

### tree.getBranch(needle, [metadata]) ⇒ <code>Array.&lt;object&gt;</code>
<p>Get branch starting from the given node</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Get branch starting from the given node</p>.
**Returns**: <code>Array.&lt;object&gt;</code> - <p>Original items of the branch</p>

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>mixed</code> | <p>Needle to search</p> |
| [metadata] | <code>boolean</code> | <p>Flag to define if the function should return Nodes instead of original objects</p> |

<a name="Tree+getParents"></a>

### tree.getParents(needle, [metadata]) ⇒ <code>Array.&lt;object&gt;</code>
<p>Get branch starting from the given node</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Get branch starting from the given node</p>.
**Returns**: <code>Array.&lt;object&gt;</code> - <p>Original items of the parent tree</p>

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>mixed</code> | <p>Needle to search</p> |
| [metadata] | <code>boolean</code> | <p>Flag to define if the function should return Nodes instead of original objects</p> |

<a name="Tree+getParents"></a>

### tree.getParents(needle, [metadata]) ⇒ <code>object</code>
<p>Get root node for the given needle</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Get root node for the given needle</p>.
**Returns**: <code>object</code> - <p>Original items of the parent tree</p>

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>mixed</code> | <p>Needle to search</p> |
| [metadata] | <code>boolean</code> | <p>Flag to define if the function should return Nodes instead of original objects</p> |

<a name="Tree+getParents"></a>

### tree.getParents([needle], [metadata]) ⇒ <code>object</code>
<p>Get leaves or the outmost part of the branch for the given needle</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Get leaves or the outmost part of the branch for the given needle</p>.
**Returns**: <code>object</code> - <p>Original items of the parent tree</p>

| Param | Type | Description |
| --- | --- | --- |
| [needle] | <code>mixed</code> | <p>Needle to search</p> |
| [metadata] | <code>boolean</code> | <p>Flag to define if the function should return Nodes instead of original objects</p> |

<a name="Tree+isInTree"></a>

### tree.isInTree(needle, haystack, [metadata]) ⇒ <code>boolean</code>
<p>Get branch starting from the given node</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Get branch starting from the given node</p>.
**Returns**: <code>boolean</code> - <p>True if in the same tree, false if not</p>

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>mixed</code> | <p>Needle to search</p> |
| haystack | <code>mixed</code> | <p>Haystrack to search</p> |
| [metadata] | <code>boolean</code> | <p>Flag to define if the function should return Nodes instead of original objects</p> |

<a name="Tree+getItems"></a>

### tree.getItems([metadata])
<p>Get tree contents</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Get tree contents</p>.

| Param | Type | Description |
| --- | --- | --- |
| [metadata] | <code>boolean</code> | <p>Flag to define if the function should return Nodes instead of original objects</p> |

<a name="Tree+removeItem"></a>

### tree.removeItem(needle)
<p>Remove an item</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Remove an item</p>.

| Param | Type | Description |
| --- | --- | --- |
| needle | <code>mixed</code> | <p>Needle to search</p> |

<a name="Tree+removeItems"></a>

### tree.removeItems([needles])
<p>Remove multiple items or flush the whole tree if no needle is provided</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Remove multiple items or flush the whole tree if no needle is provided</p>.

| Param | Type | Description |
| --- | --- | --- |
| [needles] | <code>mixed</code> | <p>Needles to search</p> |

<a name="Tree+removeItems"></a>

### tree.removeItems([needles])
<p>Flush the whole tree</p>

**Kind**: instance method of [<code>Tree</code>](#Tree)
**Summary**: <p>Flush the whole tree</p>.

| Param | Type | Description |
| --- | --- | --- |
| [needles] | <code>mixed</code> | <p>Needles to search</p> |

<a name="Tree.errors"></a>

### Tree.errors
<p>Errors</p>

**Kind**: static constant of [<code>Tree</code>](#Tree)
**Summary**: <p>Errors</p>.
<a name="Tree.DEFAULT_ID_PROPERTY"></a>

### Tree.DEFAULT\_ID\_PROPERTY : <code>string</code>
<p>Default id property</p>

**Kind**: static constant of [<code>Tree</code>](#Tree)
**Summary**: <p>Default id property</p>.
**Default**: <code>&quot;id&quot;</code>
<a name="Tree.DEFAULT_PARENT_PROPERTY"></a>

### Tree.DEFAULT\_PARENT\_PROPERTY : <code>string</code>
<p>Default parent property</p>

**Kind**: static constant of [<code>Tree</code>](#Tree)
**Summary**: <p>Default parent property</p>.
**Default**: <code>&quot;parent&quot;</code>
<a name="setSchema"></a>

## setSchema(schema) ⇒ [<code>Config</code>](#Config)
<p>Set JSON schema validation for the configuration. This sets the main schema
for the configuration instead of adding a schema by its id, which can be
used to add optional referenced schemas.</p>

**Kind**: global function
**Summary**: Set JSON schema validation for the configuration.
**Returns**: [<code>Config</code>](#Config) - <p>Self</p>

| Param | Type | Description |
| --- | --- | --- |
| schema | <code>object</code> | <p>JSON schema</p> |

<a name="addSchema"></a>

## addSchema(schema) ⇒ [<code>Config</code>](#Config)
<p>Add a JSON schema to config validator. Use this to add any referenced
schemas and Config.setSchema for the main schema.</p>

**Kind**: global function
**Summary**: Add a JSON schema to config validator.
**Returns**: [<code>Config</code>](#Config) - <p>Self</p>

| Param | Type | Description |
| --- | --- | --- |
| schema | <code>object</code> | <p>JSON schema</p> |

<a name="normalizeSchemaId"></a>

## normalizeSchemaId(id) ⇒ <code>string</code>
<p>Normalize schema id</p>

**Kind**: global function
**Summary**: <p>Normalize schema id</p>.
**Returns**: <code>string</code> - <p>Normalized schema id</p>

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>Schema ID</p> |

<a name="buildUrl"></a>

## buildUrl([args])
<p>Build URL from the given parameters</p>

**Kind**: global function
**Summary**: <p>Build URL from the given parameters</p>.

| Param | Type | Description |
| --- | --- | --- |
| [args] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>Arguments</p> |

**Example**
```js
`buildUrl('postgresql', 'localhost', null, 'postgres', 'databaseName', { keepAlive: false })` returns `postgresql://postgres@localhost/databaseName?keepAlive=false`
```
<a name="buildUrl"></a>

## buildUrl(protocol, [host], [port], [username], [password], [location], [query]) ⇒ <code>string</code>
<p>Build URL from the given parameters</p>

**Kind**: global function
**Summary**: <p>Build URL from the given parameters</p>.
**Returns**: <code>string</code> - <p>Constructed URL</p>

| Param | Type | Description |
| --- | --- | --- |
| protocol | <code>string</code> \| <code>object</code> | <p>Protocol or full configuration</p> |
| [host] | <code>string</code> | <p>Host name</p> |
| [port] | <code>number</code> | <p>Port</p> |
| [username] | <code>string</code> | <p>Username</p> |
| [password] | <code>string</code> | <p>Password</p> |
| [location] | <code>string</code> | <p>Location</p> |
| [query] | <code>object</code> | <p>Query parameters</p> |

**Example**
```js
`buildUrl('postgresql', 'localhost', null, 'postgres', 'databaseName', { keepAlive: false })` returns `postgresql://postgres@localhost/databaseName?keepAlive=false`
```
<a name="castObjectAsArray"></a>

## castObjectAsArray(source, recurse) ⇒ <code>array</code>
<p>Cast an indexed object as array</p>

**Kind**: global function
**Summary**: <p>Cast an indexed object as array</p>.
**Returns**: <code>array</code> - <p>Array conversion of the object</p>

| Param | Type | Description |
| --- | --- | --- |
| source | <code>object</code> | <p>Source object</p> |
| recurse | <code>boolean</code> | <p>Recurse to child objects</p> |

<a name="castToArray"></a>

## castToArray(input) ⇒ <code>mixed</code>
<p>Cast values</p>

**Kind**: global function
**Summary**: <p>Cast values</p>.
**Returns**: <code>mixed</code> - <p>Merged object or array</p>

| Param | Type | Description |
| --- | --- | --- |
| input | <code>mixed</code> | <p>Mixed input</p> |

**Example**
```js
`castToArray(null)` returns an empty array `[]`
`castToArray('foo')` returns `['foo']`
`castToArray(['foo'])` returns `['foo']`
`castToArray({ foo: 'bar '})` returns `[{ foo: 'bar' }]`
```
<a name="copyObject"></a>

## copyObject(source) ⇒ <code>mixed</code>
<p>Create a deep copy of an object or an array</p>

**Kind**: global function
**Summary**: <p>Create a deep copy of an object or an array</p>.
**Returns**: <code>mixed</code> - <p>Copy of the given value</p>

| Param | Type | Description |
| --- | --- | --- |
| source | <code>mixed</code> | <p>Source object/primitive to copy</p> |

<a name="escapeSql"></a>

## escapeSql(arg, [quote], [force]) ⇒ <code>mixed</code>
<p>Escape SQL argument</p>

**Kind**: global function
**Summary**: <p>Escape SQL argument</p>.
**Returns**: <code>mixed</code> - <p>Escaped string or an object or and array of escaped strings</p>

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arg | <code>mixed</code> |  | <p>Argument to escape</p> |
| [quote] | <code>string</code> | <code>&quot;&#x27;\&quot;&#x27;&quot;</code> | <p>Quote type, either &quot; or '</p> |
| [force] | <code>boolean</code> | <code>false</code> | <p>Flag to force quotes</p> |

**Example**
```js
escapeSql takes a value (string, number, boolean, null) and escapes it if
it should be escaped. Second argument can be either the quote type (' and ")
are accepted. Third argument is force flag to force quote. If second argument
is a boolean value default quote type will be used and second argument will
be used as the force flag.

    escapeSql('foo')
    // returns foo

    escapeSql(123)
    // returns 123

    escapeSql('foo', true)
     // returns "foo"

    escapeSql('foo"bar')
    // returns "foo""bar"

If the first argument is an array or an object it will be recursively
escaped.

    escapeSql(['foo', 'bar'], '"', true)
    // returns ["\"foo\"", "\"bar\""]

    escapeSql({ foo: 'bar' }, "'", true)
    // returns { foo: "'bar'" }
```
<a name="expandObject"></a>

## expandObject(input)
<p>Expand a flattened object. This method unpacks values flattened with
flattenObject</p>

**Kind**: global function
**Summary**: Expand a flattened object.

| Param | Type | Description |
| --- | --- | --- |
| input | <code>object</code> | <p>Object to expand</p> |

**Example**
Example:

```
expandObject({
{
  'foo.bar.value': true
  'foo.array': ['foo', 'bar']
}
})
```

will output

```
{
  foo: {
    bar: {
      value: true
    },
    array: ['foo', 'bar'],
  }
}
```
<a name="flattenObject"></a>

## flattenObject(input)
<p>Flatten an object. This is a serialization method that takes an object and
flattens it into a single-level object with deep keys joined with a dot.</p>

**Kind**: global function
**Summary**: Flatten an object.

| Param | Type | Description |
| --- | --- | --- |
| input | <code>object</code> | <p>Object tree to flatten</p> |

**Example**
```
flattenObject({
  foo: {
    bar: {
      value: true
    },
    array: ['foo', 'bar'],
  }
})
```

will outpout

```
{
  'foo.bar.value': true
  'foo.array': ['foo', 'bar']
}
```
<a name="getClassName"></a>

## getClassName(input) ⇒ <code>string</code>
<p>Get unique class names from a string or an array input</p>

**Kind**: global function
**Summary**: <p>Get unique class names from a string or an array input</p>.
**Returns**: <code>string</code> - <p>Unique class names</p>

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>A string or an array</p> |
| [...args] | <code>mixed</code> | <p>0...n other class names</p> |

<a name="getObjectPaths"></a>

## getObjectPaths(source) ⇒ <code>Array.&lt;string&gt;</code>
<p>Get an array or a set mapped by the given attribute</p>

**Kind**: global function
**Summary**: <p>Get an array or a set mapped by the given attribute</p>.
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Path as an array</p>

| Param | Type | Description |
| --- | --- | --- |
| source | <code>object</code> | <p>Source object</p> |

<a name="getObjectPaths"></a>

## getObjectPaths(source) ⇒ <code>Array.&lt;string&gt;</code>
<p>Get object paths</p>

**Kind**: global function
**Summary**: <p>Get object paths</p>.
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Path as an array</p>

| Param | Type | Description |
| --- | --- | --- |
| source | <code>object</code> | <p>Source object</p> |

<a name="getPath"></a>

## getPath(path) ⇒ <code>Array.&lt;string&gt;</code>
<p>Internal helper to get path from the given argument</p>

**Kind**: global function
**Summary**: <p>Internal helper to get path from the given argument</p>.
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Path as an array</p>

| Param | Type | Description |
| --- | --- | --- |
| path | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>String or an array of strings</p> |

<a name="getRandomString"></a>

## getRandomString(length)
<p>Get random string of the given length</p>

**Kind**: global function
**Summary**: <p>Get random string of the given length</p>.

| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | <p>Length of the random string</p> |

<a name="getValue"></a>

## getValue(source, path, [defaultValue]) ⇒ <code>mixed</code>
<p>Get value by path, each node separated by a dot (.). If an array of paths is
given, the first available value is returned. If no value is found the
default value is returned.</p>

**Kind**: global function
**Summary**: Get value by path, each node separated by a dot (.).
**Returns**: <code>mixed</code> - <p>Value stored in the path or the given default value</p>

| Param | Type | Description |
| --- | --- | --- |
| source | <code>object</code> | <p>Source object</p> |
| path | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>Path as a string or an array of strings for first-match</p> |
| [defaultValue] | <code>mixed</code> | <p>Default value if nothing is found from the path(s)</p> |

<a name="getValue"></a>

## getValue(haystack, needles) ⇒ <code>boolean</code>
<p>Check if the haystack has all of the needles</p>

**Kind**: global function
**Summary**: <p>Check if the haystack has all of the needles</p>.
**Returns**: <code>boolean</code> - <p>True if the haystack has any of the needles</p>

| Param | Type | Description |
| --- | --- | --- |
| haystack | <code>mixed</code> | <p>Source object</p> |
| needles | <code>mixed</code> | <p>Needles</p> |

<a name="getValue"></a>

## getValue(haystack, needles) ⇒ <code>boolean</code>
<p>Check if the haystack has any of the needles</p>

**Kind**: global function
**Summary**: <p>Check if the haystack has any of the needles</p>.
**Returns**: <code>boolean</code> - <p>True if the haystack has any of the needles</p>

| Param | Type | Description |
| --- | --- | --- |
| haystack | <code>mixed</code> | <p>Source object</p> |
| needles | <code>mixed</code> | <p>Needles</p> |

<a name="getValue"></a>

## getValue(haystack, needles) ⇒ <code>boolean</code>
<p>Check if the haystack has other values than the needle</p>

**Kind**: global function
**Summary**: <p>Check if the haystack has other values than the needle</p>.
**Returns**: <code>boolean</code> - <p>True if the haystack has any of the needles</p>

| Param | Type | Description |
| --- | --- | --- |
| haystack | <code>mixed</code> | <p>Source object</p> |
| needles | <code>mixed</code> | <p>Needles</p> |

<a name="httpBuildQuery"></a>

## httpBuildQuery(query, options) ⇒ <code>string</code>
<p>Build a HTTP query from an object</p>

**Kind**: global function
**Summary**: <p>Build a HTTP query from an object</p>.

| Param | Type | Description |
| --- | --- | --- |
| query | <code>object</code> | <p>Query object</p> |
| options | <code>object</code> | <p>Build options</p> |

<a name="intersection"></a>

## intersection() ⇒ <code>array</code>
<p>Get intersection of the given arrays</p>

**Kind**: global function
**Summary**: <p>Get intersection of the given arrays</p>.
**Returns**: <code>array</code> - <p>Intersection</p>

| Param | Type | Description |
| --- | --- | --- |
| ...inputs | <code>array</code> | <p>Input arrays</p> |

<a name="isEqual"></a>

## isEqual(value)
<p>Compare two or more items to check if they are equal</p>

**Kind**: global function
**Summary**: <p>Compare two or more items to check if they are equal</p>.

| Param | Type | Description |
| --- | --- | --- |
| value | <code>mixed</code> | <p>First item</p> |
| ...args | <code>mixed</code> | <p>Items to compare</p> |

<a name="isInstance"></a>

## isInstance(source, targets, loose) ⇒ <code>boolean</code>
<p>Check if the given object is instance of the given types</p>

**Kind**: global function
**Summary**: <p>Check if the given object is instance of the given types</p>.
**Returns**: <code>boolean</code> - <p>True if is instance, false if not</p>

| Param | Type | Description |
| --- | --- | --- |
| source | <code>mixed</code> | <p>Source object to check</p> |
| targets | <code>mixed</code> | <p>Target instances</p> |
| loose | <code>boolean</code> | <p>Loose check</p> |

<a name="isObject"></a>

## isObject(value) ⇒ <code>boolean</code>
<p>Check if the input value is a plain object</p>

**Kind**: global function
**Summary**: <p>Check if the input value is a plain object</p>.
**Returns**: <code>boolean</code> - <p>True if the input is an object, false if not</p>

| Param | Type | Description |
| --- | --- | --- |
| value | <code>mixed</code> | <p>Any input type</p> |

<a name="roundTo"></a>

## roundTo(value, [precision], [method])
<p>Round to precision</p>

**Kind**: global function
**Summary**: <p>Round to precision</p>.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>number</code> |  | <p>Value to round</p> |
| [precision] | <code>number</code> | <code>0</code> | <p>Precision</p> |
| [method] | <code>string</code> | <code>&quot;\&quot;round\&quot;&quot;</code> | <p>Rounding method, one of &quot;round&quot;, &quot;floor&quot; or &quot;ceil&quot;</p> |

**Example**
```js
Default precision is 0 and rounding method "round"

    roundTo(1.23) // Will yield 1
    roundTo(1.5) // Will yield 2

Positive precision allows more decimals, negative rounds to tens

    roundTo(1.23, 1) // Will yield 1.2
    roundTo(12.3, -1) // Will yield 10

"ceil" will round up and "floor" will round down

    roundTo(1.23, 0, 'ceil') // Will yield 2
    roundTo(1.8, 0, 'floor') // Will yield 1
```
<a name="sleep"></a>

## sleep(duration)
<p>Sleep for the given amount of time</p>

**Kind**: global function
**Summary**: <p>Sleep for the given amount of time</p>.

| Param | Type | Description |
| --- | --- | --- |
| duration | <code>number</code> | <p>Sleep time in milliseconds</p> |

<a name="sortObject"></a>

## sortObject(input)
<p>Sort an object by key or an array by its values</p>

**Kind**: global function
**Summary**: <p>Sort an object by key or an array by its values</p>.

| Param | Type | Description |
| --- | --- | --- |
| input | <code>\*</code> | <p>Any input</p> |

**Example**
```js
sortObject({ foo: 'bar', bar: 'foo' }) // will output {"bar": "foo", "foo": "bar"}
    sortObject([3, 2, 1]) // will output [1, 2, 3]
```
<a name="splitStringIntoChunks"></a>

## splitStringIntoChunks(input, length, separator, [left]) ⇒ <code>string</code>
<p>Split string into chunks of the given size and merge them with the given
separator string. Default chunk grouping order is from right to left.</p>

**Kind**: global function
**Summary**: <p>Split string into chunks of the given size and merge them with the given
separator string.</p>
**Returns**: <code>string</code> - <p>String split into chunks with the given separator</p>

| Param | Type | Description |
| --- | --- | --- |
| input | <code>string</code> | <p>Input string</p> |
| length | <code>number</code> | <p>Chunk length</p> |
| separator | <code>string</code> | <p>Separator between the chunks</p> |
| [left] | <code>boolean</code> | <p>Start chunks from left to right instead of right to left</p> |
