# Belog

Belog is a drop-in replacement for `console.log` debugging. It's shorter, simpler and provides **better logging** experience = **belog**.

This zero-dependency, universal package works seamlessly in both the browser and Node.js environments.

`console.log()` debugging has never been easier! 😃

## Features

- **Log timestamps**: Automatically adds timestamps to your logs.
- **Log prefix**: Automatically adds default or custom prefix for better context.
- **Conditional Logging**: Easily enable logs when condition matches.
- **Color Selection**: Choose log colors for better visibility.
- **Logging to File**: Save logs to a file (Node.js only).

> **Note**: Belog is intended for debugging purposes, not for production logging!

## Install

Install Belog via npm:

```
npm i belog
```

## Usage

Here's a basic example of how to use Belog:

```javascript
import belog from 'belog';

belog('hello world!');
```

This outputs log with prefix _"belog"_ for easier searching in you terminal and a timestamp.

Log output example:

```
> belog [09:31:32.617]: hello world!
```

`belog()` can be treated as a shorter alias for `console.log()` with additional enhancements.

Since **belog** is just a wrapper around `console.log()`, it supports all the arguments that `console.log()` does. This means you can use it in the same way you would use `console.log()`, but with the **added benefits** and **cleaner api of method chaining**.

## Chain method calls

You can chain methods together in a Fluent API fashion.

```javascript
belog('hello').withPrefix('start').inColor('blue').when(isValid);
```

## withPrefix(prefix: string)

Set a prefix for the log message. Default prefix is "belog".

```javascript
belog('hello world!').withPrefix('react');
// react [09:31:32.617]: hello world!
```

## when(condition: boolean)

Set a condition for logging.

```javascript
const isAdult = age > 18;
belog('hello').when(isAdult);
```

## toFile(filename?: string)

Log the message to a file. If the file does not exist, it will be created. If the file exists, the message will be appended to it.

`filename` param is optional, default is "belog.log". File will be created in project root directory.

**Not supported in Browser!**

```javascript
belog('hello').toFile('log.txt');
```

To overwrite the file instead of appending, you can set the second parameter to `true`:

```javascript
belog('hello').toFile('log.txt', true);
```

## inColor(color: string)

Set the color for the console log.

Possible colors are:

```
"grey" | "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white"
```

```javascript
belog('hello').inColor('green');
```
