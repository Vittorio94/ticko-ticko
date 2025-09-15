/**
 * General utilities
 * @module utils
 */

import { Sprite } from "pixi.js";
import TkButton from "./components/ui/TkButton.js";
import TkInput from "./components/ui/TkInput.js";
import { TK_TILE_SIZE } from "./GLOBALS.js";
import tkSheets from "./TkSheets.js";
import TkFocusIndicator from "./components/ui/TkFocusIndicator.js";

/**
 * the pixijs element that is currently in focus
 * @type any
 */
export let currentFocusElement;

/**
 * Converts a value from pixel coordinates to grid coordinates
 * @param {number} pixelValue - The value to convert
 * @returns {number} - The converted value in grid coordinates
 */
export function pixelToGrid(pixelValue) {
  return pixelValue / TK_TILE_SIZE;
}

/**
 * Converts a value from grid coordinates to pixel coordinates
 * @param {number} gridValue - The value to convert
 * @returns {number} - The converted value in pixel coordinates
 */
export function gridToPixel(gridValue) {
  return Math.round(gridValue * TK_TILE_SIZE);
}

/**
 * Focuses the given pixijs element by setting its isFocused property to true.
 * If a previously focused element exists, sets its isFocused property to false.
 * Moves the focus indicators around the element.
 * @param {TkButton|TkInput|undefined} element - the element to focus.
 */
export function focusElement(element) {
  if (currentFocusElement) {
    // unfocus previous focus element
    currentFocusElement.isFocused = false;
    // remove keydown listener from previous element
    window.removeEventListener("keydown", currentFocusElement.onKeyDown);
  }

  if (!element) {
    currentFocusElement = undefined;
    return;
  }

  // focus new element
  currentFocusElement = element;
  currentFocusElement.isFocused = true;

  // attach onkeydown event listener
  window.addEventListener("keydown", currentFocusElement.onKeyDown);

  globalThis.tkFocusIndicator.tkGridX = element.tkGridX;
  globalThis.tkFocusIndicator.tkGridY = element.tkGridY;
  globalThis.tkFocusIndicator.tkGridWidth = element.tkGridWidth;
  globalThis.tkFocusIndicator.tkGridHeight = element.tkGridHeight;
  globalThis.tkFocusIndicator.visible = true;
}
