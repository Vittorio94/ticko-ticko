import { Assets } from "pixi.js";

/**
 * Loads font sprite sheets for the whole app
 */
class TkFonts {
  /**
   * Constructor of the class (does nothing)
   */
  constructor() {
    /**
     * Array of available font names
     * @type Array<string>
     */
    this.fontNames = [
      "PixelOperator-16",
      "PixelOperator-Bold-16",
      "PixelOperatorSC-16",
      "PixelOperatorSC-Bold-16",
      "PixelOperator-32",
      "PixelOperator-Bold-32",
      "PixelOperatorSC-32",
      "PixelOperatorSC-Bold-32",
      //"PixelOperatorHB8-16",
      //"PixelOperatorMono8-Bold-8",
      //"PixelOperatorHB8-32",
      "PixelOperatorMono-Bold-16",
      //"PixelOperator8-16",
      //"PixelOperatorHB8-8",
      "PixelOperatorMono-Bold-32",
      //"PixelOperator8-32",
      //"PixelOperatorHBSC-16",
      //"PixelOperatorMonoHB-16",
      //"PixelOperator8-8",
      //"PixelOperatorHBSC-32",
      //"PixelOperatorMonoHB-32",
      //"PixelOperator8-Bold-16",
      "PixelOperatorMono-16",
      //"PixelOperatorMonoHB8-16",
      //"PixelOperator8-Bold-32",
      "PixelOperatorMono-32",
      //"PixelOperatorMonoHB8-32",
      //"PixelOperator8-Bold-8",
      //"PixelOperatorMono8-16",
      //"PixelOperatorMonoHB8-8",
      //"PixelOperatorMono8-32",
      //"PixelOperatorMono8-8",
      //"PixelOperatorHB-16",
      //"PixelOperatorMono8-Bold-16",
      //"PixelOperatorHB-32",
      //"PixelOperatorMono8-Bold-32",
    ];
  }

  /**
   * Loads the sheets
   */
  load = async () => {
    // load all fonts
    for (const fontName of this.fontNames) {
      await Assets.load(`./assets/fonts/${fontName}/${fontName}.xml`);
    }
  };
}

const tkFonts = new TkFonts();
export default tkFonts;
