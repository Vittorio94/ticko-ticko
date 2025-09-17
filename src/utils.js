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
import TkCheckbox from "./components/ui/TkCheckbox.js";

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
 * @param {TkButton|TkInput|TkCheckbox|undefined} element - the element to focus.
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
    globalThis.tkFocusIndicator.visible = false;
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

/**
 * convert a hex color value to rgb
 * @param {string} hex - the hex value
 * @returns {number[]|null} - the rgb values
 */
export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

/**
 * converts r,g,b to a hex color value
 * @param {number} r - The red color value
 * @param {number} g - The green color value
 * @param {number} b - The blue color value
 * @returns {string|null} - the hex string
 */
export function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
