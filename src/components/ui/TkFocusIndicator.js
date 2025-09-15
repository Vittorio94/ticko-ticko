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
 * @typedef TkFocusIndicatorOptions
 * @property {number} [tkGridX] - The x position in the grid
 * @property {number} [tkGridY] - The y position in the grid
 * @property {number} [tkGridWidth] - The width of the grid units (e.g. 2 creates a 2 tiles wide element)
 * @property {number} [tkGridHeight] - The height of the grid units (e.g. 2 creates a 2 tiles tall element)
 *
 */

/**
 * A text button
 */
class TkFocusIndicator extends Container {
  /**
   * @param {TkFocusIndicatorOptions} options
   */
  constructor(options) {
    // initialize default values
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
    /**
     * top left indicator sprite
     * @private
     * @type {Sprite}
     */
    this.tkTopLeftSprite = new Sprite(
      tkSheets.guiSheet.textures[`focused-top-left.png`]
    );
    this.tkTopLeftSprite.x = 0;
    this.tkTopLeftSprite.y = 0;

    /**
     * top right indicator sprite
     * @private
     * @type {Sprite}
     */
    this.tkTopRightSprite = new Sprite(
      tkSheets.guiSheet.textures[`focused-top-right.png`]
    );
    this.tkTopRightSprite.x = gridToPixel(this._tkGridWidth);
    this.tkTopRightSprite.y = 0;

    /**
     * bottom left indicator sprite
     * @private
     * @type {Sprite}
     */
    this.tkBottomLeftSprite = new Sprite(
      tkSheets.guiSheet.textures[`focused-bottom-left.png`]
    );
    this.tkBottomLeftSprite.x = 0;
    this.tkBottomLeftSprite.y = gridToPixel(this._tkGridHeight);

    // disabled input states

    /**
     * bottom right indicator sprite
     * @private
     * @type {Sprite}
     */
    this.tkBottomRightSprite = new Sprite(
      tkSheets.guiSheet.textures[`focused-bottom-right.png`]
    );
    this.tkBottomRightSprite.x = gridToPixel(this._tkGridWidth);
    this.tkBottomRightSprite.y = gridToPixel(this._tkGridHeight);

    // adding elements to the main container
    this.addChild(
      this.tkTopLeftSprite,
      this.tkTopRightSprite,
      this.tkBottomLeftSprite,
      this.tkBottomRightSprite
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

export default TkFocusIndicator;
