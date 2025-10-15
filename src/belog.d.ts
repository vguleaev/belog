/**
 * Color options for console logging
 */
export type Color = 'grey' | 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white';

/**
 * Class representing a super logger with fluent API.
 */
export class Belog {
  /**
   * Set a condition for logging.
   * @param condition - The condition to check.
   * @returns The Belog instance.
   * @example
   * belog('hello').when(true);
   */
  when(condition: boolean): Belog;

  /**
   * Set a prefix for the log message.
   * @param prefix - The prefix to set.
   * @returns The Belog instance.
   * @example
   * belog('hello').withPrefix('react');
   */
  withPrefix(prefix: string): Belog;

  /**
   * Log the message to a file. If the file does not exist, it will be created.
   * If the file exists, the message will be appended to it.
   *
   * In the browser, this method will log an error.
   * @param filename - The name of the file. Default is "belog.log".
   * @param overwrite - If true, the file will be overwritten. Default is false.
   * @returns The Belog instance.
   * @example
   * belog('hello').toFile('log.txt');
   */
  toFile(filename?: string, overwrite?: boolean): Belog;

  /**
   * Set the color for the console log.
   * @param color - The color to set.
   * @returns The Belog instance.
   * @example
   * belog('hello').inColor('green');
   */
  inColor(color: Color): Belog;

  /**
   * Log the message to the console.
   *
   * _Called automatically, no need to call it explicitly._
   * @returns The Belog instance.
   */
  log(): Belog;
}

/**
 * **belog** is a drop-in replacement for `console.log` debugging
 * @param args - The arguments of `console.log`
 * @returns Belog instance
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
declare function belog(...args: any[]): Belog;

export default belog;
