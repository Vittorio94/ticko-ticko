import {
  AnimatedSprite,
  BitmapText,
  Container,
  FederatedPointerEvent,
  Sprite,
  TilingSprite,
} from "pixi.js";
import tkSheets from "../../TkSheets.js";
import tkSounds from "../../TkSounds.js";
import { focusElement, gridToPixel } from "../../utils.js";
import { TK_FONT_SIZE, TK_TILE_SIZE } from "../../GLOBALS.js";

/**
 * @global
 * @typedef TkButtonOptions
 * @property {string} [tkTextContent] - The text to put inside the button
 * @property {string} [tkButtonColor] - The color of the button
 * @property {number} [tkGridX] - The x position of the button in the grid
 * @property {number} [tkGridY] - The y position of the button in the grid
 * @property {number} [tkGridWidth] - The width of the button in grid units (e.g. 2 creates a 2 tiles wide button)
 *
 */

/**
 * A text button
 */
class TkButton extends Container {
  /**
   * @param {TkButtonOptions} options
   */
  constructor(options) {
    // initialize default values
    const tkTextContent = options.tkTextContent ?? "-";
    const tkButtonColor = options.tkButtonColor ?? "neutral";
    const tkGridX = options.tkGridX ?? 0;
    const tkGridY = options.tkGridY ?? 0;
    const tkGridWidth = options.tkGridWidth ?? 2;

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
    this._tkButtonColor = tkButtonColor;

    /** @private */
    this._tkGridX = tkGridX;

    /** @private */
    this._tkGridX = tkGridX;

    /** @private */
    this._tkGridY = tkGridY;

    /** @private */
    this._tkGridWidth = tkGridWidth;

    /** @private */
    this._tkGridHeight = 1;

    /** @private */
    this._tkIsHovering = false;

    /** @private */
    this._tkIsPressed = false;

    /** @private */
    this._tkIsLoading = false;

    /** @private */
    this._tkIsDisabled = false;

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
    this.on("pointerover", this._onPointerOver, this);
    this.on("pointerout", this._onPointerOut, this);
    this.on("pointerdown", this._onPointerDown, this);
    this.on("pointerup", this._onPointerUp, this);
  }

  /**
   * Creates the elements inside the container
   * @private
   * @returns {void}
   */
  _tkCreateElements() {
    /**
     * pill button sprite, normal state
     * @private
     * @type {Sprite}
     */
    this.tkNormalPillSprite = new Sprite(
      tkSheets.guiSheet.textures[
        `button-normal-pill-${this._tkButtonColor}.png`
      ]
    );

    /**
     * left tile button sprite, normal state
     * @private
     * @type {Sprite}
     */
    this.tkNormalLeftSprite = new Sprite(
      tkSheets.guiSheet.textures[
        `button-normal-left-${this._tkButtonColor}.png`
      ]
    );

    /**
     * center tile button sprite, normal state
     * @private
     * @type {TilingSprite}
     */
    this.tkNormalCenterSprite = new TilingSprite(
      tkSheets.guiSheet.textures[
        `button-normal-center-${this._tkButtonColor}.png`
      ]
    );

    /**
     * right tile button sprite, normal state
     * @private
     * @type {Sprite}
     */
    this.tkNormalRightSprite = new Sprite(
      tkSheets.guiSheet.textures[
        `button-normal-right-${this._tkButtonColor}.png`
      ]
    );

    // pressed state tiles

    /**
     * pill button sprite, pressed state
     * @private
     * @type {Sprite}
     */
    this.tkPressedPillSprite = new Sprite(
      tkSheets.guiSheet.textures[
        `button-pressed-pill-${this._tkButtonColor}.png`
      ]
    );

    /**
     * left tile button sprite, pressed state
     * @private
     * @type {Sprite}
     */
    this.tkPressedLeftSprite = new Sprite(
      tkSheets.guiSheet.textures[
        `button-pressed-left-${this._tkButtonColor}.png`
      ]
    );

    /**
     * center tile button sprite, pressed state
     * @private
     * @type {TilingSprite}
     */
    this.tkPressedCenterSprite = new TilingSprite(
      tkSheets.guiSheet.textures[
        `button-pressed-center-${this._tkButtonColor}.png`
      ]
    );

    /**
     * right tile button sprite, pressed state
     * @private
     * @type {Sprite}
     */
    this.tkPressedRightSprite = new Sprite(
      tkSheets.guiSheet.textures[
        `button-pressed-right-${this._tkButtonColor}.png`
      ]
    );

    // hover state tiles

    /**
     * pill button sprite, hover state
     * @private
     * @type {Sprite}
     */
    this.tkHoverPillSprite = new Sprite(
      tkSheets.guiSheet.textures[`button-hover-pill-${this._tkButtonColor}.png`]
    );

    /**
     * left tile button sprite, hover state
     * @private
     * @type {Sprite}
     */
    this.tkHoverLeftSprite = new Sprite(
      tkSheets.guiSheet.textures[`button-hover-left-${this._tkButtonColor}.png`]
    );

    /**
     * center tile button sprite, hover state
     * @private
     * @type {TilingSprite}
     */
    this.tkHoverCenterSprite = new TilingSprite(
      tkSheets.guiSheet.textures[
        `button-hover-center-${this._tkButtonColor}.png`
      ]
    );

    /**
     * right tile button sprite, hover state
     * @private
     * @type {Sprite}
     */
    this.tkHoverRightSprite = new Sprite(
      tkSheets.guiSheet.textures[
        `button-hover-right-${this._tkButtonColor}.png`
      ]
    );

    // disabled button states
    /**
     * pill button sprite, disabled state
     * @private
     * @type {Sprite}
     */
    this.tkDisabledPillSprite = new Sprite(
      tkSheets.guiSheet.textures[`button-disabled-pill.png`]
    );

    /**
     * left tile button sprite, disabled state
     * @private
     * @type {Sprite}
     */
    this.tkDisabledLeftSprite = new Sprite(
      tkSheets.guiSheet.textures[`button-disabled-left.png`]
    );

    /**
     * center tile button sprite, disabled state
     * @private
     * @type {TilingSprite}
     */
    this.tkDisabledCenterSprite = new TilingSprite(
      tkSheets.guiSheet.textures[`button-disabled-center.png`]
    );

    /**
     * right tile button sprite, disabled state
     * @private
     * @type {Sprite}
     */
    this.tkDisabledRightSprite = new Sprite(
      tkSheets.guiSheet.textures[`button-disabled-right.png`]
    );

    /**
     * Animated loading spinner
     * @private
     * @type {AnimatedSprite}
     */
    this.tkSpinner = new AnimatedSprite(
      tkSheets.guiSheet.animations["loading-spinner-small"]
    );
    this.tkSpinner.animationSpeed = 0.2;
    this.tkSpinner.visible = false;

    // create container for the three different states

    /**
     * Container for the normal button state (contains the normal state sprites)
     * @private
     * @type {Container}
     */
    this.tkNormalButton = new Container();

    /**
     * Container for the pressed button state (contains the pressed state sprites)
     * @private
     * @type {Container}
     */
    this.tkPressedButton = new Container();

    /**
     * Container for the hover button state (contains the hover state sprites)
     * @private
     * @type {Container}
     */
    this.tkHoverButton = new Container();

    /**
     * Container for the disabled button state (contains the hover state sprites)
     * @private
     * @type {Container}
     */
    this.tkDisabledButton = new Container();

    // add sprites to the different state containers
    if (this._tkGridWidth === 1) {
      this.tkNormalButton.addChild(this.tkNormalPillSprite);
      this.tkPressedButton.addChild(this.tkPressedPillSprite);
      this.tkHoverButton.addChild(this.tkHoverPillSprite);
      this.tkDisabledButton.addChild(this.tkDisabledPillSprite);
    } else if (this._tkGridWidth === 2) {
      this.tkNormalRightSprite.x = gridToPixel(this._tkGridWidth - 1);
      this.tkPressedRightSprite.x = gridToPixel(this._tkGridWidth - 1);
      this.tkHoverRightSprite.x = gridToPixel(this._tkGridWidth - 1);
      this.tkDisabledRightSprite.x = gridToPixel(this._tkGridWidth - 1);
      this.tkNormalButton.addChild(
        this.tkNormalLeftSprite,
        this.tkNormalRightSprite
      );
      this.tkPressedButton.addChild(
        this.tkPressedLeftSprite,
        this.tkPressedRightSprite
      );
      this.tkHoverButton.addChild(
        this.tkHoverLeftSprite,
        this.tkHoverRightSprite
      );
      this.tkDisabledButton.addChild(
        this.tkDisabledLeftSprite,
        this.tkDisabledRightSprite
      );
    } else {
      this.tkNormalRightSprite.x = gridToPixel(this._tkGridWidth - 1);
      this.tkPressedRightSprite.x = gridToPixel(this._tkGridWidth - 1);
      this.tkHoverRightSprite.x = gridToPixel(this._tkGridWidth - 1);
      this.tkDisabledRightSprite.x = gridToPixel(this._tkGridWidth - 1);

      this.tkNormalCenterSprite.x = gridToPixel(1);
      this.tkNormalCenterSprite.width = gridToPixel(this._tkGridWidth - 2);
      this.tkPressedCenterSprite.x = gridToPixel(1);
      this.tkPressedCenterSprite.width = gridToPixel(this._tkGridWidth - 2);
      this.tkHoverCenterSprite.x = gridToPixel(1);
      this.tkHoverCenterSprite.width = gridToPixel(this._tkGridWidth - 2);
      this.tkDisabledCenterSprite.x = gridToPixel(1);
      this.tkDisabledCenterSprite.width = gridToPixel(this._tkGridWidth - 2);

      this.tkNormalButton.addChild(
        this.tkNormalLeftSprite,
        this.tkNormalCenterSprite,
        this.tkNormalRightSprite
      );
      this.tkPressedButton.addChild(
        this.tkPressedLeftSprite,
        this.tkPressedCenterSprite,
        this.tkPressedRightSprite
      );
      this.tkHoverButton.addChild(
        this.tkHoverLeftSprite,
        this.tkHoverCenterSprite,
        this.tkHoverRightSprite
      );
      this.tkDisabledButton.addChild(
        this.tkDisabledLeftSprite,
        this.tkDisabledCenterSprite,
        this.tkDisabledRightSprite
      );
    }

    // creating the text element

    /**
     * Text element of the button
     * @private
     * @type {BitmapText}
     */
    this.tkText = new BitmapText({
      text: this.tkTextContent,
      style: {
        fontFamily: `PixelOperatorMono-Bold-${TK_FONT_SIZE}`,
        fontSize: TK_FONT_SIZE,
      },
    });
    this.tkText.tint = "#ebdbb2";

    // adding elements to the main container
    this.addChild(
      this.tkNormalButton,
      this.tkPressedButton,
      this.tkHoverButton,
      this.tkDisabledButton,
      this.tkText,
      this.tkSpinner
    );
  }

  /**
   * Updates the texture of the sprites to reflect a change in color
   * @private
   * @returns {void}
   */
  _tkUpdateTextures() {
    // normal state tiles
    if (this.tkNormalPillSprite) {
      this.tkNormalPillSprite.texture =
        tkSheets.guiSheet.textures[
          `button-normal-pill-${this._tkButtonColor}.png`
        ];
    }

    if (this.tkNormalLeftSprite) {
      this.tkNormalLeftSprite.texture =
        tkSheets.guiSheet.textures[
          `button-normal-left-${this._tkButtonColor}.png`
        ];
    }

    if (this.tkNormalCenterSprite) {
      this.tkNormalCenterSprite.texture =
        tkSheets.guiSheet.textures[
          `button-normal-center-${this._tkButtonColor}.png`
        ];
    }

    if (this.tkNormalRightSprite) {
      this.tkNormalRightSprite.texture =
        tkSheets.guiSheet.textures[
          `button-normal-right-${this._tkButtonColor}.png`
        ];
    }

    // pressed state tiles
    if (this.tkPressedPillSprite) {
      this.tkPressedPillSprite.texture =
        tkSheets.guiSheet.textures[
          `button-pressed-pill-${this._tkButtonColor}.png`
        ];
    }

    if (this.tkPressedLeftSprite) {
      this.tkPressedLeftSprite.texture =
        tkSheets.guiSheet.textures[
          `button-pressed-left-${this._tkButtonColor}.png`
        ];
    }

    if (this.tkPressedCenterSprite) {
      this.tkPressedCenterSprite.texture =
        tkSheets.guiSheet.textures[
          `button-pressed-center-${this._tkButtonColor}.png`
        ];
    }

    if (this.tkPressedRightSprite) {
      this.tkPressedRightSprite.texture =
        tkSheets.guiSheet.textures[
          `button-pressed-right-${this._tkButtonColor}.png`
        ];
    }

    // hover state tiles
    if (this.tkHoverPillSprite) {
      this.tkHoverPillSprite.texture =
        tkSheets.guiSheet.textures[
          `button-hover-pill-${this._tkButtonColor}.png`
        ];
    }
    if (this.tkHoverLeftSprite) {
      this.tkHoverLeftSprite.texture =
        tkSheets.guiSheet.textures[
          `button-hover-left-${this._tkButtonColor}.png`
        ];
    }

    if (this.tkHoverCenterSprite) {
      this.tkHoverCenterSprite.texture =
        tkSheets.guiSheet.textures[
          `button-hover-center-${this._tkButtonColor}.png`
        ];
    }
    if (this.tkHoverRightSprite) {
      this.tkHoverRightSprite.texture =
        tkSheets.guiSheet.textures[
          `button-hover-right-${this._tkButtonColor}.png`
        ];
    }
  }

  /**
   * Runs every time a property of the button changes, updates the button appearence.
   * @private
   */
  _tkUpdateVisuals() {
    // make sure elements are defined
    if (
      !this.tkText ||
      !this.tkNormalButton ||
      !this.tkPressedButton ||
      !this.tkHoverButton ||
      !this.tkDisabledButton ||
      !this.tkSpinner
    ) {
      return;
    }

    // Update text content
    this.tkText.text = this._tkTextContent;

    // Calculate base position for text
    let textX = Math.round(this.width / 2 - this.tkText.width / 2);
    let textY = TK_TILE_SIZE / 2 - Math.round(this.tkText.height / 2) - 4;

    // Apply pressed offset to text
    if (this._tkIsPressed) {
      textX += 2;
      textY += 2;
    }

    // update x and y coordinate of the text
    this.tkText.x = textX;
    this.tkText.y = textY;

    // find position for loading spinner
    //let spinnerX = Math.round(this.width / 2 - TK_TILE_SIZE / 4);
    let spinnerX = 4;
    let spinnerY = TK_TILE_SIZE / 2 - Math.round(TK_TILE_SIZE / 4);

    // update x and y coordinate of the loading spinner
    this.tkSpinner.x = spinnerX;
    this.tkSpinner.y = spinnerY;

    // Update sprite visibilities and states
    if (this._tkIsPressed) {
      // Pressed state
      this.tkHoverButton.visible = false;
      this.tkNormalButton.visible = false;
      this.tkPressedButton.visible = true;
      this.tkDisabledButton.visible = false;
      this.tkText.tint = "#ebdbb2";
      this.cursor = "pointer";
    } else if (this._tkIsHovering) {
      // Hovering state
      this.tkHoverButton.visible = true;
      this.tkNormalButton.visible = false;
      this.tkPressedButton.visible = false;
      this.tkDisabledButton.visible = false;
      this.tkText.tint = "#ebdbb2";
      this.cursor = "pointer";
    } else if (this._tkIsDisabled) {
      this.tkHoverButton.visible = false;
      this.tkNormalButton.visible = false;
      this.tkPressedButton.visible = false;
      this.tkDisabledButton.visible = true;
      this.tkText.tint = "#665c54";
      this.cursor = "auto";
    } else {
      // Normal state
      this.tkHoverButton.visible = false;
      this.tkNormalButton.visible = true;
      this.tkPressedButton.visible = false;
      this.tkDisabledButton.visible = false;
      this.tkText.tint = "#ebdbb2";
      this.cursor = "pointer";
    }

    if (this._tkIsLoading) {
      this.tkSpinner.visible = true;
      this.tkSpinner.play();
    } else {
      this.tkSpinner.visible = false;
      this.tkSpinner.stop();
    }
  }

  /**
   * Handler for the pointerover event
   * @private
   * @param {FederatedPointerEvent} e - the pixijs event
   */
  _onPointerOver(e) {
    if (!this._tkIsDisabled) {
      this._tkIsHovering = true;
      this._tkUpdateVisuals();
    }
  }

  /**
   * Handler for the pointerout event
   * @private
   * @param {FederatedPointerEvent} e - the pixijs event
   */
  _onPointerOut(e) {
    if (!this._tkIsDisabled) {
      this._tkIsHovering = false;
      this._tkIsPressed = false;
      this._tkUpdateVisuals();
    }
  }

  /**
   * Handler for the pointerdown event
   * @private
   * @param {FederatedPointerEvent} e - the pixijs event
   */
  _onPointerDown(e) {
    if (!this._tkIsDisabled) {
      this._tkIsHovering = false;
      this._tkIsPressed = true;
      this._tkIsFocused = true;
      focusElement(this);
      tkSounds.buttonClick.play();
      this._tkUpdateVisuals();
    }
  }

  /**
   * Handler for the pointerup event
   * @private
   * @param {FederatedPointerEvent} e - the pixijs event
   */
  _onPointerUp(e) {
    if (!this._tkIsDisabled) {
      this._tkIsHovering = true;
      this._tkIsPressed = false;
      this._tkUpdateVisuals();
    }
  }

  /**
   * Handler for the global keydown event
   * @param {Event} e - the DOM event
   */
  onKeyDown = (e) => {
    if (!this._tkIsDisabled && this._tkIsFocused) {
      console.log(this);
    }
  };

  /**
   * The text content of the button
   * @type {string}
   */
  get tkTextContent() {
    return this._tkTextContent;
  }

  set tkTextContent(value) {
    if (this._tkTextContent !== value) {
      this._tkTextContent = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * The color of the button
   * @type {string}
   */
  get tkButtonColor() {
    return this._tkButtonColor;
  }

  set tkButtonColor(value) {
    if (this._tkButtonColor !== value) {
      this._tkButtonColor = value;
      this._tkUpdateTextures();
      this._tkUpdateVisuals();
    }
  }

  /**
   * The X grid position of the button
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
   * The Y grid position of the button
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
   * The width of the button in grid units
   * @type {number}
   */
  get tkGridWidth() {
    return this._tkGridWidth;
  }

  /**
   * The height of the button in grid units
   * @type {number}
   */
  get tkGridHeight() {
    return this._tkGridHeight;
  }

  /**
   * True if the button is in pressed state
   * @type {boolean}
   */
  get isPressed() {
    return this._tkIsPressed;
  }

  set isPressed(value) {
    if (value !== this._tkIsPressed) {
      this._tkIsPressed = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * True if the button is in hovering state
   * @type {boolean}
   */
  get isHovering() {
    return this._tkIsHovering;
  }

  set isHovering(value) {
    if (value !== this._tkIsHovering) {
      this._tkIsHovering = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * True if the button is in laoding state
   * @type {boolean}
   */
  get isLoading() {
    return this._tkIsLoading;
  }

  set isLoading(value) {
    if (value !== this._tkIsLoading) {
      this._tkIsLoading = value;
      this._tkUpdateVisuals();
    }
  }

  /**
   * True if the button is in disabled state
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
   * True if the button is in focused state
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
   * Destroys the button, frees up the resources
   * @returns {void}
   *
   */
  destroy() {
    this.off("pointerover", this._onPointerOver, this);
    this.off("pointerout", this._onPointerOut, this);
    this.off("pointerdown", this._onPointerDown, this);
    this.off("pointerup", this._onPointerUp, this);

    window.removeEventListener("keydown", this.onKeyDown);

    super.destroy();
  }
}

export default TkButton;
