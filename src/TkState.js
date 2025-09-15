/*
 * @classdesc A class for managing application state using localStorage, with support for hierarchical event listeners.
 * Properties are identified by dot-notated strings (e.g., "settings.buttons.borderColor")
 */
class TkState {
  /**
   * Initializes the TickoSta\te instance
   */
  constructor() {
    this.listeners = new Map();
  }

  /**
   * Retrieves a property value from localStorage
   * @param {string} key - The dot-notated property key
   * @returns {any} The value stored in the key, or null if not set
   */
  get(key) {
    return localStorage.getItem(key);
  }

  /**
   * Sets a property value in localStorage and triggers events if the value as changed
   * if value is undefined, removes the property
   * @param {string} key - The dot-notated property key
   * @param {any} value - THe value to set (must be JSON serializable), or undefined to remove
   */
  set(key, value) {
    // get old value for key
    const oldValue = localStorage.getItem(key);

    if (value === undefined) {
      if (value === null) {
        return; // key was not in localStorage in the first place
      }

      // remove item from localStorage
      localStorage.removeItem(key);

      // notify listeners
      this.#trigger(key, undefined, oldValue);
      return;
    }

    // check if new value is the same as old value
    if (oldValue === value) {
      return;
    }

    // set new value
    localStorage.setItem(key, value);
    this.#trigger(key, value, oldValue);
  }

  /**
   * Add an event listener for changes to a specific property or prefix
   * @param {string} key - The exact property key or prefix
   * @param {function} listener - The callback function, receives an event object: {key, value, oldValue}
   */
  on(key, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }

    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }

    this.listeners.get(key).add(listener);
  }

  /**
   * Removes an event listener from a specific property or prefix
   * @param {string} key - The exact property key or prefix
   * @param {function} listener - The callback function to remove
   */
  removeEventListener(key, listener) {
    const listenerSet = this.listeners.get(key);
    if (listenerSet) {
      listenerSet.delete(listener);
      if (listenerSet.size === 0) {
        this.listeners.delete(key);
      }
    }
  }

  /**
   * Triggers events for the given key and all its child properties
   * @param {string} key - The property key that changed
   * @param {any} value - The new value
   * @param {any} oldValue - The old value
   */
  #trigger(key, value, oldValue) {
    // define the event object
    const event = {
      key,
      value,
      oldValue,
    };

    // gets the different parts from the dot-nodated key
    const parts = key.split(".");

    // "settings.buttons" and settings.buttons.color
    const prefixes = [];
    for (let i = 0; i < parts.length; i++) {
      prefixes.push(parts.slice(0, i + 1).join("."));
    }

    for (const prefix of prefixes) {
      //get the listeners for this prefix
      const listenerSet = this.listeners.get(prefix);
      if (listenerSet) {
        const listeners = [...listenerSet];
        for (const listener of listeners) {
          try {
            listener(event);
          } catch (e) {
            console.error(
              `Error in listener for prefix "${prefix}": ${e.stack}`
            );
          }
        }
      }
    }
  }
}

const tkState = new TkState();
export default tkState;
