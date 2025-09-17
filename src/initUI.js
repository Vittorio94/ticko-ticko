/**
 * Handles the initializiation of the app UI
 * @module
 */

import { Application, BitmapText, Sprite, TilingSprite } from "pixi.js";
import tkFonts from "./TkFonts";
import tkSheets from "./TkSheets";
import tkSounds from "./TkSounds";
import TkButton from "./components/ui/TkButton";
import TkFocusIndicator from "./components/ui/TkFocusIndicator";
import { focusElement, rgbToHex } from "./utils";
import TkInput from "./components/ui/TkInput";
import TkCheckbox from "./components/ui/TkCheckbox";
import {TK_COLOR_NAMES} from "./GLOBALS";

/**
 * Initializes the application UI, loading assets fonts and sounds
 * and creating the UI elements based on state
 */
export default async function initUI() {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#282828", resizeTo: window });

  // Append the application canvas to the document body
  const appContainer = document.getElementById("pixi-container");
  if (appContainer) {
    appContainer.appendChild(app.canvas);
  } else {
    throw new Error("App container not found");
  }

  // load fonts
  await tkFonts.load();

  // load sprite sheets
  await tkSheets.load();

  // load sounds
  await tkSounds.load();

  // get colors and save them in the window
  globalThis.tkColors=extractAtlasColors()


  //create grid dots
  const gridSprite = new TilingSprite(
    tkSheets.guiSheet.textures["grid-dots.png"]
  );
  gridSprite.width = app.screen.width;
  gridSprite.height = app.screen.height;

  // create focus indicator

  /**
   * global focus indicator element
   * @type {TkFocusIndicator}
   */
  globalThis.tkFocusIndicator = new TkFocusIndicator({});
  globalThis.tkFocusIndicator.visible = false;

  const button = new TkButton({
    tkTextContent: "button",
    tkGridX: 2,
    tkGridY: 2,
    tkGridWidth: 4,
  });

  const input = new TkInput({
    tkValue: "hello world",
    tkGridX: 2,
    tkGridY: 4,
    tkGridWidth: 2,
  });
  input.tkGridWidth = 4;
  const f = (e) => {
    console.log(e);
    console.log(e.detail);
  };
  input.on("blur", f);

  const checkbox = new TkCheckbox({
    tkGridX: 2,
    tkGridY: 6,
  });
  checkbox.on("input", f);

  app.stage.addChild(button, input, checkbox);

  //focusElement(input);

  app.stage.addChild(gridSprite);
  app.stage.addChild(globalThis.tkFocusIndicator);

  // test sprite
  const sprite = new Sprite(tkSheets.guiSheet.textures["red-1.png"]);
  sprite.x = 300;
  sprite.y = 300;
  app.stage.addChild(sprite);

  const text1 = new BitmapText({
    text: "12.5",
    style: {
      fontFamily: `Pixeleris8`,
      fontSize: 8,
    },
  });
  text1.x = 256;
  text1.y = 256;
  text1.tint = "orange";
  const text2 = new BitmapText({
    text: "0000000000",
    style: {
      fontFamily: `PixelOperatorMono-Bold-16`,
      fontSize: 16,
    },
  });
  text2.x = 256;
  text2.y = 256;
  text2.tint = "blue";
  app.stage.addChild(text1, text2);
}

/**
 * Extracts the colors from the color swatches in the gui sheet
 *
 * @return {Map} - the key-value pairs for the color name and the hex value
 */
function extractAtlasColors() {
  //make sure tkSheets is defined
  if(!tkSheets) {
    throw new Error("tkSeets is not defined")
  }

  // extract source image for guiSheet
  const source = tkSheets.guiSheet.textureSource;
  const img = source.resource;

  // create a temporary canvas (will be used to read pixel color)
  let canvas = document.createElement("canvas")
  let width = source.width;
  let height = source.height;
  canvas.width = width;
  canvas.height = height;

  // get canvas context
  let ctx = canvas.getContext("2d");
  if(!ctx) {
    throw new Error("could not get canvas context")
  }

  // draw the gui sheet on the temprary canvas
  ctx.drawImage(img, 0, 0);

  // loop all color names
  let colors = new Map();
  for (const colorName of TK_COLOR_NAMES) {
    // get texture from pixijs sheet
    const textureName=`${colorName}.png`
    const texture = tkSheets.guiSheet.textures[textureName];

    // get x and y position of the tile
    const x = texture.frame.x;
    const y = texture.frame.y;

    // extract rgb values
    const imageData = ctx.getImageData(x, y, 1, 1);
    const r=imageData.data[0]
    const g=imageData.data[1]
    const b=imageData.data[2]

    if(r>=0 && g>=0 && b>=0) {
      // write hex value to the colors object
      colors.set(colorName, rgbToHex(r, g, b))
    }
  }

  return colors

}
