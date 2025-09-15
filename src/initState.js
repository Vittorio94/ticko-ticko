/**
 * Handles the initializiation of the state
 * @module
 */

import { TK_VERSION } from "./GLOBALS.js";
import tkState from "./TkState.js";

/**
 * Initializes the application state
 */
export default async function initState() {
  // get local version of state
  const version = tkState.get("version");

  // if no local version is found, this is
  // the first time the user is opening the app.
  // Run first migration
  if (!version) {
    try {
      migrations[1]();
    } catch (e) {
      throw new Error(`Failed to migrate state: ${e.message}`);
    }
  }

  // check if local version of state needs to be migrated
  // to a new version
  if (version < TK_VERSION) {
    for (let i = version + 1; i <= TK_VERSION; i++) {
      // run migration function
      try {
        migrations[i]();
      } catch (e) {
        throw new Error(`Failed to migrate state: ${e.message}`);
      }
    }
  }
}

const migrations = {
  1: () => {
    // migrate to version 1
    tkState.set("version", 1);
  },
};
