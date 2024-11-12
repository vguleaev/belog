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
   */
  when(condition) {
    this.#condition = condition;
    return this;
  }

  /**
   * Log the message to a file. If the file does not exist, it will be created.
   * @param {string} filename - The name of the file.
   * @returns {Belog} The Belog instance.
   */
  toFile(filename) {
    if(!this.#condition) {
      return this;
    }
    if (this.#isClient) {
      throw new Error('Logging to file is not supported in the browser');
    }

    this.#logToFileAsync(filename);
    return this;
  }

  async #logToFileAsync(filename) {
    const fs = require('fs').promises;
    const stringifiedArgs = this.#args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : arg
    );
    await fs.appendFile(filename, `${stringifiedArgs.join(' ')}\n`);
  }

  /**
   * Set the color for the console log.
   * @param {"grey"|"black"|"red"|"green"|"yellow"|"blue"|"magenta"|"cyan"|"white"} color - The color to set.
   * @returns {Belog} The Belog instance.
   */
  inColor(color) {
    this.#color = color;
    return this;
  }

  /**
   * Log the message to the console.
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
 * belog('Parent rendered');
 * 
 * // Conditional logging
 * belog('Parent rendered').when(true);
 * 
 * // Logging to a file
 * belog('Parent rendered').toFile('log.txt');
 * 
 * // Logging with color
 * belog('Parent rendered').when(true).inColor('red');
 * 
 * // Logging to file conditionally
 * belog('Parent rendered').when(false).toFile('log.txt');
 */
const belog = (...args) => {
  return new Belog(...args);
};

export default belog;