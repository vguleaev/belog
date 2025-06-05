/**
 * Class representing a super logger with fluent API.
 */
class Belog {
  #args;
  #condition;
  #color;
  #isClient;
  #logged;
  #timestamp;
  #prefix;

  constructor(...args) {
    this.#args = args;
    this.#condition = true;
    this.#color = 'grey';
    this.#prefix = 'belog';
    this.#isClient = typeof window !== 'undefined';
    this.#logged = false;
    this.#timestamp = new Date();

    if (this.#isClient) {
      queueMicrotask(() => this.log());
    } else {
      setImmediate(() => this.log());
    }
  }

  /**
   * Set a condition for logging.
   * @param {boolean} condition - The condition to check.
   * @returns {Belog} The Belog instance.
   * @example
   * belog('hello').when(true);
   */
  when(condition) {
    this.#condition = condition;
    return this;
  }

  /**
   * Set a prefix for the log message.
   * @param {string} prefix - The prefix to set.
   * @returns {Belog} The Belog instance.
   * @example
   * belog('hello').withPrefix('react');
   */
  withPrefix(prefix) {
    this.#prefix = prefix;
    return this;
  }

  /**
   * Log the message to a file. If the file does not exist, it will be created.
   * If the file exists, the message will be appended to it.
   *
   * In the browser, this method will log an error.
   * @param {string} filename - The name of the file. Default is "belog.log".
   * @param {boolean} overwrite - If true, the file will be overwritten. Default is false.
   * @returns {Belog} The Belog instance.
   * @example
   * belog('hello').toFile('log.txt');
   */
  toFile(filename = 'belog.log', overwrite = false) {
    if (!this.#condition) {
      return this;
    }
    if (this.#isClient) {
      console.error('Logging to file is not supported in the browser');
      return this;
    }

    this.#logToFileAsync(filename, overwrite);
    return this;
  }

  async #logToFileAsync(filename, overwrite) {
    const fs = require('fs').promises;
    const stringifiedArgs = this.#args.map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg));

    if (overwrite) {
      await fs.writeFile(filename, `${stringifiedArgs.join(' ')}\n`);
    } else {
      await fs.appendFile(filename, `${stringifiedArgs.join(' ')}\n`);
    }
  }

  /**
   * Set the color for the console log.
   * @param {"grey"|"black"|"red"|"green"|"yellow"|"blue"|"magenta"|"cyan"|"white"} color - The color to set.
   * @returns {Belog} The Belog instance.
   * @example
   * belog('hello').inColor('green');
   */
  inColor(color) {
    this.#color = color;
    return this;
  }

  /**
   * Log the message to the console.
   *
   * _Called automatically, no need to call it explicitly._
   * @returns {Belog} The Belog instance.
   */
  log() {
    if (!this.#condition || this.#logged) {
      return this;
    }

    const time = this.#getTime();

    if (this.#isClient) {
      const browserColor = `color: ${this.#color};`;
      console.log(`%c${this.#prefix} [${time}]:`, browserColor, ...this.#args);
    } else {
      const colorCode = this.#getColorCode(this.#color);
      console.log(`${colorCode}${this.#prefix} [${time}]:${this.#getResetColor()}`, ...this.#args);
    }

    this.#logged = true;
    return this;
  }

  #getTime() {
    const hours = this.#timestamp.getHours().toString().padStart(2, '0');
    const minutes = this.#timestamp.getMinutes().toString().padStart(2, '0');
    const seconds = this.#timestamp.getSeconds().toString().padStart(2, '0');
    const milliseconds = this.#timestamp.getMilliseconds().toString().padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  /**
   * Get the ANSI color code for the given color.
   * @param {string} color - The color name.
   * @returns {string} The ANSI color code.
   * @private
   */
  #getColorCode(color) {
    const colors = {
      grey: '\x1b[90m',
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
    };
    return colors[color] || '\x1b[37m'; // Default to white if color not found
  }

  /**
   * Get the ANSI reset color code.
   * @returns {string} The ANSI reset color code.
   * @private
   */
  #getResetColor() {
    return '\x1b[0m';
  }
}

/**
 * **belog** is a drop-in replacement for `console.log` debugging
 * @param {...*} args - The arguments of `console.log`
 * @returns {Belog} Belog
 * @example
 * // Basic usage
 * belog('hello world!');
 *
 * // Conditional logging
 * belog('hello world!').when(true);
 *
 * // Logging to a file
 * belog('hello world!').toFile('log.txt');
 *
 * // Logging with color
 * belog('hello world!').inColor('red');
 *
 * // Logging with custom prefix
 * belog('hello world!').withPrefix('react');
 *
 * // You can chain the methods
 * belog('hello world!').when(true).toFile('log.txt');
 */
const belog = (...args) => {
  return new Belog(...args);
};

export default belog;
