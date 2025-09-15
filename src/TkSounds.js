/**
 * Loads sounds for the whole app
 */
class TkSounds {
  /**
   * Constructor of the class (does nothing)
   */
  constructor() {}

  /**
   * Loads the sheets
   */
  load = async () => {
    this.buttonClick = new Howl({
      src: ["public/assets/sounds/button-click.mp3"],
      volume: 0.1,
    });
  };
}

const tkSounds = new TkSounds();
export default tkSounds;
