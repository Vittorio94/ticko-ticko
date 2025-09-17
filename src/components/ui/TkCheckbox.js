import {
  Container,
  FederatedPointerEvent,
  Sprite,
} from "pixi.js";
import tkSheets from "../../TkSheets.js";
import tkSounds from "../../TkSounds.js";
import { focusElement, gridToPixel } from "../../utils.js";

/**
 * @global
 * @typedef TkCheckboxOptions
 * @property {number} [tkGridX] - The x position of the element in the grid
 * @property {number} [tkGridY] - The y position of the element in the grid
 * @property {number} [tkStatus] - The status of the checkbox. 0 for unchecked, 1 for checked, -1 for undetermined
 *
 */

/**
 * A checkbox element
 */
class TkCheckbox extends Container {
  /**
   * @param {TkCheckboxOptions} options
   */
  constructor(options) {
    // initialize default values
    const tkGridX = options.tkGridX ?? 0;
    const tkGridY = options.tkGridY ?? 0;
    const tkStatus = options.tkStatus ?? 0;

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
    this._tkGridY = tkGridY;

    /** @private */
    this._tkGridWidth = 1;

    /** @private */
    this._tkGridHeight = 1;

    /** @private */
    this._tkStatus = tkStatus;

    /** @private */
    this._tkIsFocused = false;

    this._tkCreateElements();

    this._tkAttachEvents();
    this._tkUpdateVisuals();
  }

  /**
   * Attaches events to the container
   * @private
   * @returns {void}
   */
  _tkAttachEvents() {
    this.eventMode = "static";
    this.on("pointerdown", this._onPointerDown, this);
  }

  /**
   * Creates the elements inside the container
   * @private
   * @returns {void}
   */
  _tkCreateElements() {
    /**
     * normal unchecked state
     * @private
     * @type {Sprite}
     */
    this.tkNormalUncheckedSprite = new Sprite(
      tkSheets.guiSheet.textures[`checkbox-normal-unchecked.png`]
    );

    /**
     * normal checked state
     * @private
     * @type {Sprite}
     */
    this.tkNormalCheckedSprite = new Sprite(
      tkSheets.guiSheet.textures[`checkbox-normal-checked.png`]
    );

    /**
     * normal undetermined state
     * @private
     * @type {Sprite}
     */
    this.tkNormalUndeterminedSprite = new Sprite(
      tkSheets.guiSheet.textures[`checkbox-normal-undetermined.png`]
    );

    /**
     * disabled unchecked state
     * @private
     * @type {Sprite}
     */
    this.tkDisabledUncheckedSprite = new Sprite(
      tkSheets.guiSheet.textures[`checkbox-disabled-unchecked.png`]
    );

    /**
     * disabled checked state
     * @private
     * @type {Sprite}
     */
    this.tkDisabledCheckedSprite = new Sprite(
      tkSheets.guiSheet.textures[`checkbox-disabled-checked.png`]
    );

    /**
     * disabled undetermined state
     * @private
     * @type {Sprite}
     */
    this.tkDisabledUndeterminedSprite = new Sprite(
      tkSheets.guiSheet.textures[`checkbox-disabled-undetermined.png`]
    );

    // adding elements to the main container
    this.addChild(
      this.tkNormalUncheckedSprite,
      this.tkNormalCheckedSprite,
      this.tkNormalUndeterminedSprite,
      this.tkDisabledUncheckedSprite,
      this.tkDisabledCheckedSprite,
      this.tkDisabledUndeterminedSprite
    );
  }

  /**
   * Runs every time a property of the element changes, updates the element appearence.
   * @private
   */
  _tkUpdateVisuals() {
    // make sure elements are defined
    if (
      !this.tkNormalUncheckedSprite ||
      !this.tkNormalCheckedSprite ||
      !this.tkNormalUndeterminedSprite ||
      !this.tkDisabledUncheckedSprite ||
      !this.tkDisabledCheckedSprite ||
      !this.tkDisabledUndeterminedSprite
    ) {
      return;
    }

    // put all sprites visibility to 0
    this.tkNormalUncheckedSprite.visible = false;
    this.tkNormalCheckedSprite.visible = false;
    this.tkNormalUndeterminedSprite.visible = false;
    this.tkDisabledUncheckedSprite.visible = false;
    this.tkDisabledCheckedSprite.visible = false;
    this.tkDisabledUndeterminedSprite.visible = false;

    // Update sprite visibilities
    if (!this._tkIsDisabled && this._tkStatus === 0) {
      this.tkNormalUncheckedSprite.visible = true;
      return;
    }

    if (!this._tkIsDisabled && this._tkStatus === 1) {
      this.tkNormalCheckedSprite.visible = true;
      return;
    }

    if (!this._tkIsDisabled && this._tkStatus === -1) {
      this.tkNormalUndeterminedSprite.visible = true;
      return;
    }

    if (this._tkIsDisabled && this._tkStatus === 0) {
      this.tkDisabledUncheckedSprite.visible = true;
      return;
    }

    if (this._tkIsDisabled && this._tkStatus === 1) {
      this.tkDisabledCheckedSprite.visible = true;
      return;
    }

    if (this._tkIsDisabled && this._tkStatus === -1) {
      this.tkDisabledUndeterminedSprite.visible = true;
      return;
    }
  }

  /**
   * Handler for the pointerdown event
   * @private
   * @param {FederatedPointerEvent} e - the pixijs event
   */
  _onPointerDown(e) {
    if (!this._tkIsDisabled) {
      if (this._tkStatus === 0 || this._tkStatus === -1) {
        // check checkbox
        this.tkStatus = 1;
      } else {
        // uncheck checkbox
        this.tkStatus = 0;
      }

      this._tkIsFocused = true;
      focusElement(this);
      tkSounds.buttonClick.play();
      this._tkUpdateVisuals();
    }
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
   * The width of the input in grid units
   * @type {number}
   */
  get tkGridWidth() {
    return this._tkGridWidth;
  }

  /**
   * The height of the input in grid units
   * @type {number}
   */
  get tkGridHeight() {
    return this._tkGridHeight;
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
   * True if the element is in disabled state
   * @type {boolean}
   */
  get isDisabled() {
    return this._tkIsDisabled;
  }

  set isDisabled(value) {
    if (value !== this._tkIsDisabled) {
      this._tkIsDisabled = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * 0 if the checkbox is unchecked, 1 if it is checked, -1 if it is undetermined
   * @type {number}
   */
  get tkStatus() {
    return this._tkIsDisabled;
  }

  set tkStatus(value) {
    if (![-1, 0, 1].includes(value)) {
      throw new Error("value must be -1, 0 or 1");
    }

    if (value !== this._tkStatus) {
      this._tkStatus = value;
      this._tkUpdateVisuals();
      this._triggerInputEvent();
    }
  }

  /**
   * True if the element is in focused state
   * @type {boolean}
   */
  get isFocused() {
    return this._tkIsFocused;
  }

  set isFocused(value) {
    if (value !== this._tkIsFocused) {
      this._tkIsFocused = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * Fires the "input" event
   * @private
   */
  _triggerInputEvent() {
    const event = new CustomEvent("input", {
      detail: this,
      bubbles: true,
    });

    this.emit("input", event);
  }

  /**
   * Destroys the element, frees up the resources
   * @returns {void}
   *
   */
  destroy() {
    this.off("pointerdown", this._onPointerDown, this);

    super.destroy();
  }
}

export default TkCheckbox;
