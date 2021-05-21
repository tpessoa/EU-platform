let game;

window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x2a4d69,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 640,
      height: 960,
    },
    audio: {
      disableWebAudio: true,
    },
    fps: {
      target: 40,
      min: 30,
      forceSetTimeOut: true,
    },
    scene: playGame,
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
};

// yellow: "0xffc425"
var s_width, s_height;

/** GLOBAL VARS */
const spaceBetweenIcons = 10;
const biggerCircleRadius = 50;
const smallerCircleRadius = 35;
var numColors = 7; // colors shown in the screen, 5 visible and 2 invisible
var init_color_pos = 0,
  final_color_pos = numColors - 1;
var colorsCirclesObjs = [];
var SELECTEDCIRCLE;

// FLOOD FILL
var data_arr, texture, ctx;
var WIDTH, HEIGHT;
var NEW_COLOR_ARR = [200, 0, 0];
var lineLimitColorUser = 50;
var lineLimitColor = 200;

// ANIMATION
var ANIMATIONS_COUNTER = 0;
var ANIMATION_FLAG = false;
var ANIMATION_DURATION = 500;

// REDO
var BACKUPS_ALL_DRAWINGS = [];
var BACKUP_ARR_OBJ = [];

// HELP
var FLAG_MODAL = false;
var MODAL_CREATED = false;

var painting_sound;
var rotating_sound;
var btnClick_sound;

// Database
var DB_src_original = "/api/games/colorGame/assets/images/coloring-image-2.png";
var DB_src_painting =
  "/api/games/colorGame/assets/images/coloring-image-2-2.png";
// var DB_src_painting = '/games/colorGame/assets/images/coloring-image-2.png';
var DB_title = "Gatinho";
var DB_image_ref = "colorImg";
var DB_image_ref_original = "colorImg";
var DB_game_colors = [
  "0xf37735",
  "0xd11141",
  "0x00b159",
  "0x00aedb",
  "0xffc425",
  "0xD130FF",
  "0x61ffff",
  "0x733F00",
  "0x696969",
];

var GAME_ID;

class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
  }

  init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    GAME_ID = urlParams.get("id");
  }

  async preload() {
    this.load.svg("redo", "/api/games/colorGame/assets/images/redo-solid.svg", {
      width: 50,
      height: 50,
    });
    this.load.svg(
      "close",
      "/api/games/colorGame/assets/images/times-circle-regular.svg",
      { width: 50, height: 50 }
    );
    this.load.svg(
      "carret",
      "/api/games/colorGame/assets/images/caret-left-solid.svg",
      { width: 150, height: 150 }
    );
    this.load.svg(
      "circleImg",
      "/api/games/colorGame/assets/images/circle-solid.svg",
      { scale: 0.15 }
    );
    //this.load.image('colorImg', '/games/colorGame/assets/images/coloring-image-2-2.png');
    // this.load.image('colorImg', '/games/colorGame/assets/images/flag-france.png');

    this.load.audio(
      "btnclick",
      "/api/games/colorGame/assets/sounds/btn_click_1.mp3"
    );
    this.load.audio(
      "painting1stroke",
      "/api/games/colorGame/assets/sounds/painting_1_stroke.mp3"
    );
    this.load.audio(
      "rotation",
      "/api/games/colorGame/assets/sounds/rotation.mp3"
    );

    const get_game_str = "/api/games/game/" + GAME_ID;
    await axios
      .get(get_game_str)
      .then((response) => this.loadFromDB(response))
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  loadFromDB(response) {
    const formatColorsCode = (arr) => {
      const formattedArr = [];
      for (const colorObj of arr) {
        const splitArr = colorObj.code.split("#");
        const code = splitArr[1];
        const formattedColorCode = "0x" + code;
        formattedArr.push(formattedColorCode);
      }
      return formattedArr;
    };

    // console.log(response.data);

    DB_title = response.data.title;

    const config = response.data.config;
    const assets = response.data.assets;

    DB_game_colors = formatColorsCode(config.colors);
    lineLimitColorUser = config.sensibility;

    DB_src_original = assets.colored_img.path + assets.colored_img.server_path;
    DB_image_ref_original = assets.colored_img.id;
    DB_src_painting = assets.blank_img.path + assets.blank_img.server_path;
    DB_image_ref = assets.blank_img.id;

    this.load.on("complete", () => this.createCostum());
    this.load.image(DB_image_ref_original, DB_src_original);
    this.load.image(DB_image_ref, DB_src_painting);
    this.load.start();
  }

  createCostum() {
    s_width = game.scale.width;
    s_height = game.scale.height;
    var middle = game.scale.width / 2;

    let bar_size = (1 / 10) * s_height;
    let main_draw = (7 / 10) * s_height;

    /**
     *
     * TOP BAR
     *
     * */
    var redo = this.add
      .image(0, 0, "redo")
      .setInteractive({ pixelPerfect: true })
      .setTintFill(0xffc425);
    redo.setPosition(redo.width / 2 + spaceBetweenIcons * 2, bar_size / 2);
    redo.on("pointerdown", (pointer) => this.redoHandler(pointer));

    var container_top_bar = this.add.container(0, 0);
    container_top_bar.add(redo);

    /**
     *
     * MIDDLE
     *
     * */
    this.add
      .rectangle(0, bar_size, s_width, main_draw, 0x4b86b4)
      .setOrigin(0, 0)
      .setStrokeStyle(1.5, 0xffc425);

    var imgRef = this.add
      .image(0, 0, DB_image_ref)
      .setOrigin(0, 0)
      .setVisible(false);

    // console.log(imgRef.width);
    // console.log(imgRef.height);

    var imgToColor = this.add
      .image(0, 0, "colorImg")
      .setOrigin(0, 0)
      .setVisible(false);

    const main_draw_min_gap = 100;
    const main_draw_max_width = s_width - main_draw_min_gap * 2;
    const main_draw_max_height = main_draw - main_draw_min_gap * 2;

    imgToColor = this.scaleImageToFitFrame(
      main_draw_max_width,
      main_draw_max_height,
      imgToColor
    );
    var scaledImg = this.make.renderTexture(
      {
        x: imgToColor.getTopLeft().x,
        y: imgToColor.getTopLeft().y,
        width: imgToColor.getBottomRight().x - imgToColor.getTopLeft().x,
        height: imgToColor.getBottomRight().y - imgToColor.getTopLeft().y,
      },
      false
    );
    scaledImg.draw(imgToColor, 0, 0).saveTexture("scaledImg");
    // flagFranceImg = this.scaleImageToFitFrame(main_draw_max_width, main_draw_max_height, flagFranceImg);

    /*       
        
                // PARTE DE MODELAR UMA IMAGEM PARA O TAMANHO PRETENDIDO #TODO
        
                 const main_draw_min_gap = 100;
                const main_draw_max_width = s_width - main_draw_min_gap * 2;
                const main_draw_max_height = main_draw - main_draw_min_gap * 2;
        
                console.log(imgToColor.width);
                console.log(imgToColor.height);
        
                imgToColor = this.scaleImageToFitFrame(main_draw_max_width, main_draw_max_height, imgToColor);
        
                console.log(imgToColor.getTopLeft());
                console.log(imgToColor.getBottomRight());
        
                var scaledImg = this.make.renderTexture(
                    {
                        x: imgToColor.getTopLeft().x,
                        y: imgToColor.getTopLeft().y,
                        width: imgToColor.getBottomRight().x - imgToColor.getTopLeft().x,
                        height: imgToColor.getBottomRight().y - imgToColor.getTopLeft().y
                    }, false);
                scaledImg
                    .draw(imgToColor, 0, 0)
                    .saveTexture('scaledImg')
        
                // var scaledImg = this.add.renderTexture(0, 0, 407, 471);
                // scaledImg.draw(imgToColor, 0, 0).saveTexture('asd')
        
                //var imgToColorScaled = this.add.image(s_width / 2, bar_size + main_draw / 2, 'scaledImg')
                //console.log(imgToColorScaled);
                //console.log('image at (%d, %d)', imgToColorScaled.getTopLeft().x, imgToColorScaled.getTopLeft().y);
        */

    WIDTH = imgRef.width;
    HEIGHT = imgRef.height;
    var grass = this.textures.get(DB_image_ref).getSourceImage();
    // console.log(this.textures.get(DB_image_ref));
    // console.log(this.textures.get('scaledImg').getSourceImage());

    texture = this.textures.createCanvas("colorCanvas", WIDTH, HEIGHT);
    texture.draw(0, 0, grass);
    texture.refresh();
    var img = this.add.image(0, 0, "colorCanvas");
    var imgOffsetX = s_width / 2 - WIDTH / 2;
    var imgOffsetY = bar_size + main_draw / 2 - HEIGHT / 2;

    img.setOrigin(0).setPosition(imgOffsetX, imgOffsetY).setInteractive();
    texture.refresh();
    data_arr = texture.getData(0, 0, WIDTH, HEIGHT);
    ctx = texture.getContext();
    //console.log(data_arr);
    this.input.on("pointerdown", (pointer) =>
      this.clickHandler(imgRef, pointer, imgOffsetX, imgOffsetY)
    );

    /**
     *
     * BOTTOM
     *
     * */

    // CIRCLES
    // draw smaller circle that evidences the color selected
    const color_bar_y = bar_size + main_draw + bar_size;
    SELECTEDCIRCLE = this.add
      .image(0, 0, "circleImg")
      .setVisible(true)
      .setPosition(middle, color_bar_y)
      .setTintFill(0xffffff)
      .setScale(1.15);

    for (let circle_pos = 0; circle_pos < numColors; circle_pos++) {
      this.createCircle(circle_pos, color_bar_y, DB_game_colors[circle_pos]);
    }

    // ARROWS
    // align with redo icon
    var arrow_left = this.add
      .image(0, 0, "carret")
      .setInteractive({ pixelPerfect: true })
      .setTintFill(0xffc425)
      .setPosition(redo.x, color_bar_y);
    var arrow_right = this.add
      .image(0, 0, "carret")
      .setInteractive({ pixelPerfect: true })
      .setTintFill(0xffc425)
      .setPosition(s_width - redo.x, color_bar_y)
      .setScale(-1, 1);

    arrow_left.on("pointerdown", (pointer) =>
      this.getSwipedArr(pointer, "right")
    );
    arrow_right.on("pointerdown", (pointer) =>
      this.getSwipedArr(pointer, "left")
    );

    // MODAL
    var originalImg = this.add
      .image(0, 0, DB_image_ref_original)
      .setInteractive({ pixelPerfect: true });
    originalImg = this.scaleImageToFitFrame(
      1000,
      bar_size * (1 / 2),
      originalImg
    );
    originalImg.setPosition(
      s_width - originalImg.width / 2 - spaceBetweenIcons * 2,
      bar_size / 2
    );
    // click on original image to show the MODAL
    originalImg.on("pointerdown", (pointer) =>
      this.createModal(bar_size, container_top_bar, originalImg)
    );

    // sound
    painting_sound = this.sound.add("painting1stroke");
    rotating_sound = this.sound.add("rotation");
    btnClick_sound = this.sound.add("btnclick");
  }

  createModal(bar_size, container_top_bar, originalImg) {
    btnClick_sound.play();
    FLAG_MODAL = true;
    // add transparent rect
    var transparent_rec = this.add
      .rectangle(0, 0, s_width, s_height, 0x000000)
      .setOrigin(0, 0)
      .setAlpha(0.8)
      .setInteractive();

    const side_gap = spaceBetweenIcons * 6;
    const holder_rec_w = s_width - side_gap * 2;
    var modal_container = this.add.container(side_gap, bar_size + side_gap);

    var closeBtn = this.add
      .image(0, 0, "close")
      .setInteractive({ pixelPerfect: true })
      .setTintFill(0xffc425)
      .setOrigin(0, 0);
    closeBtn.setPosition(
      holder_rec_w - closeBtn.width - spaceBetweenIcons,
      spaceBetweenIcons
    );

    const font_size = 40;
    var name = this.make.text({
      x: (s_width - side_gap * 2) / 2,
      y: spaceBetweenIcons,
      text: DB_title,
      origin: { x: 0.5, y: 0 },
      style: {
        fontFamily: "Arial",
        fontSize: font_size,
        color: "#4b86b4",
        wordWrap: {
          width: holder_rec_w - 3 * closeBtn.width,
          useAdvancedWrap: true,
        },
      },
    });

    var originalImgModal = this.add.image(0, 0, DB_image_ref_original);
    originalImgModal = this.scaleImageToFitFrame(
      s_width - side_gap * 4,
      10000,
      originalImgModal
    );
    originalImgModal.setPosition(
      (s_width - side_gap * 2) / 2,
      name.getBottomRight().y + side_gap + originalImgModal.height / 2
    );
    container_top_bar.add(originalImg);

    var holder_rec = this.add
      .rectangle(
        0,
        0,
        holder_rec_w,
        originalImgModal.getBottomRight().y + side_gap,
        0xffffff
      )
      .setOrigin(0, 0)
      .setAlpha(1)
      .setInteractive();

    modal_container.add(holder_rec);
    modal_container.add(closeBtn);
    modal_container.add(name);
    modal_container.add(originalImgModal);

    // click on closeBnt or transparent rect to hide the MODAL
    closeBtn.on("pointerdown", () =>
      this.modalHandler(modal_container, transparent_rec)
    );
    transparent_rec.on("pointerdown", () =>
      this.modalHandler(modal_container, transparent_rec)
    );
  }

  modalHandler(modal_container, transparent_rec) {
    btnClick_sound.play();
    modal_container.setVisible(false);
    transparent_rec.setVisible(false);
    FLAG_MODAL = false;
  }

  redoHandler(pointer) {
    // Discard mouse right button
    if (pointer.rightButtonDown()) return;
    // console.log(BACKUPS_ALL_DRAWINGS);
    if (BACKUPS_ALL_DRAWINGS.length == 0) return;

    btnClick_sound.play();
    // get the last one from array
    const temp_arr = BACKUPS_ALL_DRAWINGS.pop();
    let temp_obj;
    for (let i = 0; i < temp_arr.length; i++) {
      temp_obj = temp_arr[i];
      data_arr.data[temp_obj.pos] = temp_obj.color[0];
      data_arr.data[temp_obj.pos + 1] = temp_obj.color[1];
      data_arr.data[temp_obj.pos + 2] = temp_obj.color[2];

      // SAFARI workarround
      ctx.fillStyle =
        "rgb(" +
        temp_obj.color[0] +
        "," +
        temp_obj.color[1] +
        "," +
        temp_obj.color[2] +
        ")";
      ctx.fillRect(temp_obj.x, temp_obj.y, 1, 1);
    }
    texture.refresh();
  }

  /**
   *
   * AUXILIAR FUNCS
   *
   * */
  createCircle(pos_x, pos_y, color) {
    let middle = game.scale.width / 2;

    var circle = this.add.image(0, 0, "circleImg").setVisible(false);

    var x_draw_circle = 0;
    if (pos_x == 0) {
      x_draw_circle =
        middle - (6 * smallerCircleRadius + 6 * spaceBetweenIcons);
    }
    if (pos_x === 1) {
      x_draw_circle =
        middle - (4 * smallerCircleRadius + 4 * spaceBetweenIcons);
    } else if (pos_x === 2) {
      x_draw_circle =
        middle - (2 * smallerCircleRadius + 2 * spaceBetweenIcons);
    } else if (pos_x === 3) {
      x_draw_circle = middle;
    } else if (pos_x === 4) {
      x_draw_circle =
        middle + (2 * smallerCircleRadius + 2 * spaceBetweenIcons);
    } else if (pos_x === 5) {
      x_draw_circle =
        middle + (4 * smallerCircleRadius + 4 * spaceBetweenIcons);
    } else if (pos_x === 6) {
      x_draw_circle =
        middle + (6 * smallerCircleRadius + 6 * spaceBetweenIcons);
    }

    circle
      .setVisible(true)
      .setPosition(x_draw_circle, pos_y)
      .setInteractive({ pixelPerfect: true })
      .setTintFill(color)
      .setData("color", color)
      .setData("pos", pos_x);

    // removes the first and the last
    if (pos_x === 0 || pos_x === 6) {
      circle.setVisible(false).setInteractive(false);
    }
    // define middle color
    else if (pos_x == 3) {
      NEW_COLOR_ARR = this.convertColorStrToArray(circle.getData("color"));
    }

    circle.on("pointerdown", (pointer) => this.updateColor(pointer, circle));
    colorsCirclesObjs.push(circle);
  }

  updateColor(pointer, circle) {
    // Discard mouse right button
    if (pointer.rightButtonDown()) return;
    SELECTEDCIRCLE.x = circle.x;
    NEW_COLOR_ARR = this.convertColorStrToArray(circle.getData("color"));
  }

  convertColorStrToArray(colorStr) {
    let colorStrArr = colorStr.split("");
    let beginPos = 2; // 0x(LL)(NN)(LL)
    let colorNumersArr = [];

    for (let i = beginPos; i < colorStrArr.length; i += 2) {
      let tempArr = [];
      tempArr.push(colorStrArr[i]);
      tempArr.push(colorStrArr[i + 1]);
      let number = parseInt(tempArr.join(""), 16);
      colorNumersArr.push(number);
    }
    return colorNumersArr;
  }

  getSwipedArr(pointer, direction) {
    // Discard mouse right button
    if (pointer.rightButtonDown()) return;

    // check if last animation is already done
    if (ANIMATION_FLAG) return;
    ANIMATION_FLAG = true;
    SELECTEDCIRCLE.setVisible(false);
    rotating_sound.play();

    // flag that puts the selected circle back to the middle
    if (direction === "right") {
      for (let i = 0; i < colorsCirclesObjs.length - 1; i++) {
        this.doSwipeAnimation(
          colorsCirclesObjs[i],
          colorsCirclesObjs[i + 1],
          ANIMATION_DURATION,
          direction
        );
        if (i === 0) {
          // the first that goes to second position needs to go visible and interactive
          colorsCirclesObjs[i]
            .setVisible(true)
            .setInteractive({ pixelPerfect: true });
        }
        if (i === colorsCirclesObjs.length - 2) {
          // the penultimate that goes to last position needs to go INvisible and NOT interactive
          colorsCirclesObjs[i].setVisible(false).setInteractive(false);
        }
      }
    } else {
      for (let i = colorsCirclesObjs.length - 1; i >= 1; i--) {
        this.doSwipeAnimation(
          colorsCirclesObjs[i],
          colorsCirclesObjs[i - 1],
          ANIMATION_DURATION,
          direction
        );

        if (i === colorsCirclesObjs.length - 1) {
          // the last that goes to penultimate position needs to go visible and interactive
          colorsCirclesObjs[i]
            .setVisible(true)
            .setInteractive({ pixelPerfect: true });
        }
        if (i === 1) {
          // the second that goes to first position needs to go INvisible and NOT interactive
          colorsCirclesObjs[i].setVisible(false).setInteractive(false);
        }
      }
    }
  }

  allAnimationsCompletedHandler(tweenRef, direction) {
    // number of animations
    if (ANIMATIONS_COUNTER < colorsCirclesObjs.length - 2) {
      ANIMATIONS_COUNTER++;
      this.tweens.remove(tweenRef);
    } else {
      //console.log("Hey! All done!")
      if (direction === "right") {
        // put the last circle in the beginning
        let last_circle = colorsCirclesObjs.pop();

        // update coordinates
        last_circle.x =
          game.scale.width / 2 -
          (6 * smallerCircleRadius + 6 * spaceBetweenIcons);

        // remove from last position and insert in the first
        colorsCirclesObjs.unshift(last_circle);

        // update the color
        this.getWindowColors(direction);
      } else {
        // put the first cicle in the end
        let first_circle = colorsCirclesObjs.shift();

        //update coordinates
        first_circle.x =
          game.scale.width / 2 +
          (6 * smallerCircleRadius + 6 * spaceBetweenIcons);

        // remove from first position and insert in the last
        colorsCirclesObjs.push(first_circle);

        // update the color
        this.getWindowColors(direction);
      }
      // reset flags
      ANIMATIONS_COUNTER = 0;
      ANIMATION_FLAG = false;
      SELECTEDCIRCLE.setVisible(true);

      // update select circle color
      // find the color
      for (let i = 0; i < colorsCirclesObjs.length; i++) {
        if (SELECTEDCIRCLE.x === colorsCirclesObjs[i].x) {
          NEW_COLOR_ARR = this.convertColorStrToArray(
            colorsCirclesObjs[i].getData("color")
          );
        }
      }
    }
  }

  getWindowColors(direction) {
    // convert to module
    const m = DB_game_colors.length;

    if (direction === "right") {
      init_color_pos -= 1;
      final_color_pos -= 1;

      // get next color in array for the FIRST circle
      let mod_init = ((init_color_pos % m) + m) % m;
      let newFirstCircleColor = DB_game_colors[mod_init];
      colorsCirclesObjs[0]
        .setData("color", newFirstCircleColor)
        .setTintFill(newFirstCircleColor);
    } else {
      init_color_pos += 1;
      final_color_pos += 1;

      // get anterior color in array for the LAST circle
      let mod_final = ((final_color_pos % m) + m) % m;
      let newLastCircleColor = DB_game_colors[mod_final];
      colorsCirclesObjs[colorsCirclesObjs.length - 1]
        .setData("color", newLastCircleColor)
        .setTintFill(newLastCircleColor);
    }
  }

  doSwipeAnimation(targetObj, destObj, duration, direction) {
    var circleTween = this.tweens.add({
      targets: targetObj,
      x: destObj.x,
      y: destObj.y,
      ease: "Power2",
      duration: duration,
      onComplete: () =>
        this.allAnimationsCompletedHandler(circleTween, direction),
    });
  }

  /**
   * FLOOD FILL UTILS
   * @param {*} imgObj
   * @param {*} pointer
   * @param {*} imgOffsetX
   * @param {*} imgOffsetY
   */

  clickHandler(imgObj, pointer, imgOffsetX, imgOffsetY) {
    if (FLAG_MODAL) return;

    // Discard mouse right button
    if (pointer.rightButtonDown()) {
      return;
    }
    const roundX = Math.round(pointer.x - imgOffsetX);
    const roundY = Math.round(pointer.y - imgOffsetY);

    // see if users clicks inside image
    if (
      roundX >= imgObj.x &&
      roundX <= imgObj.width - imgObj.x &&
      roundY >= imgObj.y &&
      roundY <= imgObj.height - imgObj.y
    ) {
      // console.log("Clicked: (%d, %d)", roundX, roundY);

      let pos = roundY * WIDTH * 4 + roundX * 4;
      const startPixelData = {
        r: data_arr.data[pos],
        g: data_arr.data[pos + 1],
        b: data_arr.data[pos + 2],
      };
      // console.log(
      //   "Pixel color (%d, %d, %d)",
      //   startPixelData.r,
      //   startPixelData.g,
      //   startPixelData.b
      // );

      // VER MELHOR ESTE ELSE IF?
      // see if the user clicks on the line
      if (
        startPixelData.r < lineLimitColorUser &&
        startPixelData.g < lineLimitColorUser &&
        startPixelData.b < lineLimitColorUser
      ) {
        // console.log("Line");
        return;
      }
      // check if already painted
      if (
        startPixelData.r == NEW_COLOR_ARR[0] &&
        startPixelData.g == NEW_COLOR_ARR[1] &&
        startPixelData.b == NEW_COLOR_ARR[2]
      ) {
        // console.log("section already painted in this color");
      } else {
        this.floodFill(
          roundX,
          roundY,
          startPixelData,
          imgObj.x,
          imgObj.y,
          imgObj.width,
          imgObj.height
        );
      }
    } else {
      // console.log("outside");
    }
  }

  floodFill(
    startX,
    startY,
    startPixelData,
    drawingAreaX,
    drawingAreaY,
    drawingAreaWidth,
    drawingAreaHeight
  ) {
    // console.log("--- Flood Fill START ---");
    var newPos,
      x,
      y,
      pixelPos,
      reachLeft,
      reachRight,
      pixelStack = [[startX, startY]],
      drawingBoundLeft = drawingAreaX,
      drawingBoundTop = drawingAreaY,
      drawingBoundRight = drawingAreaX + drawingAreaWidth - 1,
      drawingBoundBottom = drawingAreaY + drawingAreaHeight - 1;
    while (pixelStack.length) {
      newPos = pixelStack.pop();
      x = newPos[0];
      y = newPos[1];

      //console.log("Stack Point " + newPos);
      pixelPos = (y * WIDTH + x) * 4;
      while (
        y >= drawingBoundTop &&
        this.matchStartColor(startPixelData, pixelPos)
      ) {
        y -= 1;
        pixelPos -= WIDTH * 4;
      }

      //go 1 up (bc its stops out of image)
      pixelPos += WIDTH * 4;
      y += 1;
      reachLeft = false;
      reachRight = false;
      while (
        y <= drawingBoundBottom &&
        this.matchStartColor(startPixelData, pixelPos)
      ) {
        this.colorPixel(x, y, pixelPos);

        // pixel to the left is to paint?
        if (x > drawingBoundLeft) {
          if (this.matchStartColor(startPixelData, pixelPos - 4)) {
            if (!reachLeft) {
              //console.log('pushing to stack (%d, %d)', x - 1, y)
              pixelStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        // pixel to the right is to paint?
        if (x < drawingBoundRight) {
          if (this.matchStartColor(startPixelData, pixelPos + 4)) {
            if (!reachRight) {
              //console.log('pushing to stack (%d, %d)', x + 1, y)
              pixelStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }

        pixelPos += WIDTH * 4;
        y += 1;
      }
    }

    // console.log("--- Flood Fill END ---");
    texture.refresh();
    // put complete backup in backup array
    BACKUPS_ALL_DRAWINGS.push(BACKUP_ARR_OBJ);
    // reset backup_arr_objs
    BACKUP_ARR_OBJ = [];

    // play sound
    painting_sound.play();
  }

  matchStartColor(startPixelData, pixelPos) {
    // se if can go up by looking if the upwards pixel has the same color
    // define where it stops -> (r,g,b) < 50 ?

    let r = data_arr.data[pixelPos];
    let g = data_arr.data[pixelPos + 1];
    let b = data_arr.data[pixelPos + 2];

    // console.log('(%d, %d, %d) -comparing- INIT(%d, %d, %d)', r, g, b, startPixelData.r, startPixelData.g, startPixelData.b);

    // If the current pixel matches the clicked color
    if (
      r == startPixelData.r &&
      g == startPixelData.g &&
      b == startPixelData.b
    ) {
      return true;
    }
    // If current pixel matches the new color
    if (
      r == NEW_COLOR_ARR[0] &&
      g == NEW_COLOR_ARR[1] &&
      b == NEW_COLOR_ARR[2]
    ) {
      return false;
    }
    // define the limit where it cant pain
    if (r > lineLimitColor && g > lineLimitColor && b > lineLimitColor) {
      return true;
    }
    return false;
  }

  colorPixel(x, y, pixelPos) {
    // REDO
    let tempObj = {
      pos: pixelPos,
      x: x,
      y: y,
      color: [
        data_arr.data[pixelPos],
        data_arr.data[pixelPos + 1],
        data_arr.data[pixelPos + 2],
      ],
    };
    BACKUP_ARR_OBJ.push(tempObj);

    data_arr.data[pixelPos] = NEW_COLOR_ARR[0];
    data_arr.data[pixelPos + 1] = NEW_COLOR_ARR[1];
    data_arr.data[pixelPos + 2] = NEW_COLOR_ARR[2];

    // SAFARI workarround
    ctx.fillStyle =
      "rgb(" +
      NEW_COLOR_ARR[0] +
      "," +
      NEW_COLOR_ARR[1] +
      "," +
      NEW_COLOR_ARR[2] +
      ")";
    ctx.fillRect(x, y, 1, 1);

    // old method - work on chrome and firefox but not on safari
    //texture.setPixel(x, y, NEW_COLOR_ARR[0], NEW_COLOR_ARR[1], NEW_COLOR_ARR[2]);
  }

  scaleImageToFitFrame(maxWidth, maxHeight, imgObj) {
    // console.log("Image width needs to fit %d", maxWidth);
    // console.log("Image height needs to fit %d", maxHeight);

    var { maxScaleWidth, maxScaleHeight } = 1;
    // find scale width interval
    maxScaleWidth = maxWidth / imgObj.width;
    // find scale height interval
    maxScaleHeight = maxHeight / imgObj.height;

    // console.log("scaling...");
    // console.log("Width scale values %f", maxScaleWidth);
    // console.log("Height scale values %f", maxScaleHeight);
    var newScaleValue = Math.min(
      maxScaleWidth.toFixed(3),
      maxScaleHeight.toFixed(3)
    );

    // console.log("value new scale " + newScaleValue);
    imgObj
      .setScale(newScaleValue)
      .setSize(
        Math.floor(imgObj.width * newScaleValue),
        Math.floor(imgObj.height * newScaleValue)
      );

    //center img
    // console.log("updated");
    // console.log(imgObj.width);
    // console.log(imgObj.height);

    // WIDTH = imgObj.width;
    // HEIGHT = imgObj.height;

    return imgObj;
  }
}
