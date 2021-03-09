let game;

window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x2a4d69,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 960,
      height: 520,
    },
    audio: {
      disableWebAudio: true,
    },
    fps: {
      max: 60,
      target: 50,
      min: 20,
      forceSetTimeOut: true,
    },
    scene: Puzzle,
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
};

var SIDE_GAP = 50;
var DISTANCE_BETWEEN_ICONS = 20;
var HORIZONTAL_PIECES, VERTICAL_PIECES;
var TOLERANCE_LOCK_OFFSET = 15;
var IMG_SCALE_VALUE;
// PIECES
var PIECE_W, PIECE_H, RADIUS_PIECE;
var ARR_G_PIECES = [];
var ARR_G_PIECES_LINE = [];

var ARR_MOVE_PIECES_LINE = [];
var ARR_MOVE_PIECES = [];

var DEPTH_COUNTER = 0;
var TOTAL_PIECES = 0,
  CURRENT_PIECES = 0;
var PIECES_TEXT = "";

// Sound
var select_sound;
var drop_sound;
var right_sound;
var complete_sound;

// DB
var DB_src = "/api/games/puzzle/assets/images/test_image_1.jpg";
var DB_size_pieces = 100;
var DB_image_ref = "puzzleImg";
var GAME_REF;

class Puzzle extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    GAME_REF = urlParams.get("id");
  }

  async preload() {
    this.load.image(DB_image_ref, DB_src);

    this.load.audio("select", "/api/games/puzzle/assets/sounds/select.mp3");
    this.load.audio("drop_piece", "/api/games/puzzle/assets/sounds/drop.mp3");
    this.load.audio(
      "right_place",
      "/api/games/puzzle/assets/sounds/right_place.mp3"
    );
    this.load.audio(
      "complete_puzzle",
      "/api/games/puzzle/assets/sounds/complete.mp3"
    );

    const get_game_str = "/api/games/puzzle/" + GAME_REF;
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
    console.log(response.data);
    if (response.data) {
      DB_src = response.data.src;
      DB_size_pieces = response.data.piece_size;
      DB_image_ref = response.data.image_ref;
    }
    this.load.on("complete", () => this.createCostum());
    this.load.image(DB_image_ref, DB_src);
    this.load.start();
  }

  createCostum() {
    let s_width = game.scale.width;
    let s_height = game.scale.height;
    var middle = game.scale.width / 2;

    const bar_size_height_value = 0.12;
    let bar_size_height = bar_size_height_value * s_height;
    let main_puzzle_height = (1 - bar_size_height_value) * s_height;

    var puzzle_width = 0.7 * s_width;
    var pieces_width = 0.3 * s_width;

    var graphics = this.add.graphics();
    graphics.fillStyle(0x4b86b4, 1);
    //  32px radius on the corners
    graphics.lineStyle(5, 0xffc425);
    graphics.fillRoundedRect(
      0,
      -bar_size_height * 0.5,
      s_width,
      bar_size_height * 1.5,
      32
    );
    graphics.setDepth(-2);

    // var container_top_bar = this.add.container(0, 0);
    // var see_puzzle_btn = this.add.image(0, 0, 'eyeBtn').setOrigin(0);
    // container_top_bar.add(see_puzzle_btn);
    // see_puzzle_btn
    //     .setPosition(s_width - see_puzzle_btn.width - DISTANCE_BETWEEN_ICONS, 5)
    //     .setInteractive();

    var puzzleImg = this.add
      .image(0, bar_size_height, DB_image_ref)
      .setInteractive();
    puzzleImg = this.scaleImageToFitFrame(
      puzzle_width - SIDE_GAP * 2,
      main_puzzle_height - 2 * SIDE_GAP,
      puzzleImg
    );
    puzzleImg
      .setPosition(puzzle_width / 2, bar_size_height + main_puzzle_height / 2)
      .setAlpha(0.2);

    const puzzle_max_width_pieces = Math.floor(
      (puzzle_width - SIDE_GAP * 2) / DB_size_pieces
    );
    const puzzle_max_height_pieces = Math.floor(
      (main_puzzle_height - 2 * SIDE_GAP) / DB_size_pieces
    );
    console.log("MAX. horizontal pieces? " + puzzle_max_width_pieces);
    console.log("MAX. vertical pieces? " + puzzle_max_height_pieces);
    HORIZONTAL_PIECES = puzzle_max_width_pieces;
    VERTICAL_PIECES = puzzle_max_height_pieces;
    TOTAL_PIECES = HORIZONTAL_PIECES * VERTICAL_PIECES;

    // ADJUST PIECES
    PIECE_W = puzzleImg.width / puzzle_max_width_pieces;
    PIECE_H = puzzleImg.height / puzzle_max_height_pieces;
    console.log("PIECE_W " + PIECE_W);
    console.log("PIECE_H " + PIECE_H);
    // mean of the two pices sizes
    RADIUS_PIECE = (PIECE_H + PIECE_W) / 2 / 3;

    // var g_offsetX = SIDE_GAP + puzzle_width;
    // var g_offsetY = SIDE_GAP + bar_size_height;
    var g_offsetX = 0;
    var g_offsetY = 0;
    this.generateBoard(puzzleImg);

    var puzzleImg_aux = this.add.image(0, 0, DB_image_ref);
    puzzleImg_aux = this.scaleImageToFitFrame(
      puzzle_width - SIDE_GAP * 2,
      main_puzzle_height - 2 * SIDE_GAP,
      puzzleImg_aux
    );
    puzzleImg_aux.setOrigin(0).setVisible(false);

    var width_piece_rt, height_piece_rt, piece_draw_x, piece_draw_y;
    var info_piece;
    var offset_piece_to_img_X, offset_piece_to_img_Y;
    const min_x = puzzle_width + RADIUS_PIECE;
    const max_x = s_width - PIECE_W - RADIUS_PIECE;
    const min_y = bar_size_height + RADIUS_PIECE;
    const max_y = s_height - PIECE_H - RADIUS_PIECE;

    for (let j = 0; j < VERTICAL_PIECES; j++) {
      for (let i = 0; i < HORIZONTAL_PIECES; i++) {
        // see the type of piece to make a texture with the right width and height
        info_piece = ARR_G_PIECES[j][i];

        // height
        height_piece_rt = PIECE_H;
        piece_draw_y = j * PIECE_H;
        if (info_piece.t == 1) {
          height_piece_rt += RADIUS_PIECE;
          piece_draw_y -= RADIUS_PIECE;
        }
        if (info_piece.b == 1) {
          height_piece_rt += RADIUS_PIECE;
        }
        // width
        width_piece_rt = PIECE_W;
        piece_draw_x = i * PIECE_W;
        if (info_piece.r == 1) {
          width_piece_rt += RADIUS_PIECE;
        }
        if (info_piece.l == 1) {
          width_piece_rt += RADIUS_PIECE;
          piece_draw_x -= RADIUS_PIECE;
        }
        //console.log('w %d, h %d', width_piece_rt, height_piece_rt);

        this.make
          .renderTexture(
            { width: width_piece_rt, height: height_piece_rt },
            false
          )
          .draw(puzzleImg_aux, -piece_draw_x, -piece_draw_y)
          .saveTexture("piece[" + j + "," + i + "]");

        var pieceImg_aux = this.add
          .image(
            puzzleImg.getTopLeft().x + piece_draw_x,
            puzzleImg.getTopLeft().y + piece_draw_y,
            "piece[" + j + "," + i + "]"
          )
          .setInteractive()
          .setOrigin(0);
        //.setVisible(false);

        // 1: egde case -> find dual piece socket
        // 1 for horizontal dual socket
        // 2 for vertical dual socker
        if (this.dualSocketPieceVerifier(info_piece) == 1) {
          piece_draw_x += RADIUS_PIECE;
        }
        if (this.dualSocketPieceVerifier(info_piece) == 2) {
          piece_draw_y += RADIUS_PIECE;
        }

        // 2: edge case -> in the last column there are pieces that are "dual socket" but finish the right side at 0
        if (info_piece.l == 1 && info_piece.r == 0) {
          piece_draw_x += RADIUS_PIECE;
        }

        // 3: edge case -> in the last line there are pieces that are "dual socket" but finish the bottom at 0
        if (info_piece.t == 1 && info_piece.b == 0) {
          piece_draw_y += RADIUS_PIECE;
        }

        var pieceGraphic_aux = this.generateJigsawPiece(
          g_offsetX,
          g_offsetY,
          info_piece.t,
          info_piece.r,
          info_piece.b,
          info_piece.l,
          1.5,
          0x696969
        );
        pieceGraphic_aux
          .setPosition(
            puzzleImg.getTopLeft().x + piece_draw_x,
            puzzleImg.getTopLeft().y + piece_draw_y
          )
          .setDepth(-1);

        // pieceImg_aux.mask = new Phaser.Display.Masks.BitmapMask(this, pieceGraphic_aux);
        pieceImg_aux.setMask(pieceGraphic_aux.createGeometryMask());

        offset_piece_to_img_X = pieceGraphic_aux.x - pieceImg_aux.x;
        offset_piece_to_img_Y = pieceGraphic_aux.y - pieceImg_aux.y;
        pieceImg_aux.setData("x_offset", offset_piece_to_img_X);
        pieceImg_aux.setData("y_offset", offset_piece_to_img_Y);
        pieceImg_aux.setData("line_ref", j);
        pieceImg_aux.setData("column_ref", i);
        pieceImg_aux.setData("lock_pos", {
          x: pieceGraphic_aux.x,
          y: pieceGraphic_aux.y,
        });
        if (j == 0 && i == 0) console.log(pieceImg_aux);
        this.input.setDraggable(pieceImg_aux);
        pieceImg_aux.input.draggable = true;
        if (j == 0 && i == 0) console.log(pieceImg_aux);
        var temp_obj = {
          pieceImg: pieceImg_aux,
          pieceObj: pieceGraphic_aux,
        };
        ARR_MOVE_PIECES_LINE.push(temp_obj);

        // set random pos in the right side
        var random_piece_pos = {
          x: this.getRndInteger(min_x, max_x),
          y: this.getRndInteger(min_y, max_y),
        };

        const final_x = random_piece_pos.x - offset_piece_to_img_X;
        const final_y = random_piece_pos.y - offset_piece_to_img_Y;
        pieceImg_aux.setPosition(final_x, final_y);
        pieceGraphic_aux.setPosition(
          final_x + offset_piece_to_img_X,
          final_y + offset_piece_to_img_Y
        );
      }
      ARR_MOVE_PIECES.push(ARR_MOVE_PIECES_LINE);
      ARR_MOVE_PIECES_LINE = [];
    }

    /**
     * TEXT
     *
     */
    var gameName = this.add.text(SIDE_GAP / 2, bar_size_height / 2, "Puzzle", {
      fontFamily: "Arial Black",
      fontSize: 52,
      color: "#4b86b4",
    });
    gameName.setStroke("#ffcc5c", 10);
    //  Apply the shadow to the Stroke and the Fill (this is the default)
    gameName.setShadow(2, 2, "#333333", 2, true, true);
    gameName.setOrigin(0, 0.5);

    var pieces_str = CURRENT_PIECES + "/" + TOTAL_PIECES;
    PIECES_TEXT = this.add.text(s_width / 2, bar_size_height / 2, pieces_str, {
      fontFamily: "Arial Black",
      fontSize: 40,
      color: "#4b86b4",
    });
    PIECES_TEXT.setStroke("#ffcc5c", 10);
    //  Apply the shadow to the Stroke and the Fill (this is the default)
    PIECES_TEXT.setShadow(2, 2, "#333333", 2, true, true);
    PIECES_TEXT.setOrigin(0.5);

    /**
     * SOUND
     *
     */
    select_sound = this.sound.add("select");
    drop_sound = this.sound.add("drop_piece");
    right_sound = this.sound.add("right_place");
    complete_sound = this.sound.add("complete_puzzle");

    /**
     * DRAG PIECES
     *
     */
    this.input.on("dragstart", function (pointer, gameObject) {
      gameObject.setDepth(++DEPTH_COUNTER);
      select_sound.play();
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) =>
      this.dragHandler(gameObject, dragX, dragY)
    );

    this.input.on("dragend", (pointer, gameObject) =>
      this.dragEndHandler(gameObject)
    );

    // this.input.on('pointerdown', function (pointer, gameObject) {
    //     console.log(pointer.x, pointer.y);
    //     console.log(gameObject);
    // });
  }

  dragEndHandler(gameObject) {
    // check if its right position
    const lock_pos = gameObject.getData("lock_pos");
    const line_index = gameObject.getData("line_ref");
    const col_index = gameObject.getData("column_ref");
    var temp_pieceObj = ARR_MOVE_PIECES[line_index][col_index].pieceObj;

    if (temp_pieceObj.x == lock_pos.x && temp_pieceObj.y == lock_pos.y) {
      // disable piece draggablility
      this.input.setDraggable(gameObject, false);
      gameObject.input.draggable = false;
      gameObject.setDepth(1);
      // count piece
      CURRENT_PIECES++;
      PIECES_TEXT.setText(CURRENT_PIECES + "/" + TOTAL_PIECES);

      // VERIFY END OF PUZZLE
      if (CURRENT_PIECES == TOTAL_PIECES) {
        complete_sound.play();
      } else {
        right_sound.play();
      }
    } else {
      drop_sound.play();
    }
  }

  dragHandler(gameObject, dragX, dragY) {
    const line_index = gameObject.getData("line_ref");
    const col_index = gameObject.getData("column_ref");
    const x_offset = gameObject.getData("x_offset");
    const y_offset = gameObject.getData("y_offset");
    const lock_pos = gameObject.getData("lock_pos");

    var temp_pieceObj = ARR_MOVE_PIECES[line_index][col_index].pieceObj;

    // check POSITION
    if (this.checkLockPosition(lock_pos, dragX + x_offset, dragY + y_offset)) {
      // put piece in right place
      const final_x = lock_pos.x - x_offset;
      const final_y = lock_pos.y - y_offset;
      gameObject.setPosition(final_x, final_y);
      temp_pieceObj.setPosition(final_x + x_offset, final_y + y_offset);
    } else {
      gameObject.setPosition(dragX, dragY);
      temp_pieceObj.setPosition(dragX + x_offset, dragY + y_offset);
    }
  }

  checkLockPosition(lock_pos, obj_x, obj_y) {
    //console.log('%d -- %d', obj_x, lock_pos.x)
    if (
      obj_x > lock_pos.x - TOLERANCE_LOCK_OFFSET &&
      obj_x < lock_pos.x + TOLERANCE_LOCK_OFFSET &&
      obj_y > lock_pos.y - TOLERANCE_LOCK_OFFSET &&
      obj_y < lock_pos.y + TOLERANCE_LOCK_OFFSET
    ) {
      return true;
    }
    return false;
  }

  dualSocketPieceVerifier(obj) {
    if (obj.t == 1 && obj.b == 1) return 2;
    if (obj.r == 1 && obj.l == 1) return 1;
    return 0;
  }

  setBindPosition(pieceObj, imgObj, newPosX, newPosY) {
    imgObj.setPosition(imgObj.x + newPosX, imgObj.y + newPosY);
    pieceObj.setPosition(pieceObj.x + newPosX, pieceObj.y + newPosY);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateBoard(puzzleImg) {
    /**
     * TYPE
     *  (top, left, bottom, right)
     *  -> 1, 1, 1, 1 : only pieces with out socket
     *  -> -1, -1, -1, -1 : only pieces with in socket
     *  -> 0, 1, -1, 0 : socket out right, socket in bottom and non socket top and left
     *  -> 1, -1, 1, -1 : top and bottom out socket, left and right in socket
     *  -> etc...
     */
    var graphic_piece;
    var g_offsetX = 0;
    var g_offsetY = 0;
    var puzzle_offset = puzzleImg.getTopLeft();
    var type_top, type_right, type_bottom, type_left;
    var piece_type_obj;

    for (let j = 0; j < VERTICAL_PIECES; j++) {
      for (let i = 0; i < HORIZONTAL_PIECES; i++) {
        // first line
        if (j == 0) {
          type_top = 0;
          // first piece
          if (i == 0) {
            type_right = -1;
            type_bottom = 1;
            type_left = 0;
          }
          // anterior socket type
          else if (ARR_G_PIECES_LINE[i - 1].r == -1) {
            type_right = 1;
            type_bottom = -1;
            type_left = 1;
          } else {
            type_right = -1;
            type_bottom = 1;
            type_left = -1;
          }
        }
        // lines in the middle
        else {
          //console.log('it: %d, i: %d, bottom: %d', j, i, ARR_G_PIECES[j - 1][i].b)
          if (ARR_G_PIECES[j - 1][i].b == 1) {
            type_top = -1;
            type_bottom = -1;
            type_right = 1;
            type_left = 1;
          } else {
            type_top = 1;
            type_bottom = 1;
            type_right = -1;
            type_left = -1;
          }
        }
        // left
        if (i == 0) {
          type_left = 0;
        }
        // right
        else if (i == HORIZONTAL_PIECES - 1) {
          type_right = 0;
        }
        // last line
        if (j == VERTICAL_PIECES - 1) {
          type_bottom = 0;
        }
        graphic_piece = this.generateJigsawPiece(
          g_offsetX,
          g_offsetY,
          type_top,
          type_right,
          type_bottom,
          type_left,
          1,
          0x4b86b4
        );
        graphic_piece.setPosition(
          puzzle_offset.x + i * PIECE_W,
          puzzle_offset.y + j * PIECE_H
        );
        graphic_piece.setDepth(-1);

        piece_type_obj = {
          t: type_top,
          r: type_right,
          b: type_bottom,
          l: type_left,
          pos_x: puzzle_offset.x + i * PIECE_W,
          pos_y: puzzle_offset.y + j * PIECE_H,
        };
        ARR_G_PIECES_LINE.push(piece_type_obj);
      }
      ARR_G_PIECES.push(ARR_G_PIECES_LINE);
      ARR_G_PIECES_LINE = [];
    }
    console.log(ARR_G_PIECES);
  }

  generateJigsawPiece(
    g_offsetX,
    g_offsetY,
    top,
    right,
    bottom,
    left,
    lineWidth,
    fillColorPiece
  ) {
    var g = this.add.graphics();
    g.lineStyle(lineWidth, 0x000000, 1);

    var path = this.add.path();
    var g_vec1, g_vec2, line1, line2;
    const startPoint = 4 / 10,
      endPoint = 6 / 10,
      controlPoint_1 = 3 / 10,
      controlPoint_2 = 5 / 10,
      controlPoint_3 = 7 / 10;

    var curve, curve_p1, curve_p2, curve_p3, curve_p4, curve_p5;

    if (top == 0) {
      g_vec1 = new Phaser.Math.Vector2(g_offsetX, g_offsetY);
      g_vec2 = new Phaser.Math.Vector2(g_offsetX + PIECE_W, g_offsetY);

      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);
    } else {
      g_vec1 = new Phaser.Math.Vector2(g_offsetX, g_offsetY);
      g_vec2 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * startPoint,
        g_offsetY
      );
      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);

      g_vec1 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * endPoint,
        g_offsetY
      );
      g_vec2 = new Phaser.Math.Vector2(g_offsetX + PIECE_W, g_offsetY);
      line2 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line2);

      // the variable "top" permits reverse the socket bcz it multiplies by 1 or -1
      curve_p1 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * startPoint,
        g_offsetY
      );
      curve_p2 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * controlPoint_1,
        g_offsetY - (top * RADIUS_PIECE) / 2
      );
      curve_p3 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * controlPoint_2,
        g_offsetY - top * RADIUS_PIECE
      );
      curve_p4 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * controlPoint_3,
        g_offsetY - (top * RADIUS_PIECE) / 2
      );
      curve_p5 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * endPoint,
        g_offsetY
      );

      curve = new Phaser.Curves.Spline([
        curve_p1,
        curve_p2,
        curve_p3,
        curve_p4,
        curve_p5,
      ]);
      path.add(curve);
    }

    if (right == 0) {
      g_vec1 = new Phaser.Math.Vector2(g_offsetX + PIECE_W, g_offsetY);
      g_vec2 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W,
        g_offsetY + PIECE_H
      );

      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);
    } else {
      g_vec1 = new Phaser.Math.Vector2(g_offsetX + PIECE_W, g_offsetY);
      g_vec2 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W,
        g_offsetY + PIECE_H * startPoint
      );
      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);

      curve_p1 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W,
        g_offsetY + PIECE_H * startPoint
      );
      curve_p2 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W + (right * RADIUS_PIECE) / 2,
        g_offsetY + PIECE_H * controlPoint_1
      );
      curve_p3 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W + right * RADIUS_PIECE,
        g_offsetY + PIECE_H * controlPoint_2
      );
      curve_p4 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W + (right * RADIUS_PIECE) / 2,
        g_offsetY + PIECE_H * controlPoint_3
      );
      curve_p5 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W,
        g_offsetY + PIECE_H * endPoint
      );

      curve = new Phaser.Curves.Spline([
        curve_p1,
        curve_p2,
        curve_p3,
        curve_p4,
        curve_p5,
      ]);
      path.add(curve);

      g_vec1 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W,
        g_offsetY + PIECE_H * endPoint
      );
      g_vec2 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W,
        g_offsetY + PIECE_H
      );
      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);
    }

    if (bottom == 0) {
      g_vec1 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W,
        g_offsetY + PIECE_H
      );
      g_vec2 = new Phaser.Math.Vector2(g_offsetX, g_offsetY + PIECE_H);

      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);
    } else {
      g_vec1 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W,
        g_offsetY + PIECE_H
      );
      g_vec2 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * endPoint,
        g_offsetY + PIECE_H
      );
      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);

      curve_p1 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * endPoint,
        g_offsetY + PIECE_H
      );
      curve_p2 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * controlPoint_3,
        g_offsetY + PIECE_H + (bottom * RADIUS_PIECE) / 2
      );
      curve_p3 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * controlPoint_2,
        g_offsetY + PIECE_H + bottom * RADIUS_PIECE
      );
      curve_p4 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * controlPoint_1,
        g_offsetY + PIECE_H + (bottom * RADIUS_PIECE) / 2
      );
      curve_p5 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * startPoint,
        g_offsetY + PIECE_H
      );

      curve = new Phaser.Curves.Spline([
        curve_p1,
        curve_p2,
        curve_p3,
        curve_p4,
        curve_p5,
      ]);
      path.add(curve);

      g_vec1 = new Phaser.Math.Vector2(
        g_offsetX + PIECE_W * startPoint,
        g_offsetY + PIECE_H
      );
      g_vec2 = new Phaser.Math.Vector2(g_offsetX, g_offsetY + PIECE_H);

      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);
    }

    if (left == 0) {
      g_vec1 = new Phaser.Math.Vector2(g_offsetX, g_offsetY + PIECE_H);
      g_vec2 = new Phaser.Math.Vector2(g_offsetX, g_offsetY);
      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);
    } else {
      g_vec1 = new Phaser.Math.Vector2(g_offsetX, g_offsetY + PIECE_H);
      g_vec2 = new Phaser.Math.Vector2(
        g_offsetX,
        g_offsetY + PIECE_H * endPoint
      );
      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);

      curve_p1 = new Phaser.Math.Vector2(
        g_offsetX,
        g_offsetY + PIECE_H * endPoint
      );
      curve_p2 = new Phaser.Math.Vector2(
        g_offsetX - (left * RADIUS_PIECE) / 2,
        g_offsetY + PIECE_H * controlPoint_3
      );
      curve_p3 = new Phaser.Math.Vector2(
        g_offsetX - left * RADIUS_PIECE,
        g_offsetY + PIECE_H * controlPoint_2
      );
      curve_p4 = new Phaser.Math.Vector2(
        g_offsetX - (left * RADIUS_PIECE) / 2,
        g_offsetY + PIECE_H * controlPoint_1
      );
      curve_p5 = new Phaser.Math.Vector2(
        g_offsetX,
        g_offsetY + PIECE_H * startPoint
      );

      curve = new Phaser.Curves.Spline([
        curve_p1,
        curve_p2,
        curve_p3,
        curve_p4,
        curve_p5,
      ]);
      path.add(curve);

      g_vec1 = new Phaser.Math.Vector2(
        g_offsetX,
        g_offsetY + PIECE_H * startPoint
      );
      g_vec2 = new Phaser.Math.Vector2(g_offsetX, g_offsetY);
      line1 = new Phaser.Curves.Line(g_vec1, g_vec2);
      path.add(line1);
    }

    path.draw(g);

    // FILL PATH
    var points = path.getPoints();
    //g.fillStyle(0x4b86b4, 0.95);
    g.fillStyle(0x696969, 1);
    g.fillStyle(fillColorPiece, 1);
    g.fillPoints(points);

    return g;
  }

  scaleImageToFitFrame(maxWidth, maxHeight, imgObj) {
    console.log("Image width needs to fit %d", maxWidth);
    console.log("Image height needs to fit %d", maxHeight);

    var { maxScaleWidth, maxScaleHeight } = 1;
    // find scale width interval
    maxScaleWidth = maxWidth / imgObj.width;
    // find scale height interval
    maxScaleHeight = maxHeight / imgObj.height;

    console.log("scaling...");
    console.log("Width scale values %f", maxScaleWidth);
    console.log("Height scale values %f", maxScaleHeight);
    var newScaleValue = Math.min(
      maxScaleWidth.toFixed(3),
      maxScaleHeight.toFixed(3)
    );
    console.log("value new scale " + newScaleValue);
    IMG_SCALE_VALUE = newScaleValue;

    imgObj
      .setScale(newScaleValue)
      .setSize(
        Math.floor(imgObj.width * newScaleValue),
        Math.floor(imgObj.height * newScaleValue)
      );

    //center img
    console.log("updated");
    console.log(imgObj.width);
    console.log(imgObj.height);

    // WIDTH = imgObj.width;
    // HEIGHT = imgObj.height;

    return imgObj;
  }
}
