import { Assets } from "pixi.js";

/**
 * Loads sprite sheets for the whole app
 */
class TkSheets {
  /**
   * Constructor of the class (does nothing)
   */
  constructor() {}

  /**
   * Loads the sheets
   */
  load = async () => {
    this.guiSheet = await Assets.load("./assets/sheets/ticko-gui.json");
    this.guiSheet.textureSource.scaleMode = "nearest";
  };
}

const tkSheets = new TkSheets();
export default tkSheets;
