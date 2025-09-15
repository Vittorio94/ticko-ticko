/**
 * Entry point for the whole app
 * @module
 */

import initState from "./initState.js";
import initUI from "./initUI.js";

// initialize state
await initState();
await initUI();
