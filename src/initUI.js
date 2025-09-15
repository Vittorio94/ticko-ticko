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
import { focusElement } from "./utils";
import TkInput from "./components/ui/TkInput";

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

  const button = new TkButton({ tkGridX: 2, tkGridY: 2 });
  const input = new TkInput({
    tkValue: "hello",
    tkGridX: 2,
    tkGridY: 4,
    tkGridWidth: 4,
  });
  app.stage.addChild(button, input);

  //focusElement(input);

  app.stage.addChild(gridSprite);
  app.stage.addChild(globalThis.tkFocusIndicator);

  // test sprite
  const sprite = new Sprite(tkSheets.guiSheet.textures["red-1.png"]);
  sprite.x = 500;
  sprite.y = 500;

  //app.stage.addChild(sprite);
}
