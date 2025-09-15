import fs from "fs";

function createFrame({ x, y, w, h, ax = 0, ay = 0 }) {
  return {
    frame: { x, y, w, h },
    spriteSourceSize: { x: 0, y: 0, w, h },
    sourceSize: { w, h },
    anchor: { x: ax, y: ay },
  };
}

function createGuiSheet() {
  const tileSize = 24;
  const width = 960;
  const height = 960;

  const guiSheet = {
    frames: {},
    animations: {},
    meta: { image: "ticko-gui.png", size: { w: width, h: height } },
  };

  getButtons(guiSheet, "neutral", tileSize, 0, 0);
  getButtons(guiSheet, "green", tileSize, tileSize * 4, 0);
  getButtons(guiSheet, "yellow", tileSize, tileSize * 8, 0);
  getButtons(guiSheet, "red", tileSize, tileSize * 12, 0);

  // DISABLED BUTTONS
  guiSheet.frames[`button-disabled-pill.png`] = createFrame({
    x: tileSize * 0,
    y: tileSize * 3,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`button-disabled-left.png`] = createFrame({
    x: tileSize * 1,
    y: tileSize * 3,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`button-disabled-center.png`] = createFrame({
    x: tileSize * 2,
    y: tileSize * 3,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`button-disabled-right.png`] = createFrame({
    x: tileSize * 3,
    y: tileSize * 3,
    w: tileSize,
    h: tileSize,
  });

  guiSheet.frames["grid-dots.png"] = createFrame({
    x: tileSize * 16,
    y: 0,
    w: tileSize,
    h: tileSize,
  });

  // text inputs
  guiSheet.frames[`input-normal-left.png`] = createFrame({
    x: tileSize * 0,
    y: tileSize * 4,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`input-normal-center.png`] = createFrame({
    x: tileSize * 1,
    y: tileSize * 4,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`input-normal-right.png`] = createFrame({
    x: tileSize * 2,
    y: tileSize * 4,
    w: tileSize,
    h: tileSize,
  });

  guiSheet.frames[`input-disabled-left.png`] = createFrame({
    x: tileSize * 0,
    y: tileSize * 5,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`input-disabled-center.png`] = createFrame({
    x: tileSize * 1,
    y: tileSize * 5,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`input-disabled-right.png`] = createFrame({
    x: tileSize * 2,
    y: tileSize * 5,
    w: tileSize,
    h: tileSize,
  });

  guiSheet.frames[`input-focused-left.png`] = createFrame({
    x: tileSize * 0,
    y: tileSize * 6,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`input-focused-center.png`] = createFrame({
    x: tileSize * 1,
    y: tileSize * 6,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames[`input-focused-right.png`] = createFrame({
    x: tileSize * 2,
    y: tileSize * 6,
    w: tileSize,
    h: tileSize,
  });

  //half tile loading spinner
  guiSheet.frames["loading-spinner-small-1.png"] = createFrame({
    x: tileSize * 16,
    y: tileSize,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["loading-spinner-small-2.png"] = createFrame({
    x: tileSize * 16 + 0.5 * tileSize,
    y: tileSize,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["loading-spinner-small-3.png"] = createFrame({
    x: tileSize * 16 + tileSize,
    y: tileSize,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["loading-spinner-small-4.png"] = createFrame({
    x: tileSize * 16 + 1.5 * tileSize,
    y: tileSize,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["loading-spinner-small-5.png"] = createFrame({
    x: tileSize * 16,
    y: tileSize + 0.5 * tileSize,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["loading-spinner-small-6.png"] = createFrame({
    x: tileSize * 16 + 0.5 * tileSize,
    y: tileSize + 0.5 * tileSize,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["loading-spinner-small-7.png"] = createFrame({
    x: tileSize * 16 + tileSize,
    y: tileSize + 0.5 * tileSize,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["loading-spinner-small-8.png"] = createFrame({
    x: tileSize * 16 + 1.5 * tileSize,
    y: tileSize + 0.5 * tileSize,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.animations["loading-spinner-small"] = [
    "loading-spinner-small-1.png",
    "loading-spinner-small-2.png",
    "loading-spinner-small-3.png",
    "loading-spinner-small-4.png",
    "loading-spinner-small-5.png",
    "loading-spinner-small-6.png",
    "loading-spinner-small-7.png",
    "loading-spinner-small-8.png",
  ];

  // focused indicators
  guiSheet.frames["focused.png"] = createFrame({
    x: tileSize * 17,
    y: 0,
    w: tileSize,
    h: tileSize,
  });
  guiSheet.frames["focused-top-left.png"] = createFrame({
    x: tileSize * 17,
    y: 0,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["focused-top-right.png"] = createFrame({
    x: tileSize * 17 + tileSize / 2,
    y: 0,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["focused-bottom-left.png"] = createFrame({
    x: tileSize * 17,
    y: tileSize / 2,
    w: tileSize / 2,
    h: tileSize / 2,
  });
  guiSheet.frames["focused-bottom-right.png"] = createFrame({
    x: tileSize * 17 + tileSize / 2,
    y: tileSize / 2,
    w: tileSize / 2,
    h: tileSize / 2,
  });

  getColors(guiSheet, tileSize, tileSize * 18, 0);

  fs.writeFileSync(
    "./public/assets/sheets/ticko-gui.json",
    JSON.stringify(guiSheet, null, 2)
  );
}

function getButtons(sheet, color, tileSize, qx, qy) {
  // NORMAL BUTTONS
  sheet.frames[`button-normal-pill-${color}.png`] = createFrame({
    x: qx + tileSize * 0,
    y: qy + tileSize * 0,
    w: tileSize,
    h: tileSize,
  });
  sheet.frames[`button-normal-left-${color}.png`] = createFrame({
    x: qx + tileSize * 1,
    y: qy + tileSize * 0,
    w: tileSize * 1,
    h: tileSize,
  });
  sheet.frames[`button-normal-center-${color}.png`] = createFrame({
    x: qx + tileSize * 2,
    y: qy + tileSize * 0,
    w: tileSize * 1,
    h: tileSize,
  });
  sheet.frames[`button-normal-right-${color}.png`] = createFrame({
    x: qx + tileSize * 3,
    y: qy + tileSize * 0,
    w: tileSize * 1,
    h: tileSize,
  });

  // PRESSED BUTTONS
  sheet.frames[`button-pressed-pill-${color}.png`] = createFrame({
    x: qx + tileSize * 0,
    y: qy + tileSize * 1,
    w: tileSize,
    h: tileSize,
  });
  sheet.frames[`button-pressed-left-${color}.png`] = createFrame({
    x: qx + tileSize * 1,
    y: qy + tileSize * 1,
    w: tileSize * 1,
    h: tileSize,
  });
  sheet.frames[`button-pressed-center-${color}.png`] = createFrame({
    x: qx + tileSize * 2,
    y: qy + tileSize * 1,
    w: tileSize * 1,
    h: tileSize,
  });
  sheet.frames[`button-pressed-right-${color}.png`] = createFrame({
    x: qx + tileSize * 3,
    y: qy + tileSize * 1,
    w: tileSize * 1,
    h: tileSize,
  });

  // HOVER BUTTONS
  sheet.frames[`button-hover-pill-${color}.png`] = createFrame({
    x: qx + tileSize * 0,
    y: qy + tileSize * 2,
    w: tileSize,
    h: tileSize,
  });
  sheet.frames[`button-hover-left-${color}.png`] = createFrame({
    x: qx + tileSize * 1,
    y: qy + tileSize * 2,
    w: tileSize * 1,
    h: tileSize,
  });
  sheet.frames[`button-hover-center-${color}.png`] = createFrame({
    x: qx + tileSize * 2,
    y: qy + tileSize * 2,
    w: tileSize * 1,
    h: tileSize,
  });
  sheet.frames[`button-hover-right-${color}.png`] = createFrame({
    x: qx + tileSize * 3,
    y: qy + tileSize * 2,
    w: tileSize * 1,
    h: tileSize,
  });
}

function getColors(sheet, tileSize, qx, qy) {
  for (let i = 1; i <= 12; i++) {
    sheet.frames[`neutral-${i}.png`] = createFrame({
      x: qx + tileSize * i,
      y: qy,
      w: tileSize,
      h: tileSize,
    });
  }

  const colorNames = ["red", "green", "yellow", "blue", "purple"];
  colorNames.forEach((colorName, i) => {
    sheet.frames[`${colorName}-1.png`] = createFrame({
      x: qx + tileSize * i,
      y: qy + tileSize,
      w: tileSize,
      h: tileSize,
    });
    sheet.frames[`${colorName}-2.png`] = createFrame({
      x: qx + tileSize * i,
      y: qy + tileSize * 2,
      w: tileSize,
      h: tileSize,
    });
  });
}

createGuiSheet();
