import {
  BitmapText,
  Container,
  FederatedPointerEvent,
  Sprite,
  TilingSprite,
} from "pixi.js";
import tkSheets from "../../TkSheets.js";
import { gridToPixel } from "../../utils.js";
import { TK_TILE_SIZE } from "../../GLOBALS.js";

/**
 * @global
 * @typedef TkTypographyOptions
 * @property {string} [tkTextContent] - The text to put inside the element
 * @property {string} [tkColor] - The text color
 * @property {string} [tkBackgroundColor] - The background color of the text
 * @property {string} [tkFontSize] - The size of the font (small, regular, big)
 * @property {string} [tkAlign] - The alignment of the text (left, center, right)
 * @property {string} [tkDecoration] - The text decoration (none, underline, strikeThrough)
 * @property {string} [tkHref] - href for external link
 * @property {number} [tkGridX] - The x position in the grid
 * @property {number} [tkGridY] - The y position in the grid
 * @property {number} [tkGridWidth] - The width of the grid units (e.g. 2 creates a 2 tiles wide element)
 * @property {number} [tkGridHeight] - The height of the grid units (e.g. 2 creates a 2 tiles tall element)
 *
 */

/**
 * Wrapper of the pixijs BitmapText element with functionalities for color, sizes, fonts, etc
 */
class TkTypography extends Container {
  /**
   * @param {TkTypographyOptions} options
   */
  constructor(options) {
    // initialize default values
    const tkTextContent = options.tkTextContent ?? "-";
    const tkColor = options.tkTextContent ?? "red"; //TODO
    const tkBackgroundColor = options.tkTextContent ?? "black"; //TODO
    const tkFontSize = options.tkFontSize ?? "normal";
    const tkAlign = options.tkAlign ?? "left";
    const tkDecoration = options.tkDecoration ?? "none";
    const tkHref = options.tkHref ?? "";
    const tkGridX = options.tkGridX ?? 0;
    const tkGridY = options.tkGridY ?? 0;
    const tkGridWidth = options.tkGridWidth ?? 1;
    const tkGridHeight = options.tkGridHeight ?? 1;

    // extract options to assign to the pixijs Container
    const containerOptions = {
      x: gridToPixel(tkGridX),
      y: gridToPixel(tkGridY),
    };

    // call super constructor to initialize container
    super(containerOptions);

    /** @private */
    this._tkTextContent = tkTextContent;

    /** @private */
    this._tkColor = tkColor;

    /** @private */
    this._tkBackgroundColor = tkBackgroundColor;

    /** @private */
    this._tkFontSize = tkFontSize;

    /** @private */
    this._tkAlign = tkAlign;

    /** @private */
    this._tkDecoration = tkDecoration;

    /** @private */
    this._tkHref = tkHref;

    /** @private */
    this._tkGridX = tkGridX;

    /** @private */
    this._tkGridX = tkGridX;

    /** @private */
    this._tkGridY = tkGridY;

    /** @private */
    this._tkGridWidth = tkGridWidth;

    /** @private */
    this._tkGridHeight = tkGridHeight;

    /** @private @type {string} */
    this._id = crypto.randomUUID();

    this._tkCreateElements();

    this._tkUpdateVisuals();
  }

  /**
   * Creates the elements inside the container
   * @private
   * @returns {void}
   */
  _tkCreateElements() {

    // create bitmap text
    this.tkText = new BitmapText({
      text: this.tkTextContent,
      style: {
        fontFamily: `PixelOperatorMono-Bold-${TK_FONT_SIZE}`,
        fontSize: TK_FONT_SIZE,
      },
    });

    // adding elements to the main container
    this.addChild(
      this.tkText
    );
  }

  /**
   * Runs every time a property of the button changes, updates the button appearence.
   * @private
   */
  _tkUpdateVisuals() {
    // make sure elements are defined
    if (
      !this.tkTopLeftSprite ||
      !this.tkTopRightSprite ||
      !this.tkBottomLeftSprite ||
      !this.tkBottomRightSprite
    ) {
      return;
    }

    // update position
    this.x = gridToPixel(this._tkGridX);
    this.y = gridToPixel(this._tkGridY);

    // update top left sprite
    this.tkTopLeftSprite.x = 0;
    this.tkTopLeftSprite.y = 0;

    // update top right sprite
    this.tkTopRightSprite.x = gridToPixel(this._tkGridWidth - 0.5);
    this.tkTopRightSprite.y = 0;

    // update bottom left sprite
    this.tkBottomLeftSprite.x = 0;
    this.tkBottomLeftSprite.y = gridToPixel(this._tkGridHeight - 0.5);

    // update bottom right sprite
    this.tkBottomRightSprite.x = gridToPixel(this._tkGridWidth - 0.5);
    this.tkBottomRightSprite.y = gridToPixel(this._tkGridHeight - 0.5);
  }

  /**
   * The X grid position of the element
   * @type {number}
   */
  get tkGridX() {
    return this._tkGridX;
  }

  set tkGridX(value) {
    if (this._tkGridX !== value) {
      this._tkGridX = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * The Y grid position of the element
   * @type {number}
   */
  get tkGridY() {
    return this._tkGridY;
  }

  set tkGridY(value) {
    if (this._tkGridY !== value) {
      this._tkGridY = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * The width of the element in grid units
   * @type {number}
   */
  get tkGridWidth() {
    return this._tkGridWidth;
  }

  set tkGridWidth(value) {
    if (this._tkGridWidth !== value) {
      this._tkGridWidth = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * The height of the element in grid units
   * @type {number}
   */
  get tkGridHeight() {
    return this._tkGridHeight;
  }

  set tkGridHeight(value) {
    if (this._tkGridHeight !== value) {
      this._tkGridHeight = value;
      this._tkUpdateVisuals();
    }
  }

  get id() {
    return this._id;
  }

  /**
   * Destroys the button, frees up the resources
   * @returns {void}
   *
   */
  destroy() {
    super.destroy();
  }
}

export default TkTypography;
