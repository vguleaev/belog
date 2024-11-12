# Belog

Belog is a drop-in replacement for `console.log` debugging. It's shorter, simpler and provides **better logging** experience = **belog**.

This zero-dependency, universal package works seamlessly in both the browser and Node.js environments.

## Features

- **Log timestamps**: Automatically adds timestamps to your logs.
- **Log prefix**: Automatically adds prefix for better context.
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
