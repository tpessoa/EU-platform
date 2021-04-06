var game;
console.log("open");
window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x2a4d69,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 1024,
      height: 960,
    },
    audio: {
      disableWebAudio: true,
    },
    fps: {
      target: 60,
      min: 30,
      forceSetTimeOut: true,
    },
    scene: [WordSearch],
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
};

var yellow = "0xffcc5c";
var yellow_rgb = "0x75134180";

var SIDE_GAP = 30;

var INPUT_ARR = ["PORTUGAL", "FRANÇA", "ALEMANHA", "BELGICA", "ESPANHA"];

var DIRECTIONS_ARR = ["right", "down", "right-down", "left-down"];
// var DIRECTIONS_ARR = ["down", "right"];

var ascii_uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var WIDTH = 8;
var HEIGHT = 8;
var GRID;
var GRID_EMPTY_CHAR = "*";
var WORDS_INFO = {
  input: [],
  placed: [],
  not_placed: [],
  w_section: [],
  w_container: null,
};
var SELECTION;

var CELL_SIZE = 40;
var CELLS_GAP = 1;
var CELL_ROUNDED_VAL = 0;

var FLAG_INSIDE_GRID = false;
var FIRST_CELL, LAST_CELL;

// X seconds
var time_flag = true;
var mili = 1000;
var MAX_TIME = 5;
var timer_text;
var timedEvent;

var GAME_ID;

var right_guess_sound, finish_game_sound;
class WordSearch extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    GAME_ID = urlParams.get("id");
  }

  async preload() {
    this.load.audio("right_guess", "./assets/sounds/right_guess.mp3");
    this.load.audio("finish_game", "./assets/sounds/finish_game.mp3");

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
    const getFormattedDirections = (arr) => {
      const tempArr = [];
      arr.forEach((elem) => {
        if (elem.checked) {
          tempArr.push(elem.direction.toLowerCase());
        }
      });
      return tempArr;
    };

    const getFormattedWords = (arr) => {
      const tempArr = [];
      arr.forEach((elem) => {
        tempArr.push(elem.toUpperCase());
      });
      return tempArr;
    };

    const config = response.data.config;
    const assets = response.data.assets;

    INPUT_ARR = getFormattedWords(config.words);
    DIRECTIONS_ARR = getFormattedDirections(config.directions);
    WIDTH = config.num_horizontal_cells;
    HEIGHT = config.num_vertical_cells;
    time_flag = config.timer;
    MAX_TIME = config.time_to_complete;

    this.load.on("complete", () => this.createCostum());

    this.load.start();
  }

  createCostum() {
    let s_width = game.scale.width;
    let s_height = game.scale.height;

    /**
     * TOP BAR
     */
    const bar_size_height_value = 0.12;
    var bar_size_height = bar_size_height_value * s_height;
    var main_puzzle_height = (1 - bar_size_height_value) * s_height;

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

    var gameName = this.add.text(
      SIDE_GAP,
      Math.floor(bar_size_height / 2),
      "Sopa de Letras",
      { fontFamily: "Arial Black", fontSize: 32, color: "#4b86b4" }
    );
    gameName.setStroke("#ffcc5c", 10);
    //  Apply the shadow to the Stroke and the Fill (this is the default)
    gameName.setShadow(2, 2, "#333333", 2, true, true);
    gameName.setOrigin(0, 0.5);

    var grid_section = s_width * 0.7;

    /**
     * join spaced words
     */
    WORDS_INFO.input_formatted = this.joinSpacedWordsArr(INPUT_ARR);

    /**
     * WORD GENERATOR
     */
    WORDS_INFO.input.push(INPUT_ARR);
    this.wordSearch(WORDS_INFO.input_formatted, INPUT_ARR);

    // Populate empty GRID cells with alphabet chars
    this.populateGridRndChars(GRID);

    // Modular Cell Size
    this.setCellSize(grid_section, main_puzzle_height);

    /**
     * VISUAL GRID GENERATOR
     */
    var grid_container = this.visualWordSearch(
      grid_section,
      bar_size_height,
      main_puzzle_height
    );
    console.log("Words missing: " + WORDS_INFO.not_placed);

    /**
     * WORDS SECTION
     */
    this.wordsSection(
      grid_section + SIDE_GAP,
      grid_container,
      WORDS_INFO.placed
    );

    /**
     * TIMER
     */
    if (time_flag) {
      var str_tempo = this.add.text(
        SIDE_GAP,
        Math.floor(bar_size_height / 2),
        "Tempo",
        { fontFamily: "Arial Black", fontSize: 24, color: "#4b86b4" }
      );
      str_tempo.setStroke("#ffcc5c", 10);
      //  Apply the shadow to the Stroke and the Fill (this is the default)
      str_tempo.setShadow(2, 2, "#333333", 2, true, true);
      str_tempo.setOrigin(0, 0.5);
      str_tempo.setPosition(
        s_width - str_tempo.width - SIDE_GAP,
        Math.floor(bar_size_height / 4)
      );

      timer_text = this.add.text(0, 0, {
        fontFamily: "Arial",
        fontSize: 30,
        color: "#4b86b4",
      });
      timer_text.setPosition(
        s_width - str_tempo.width / 2 - SIDE_GAP,
        Math.floor(bar_size_height / 2)
      );

      timedEvent = this.time.delayedCall(
        MAX_TIME * mili,
        this.onEvent,
        [],
        this
      );
    }
    console.log(WORDS_INFO);

    right_guess_sound = this.sound.add("right_guess");
    finish_game_sound = this.sound.add("finish_game");
  }

  helpBtnHandler() {
    for (let i = 0; i < WORDS_INFO.w_section.length; i++) {
      if (WORDS_INFO.w_section[i].discovered == false) {
      }
    }
  }

  update() {
    if (time_flag && timer_text) {
      timer_text.setText((MAX_TIME - timedEvent.elapsed / mili).toFixed(0));
    }
  }

  onEvent() {
    console.log("ACABOU O TEMPO");
    this.input.removeAllListeners();
    SELECTION.clear();
  }

  // WORDSEARCH ALGORTIHM FUNCTIONS
  wordSearch(words_arr, words_arr_input) {
    // sort words_arr by the biggest length
    words_arr.sort(function (a, b) {
      return a.length < b.length ? 1 : -1;
    });
    words_arr_input.sort(function (a, b) {
      return a.length < b.length ? 1 : -1;
    });

    GRID = this.createGrid(WIDTH, HEIGHT);
    GRID = this.initGrid(GRID, WIDTH, HEIGHT, GRID_EMPTY_CHAR);
    this.printGrid(GRID, WIDTH, HEIGHT);

    var rnd_direction_pos,
      rnd_direction,
      info_direction,
      rnd_grid_pos,
      grid_pos;

    for (let i = 0; i < words_arr.length; i++) {
      var word_info = {};
      word_info.word = words_arr[i];
      word_info.word_original = words_arr_input[i];
      console.log("start putting the word: " + word_info.word);
      var word_placed = false;

      // array to keep track of the free grid positions that a certain word can occupie
      // in a current time of the words placing
      var grid_free_positions = this.getGridFreePositions(GRID);

      // array with the current directions to explore
      var word_poss_directions = [...DIRECTIONS_ARR];
      while (word_poss_directions.length > 0 && !word_placed) {
        // get random direction
        rnd_direction_pos = this.getRandomProb(word_poss_directions.length);
        rnd_direction = word_poss_directions[rnd_direction_pos];

        // info about the direction
        info_direction = this.wordDirection(rnd_direction);

        // update direction possibilities array
        word_poss_directions = this.removeItemOnce(
          word_poss_directions,
          rnd_direction
        );

        // get the free positions for this word in this direction
        var grid_test_free_positions = [...grid_free_positions];

        // test all possibilites until the word is placed successfully
        while (grid_test_free_positions.length > 0 && !word_placed) {
          // test all possibilites to place the word (in random way)
          rnd_grid_pos = this.getRandomNum(
            0,
            grid_test_free_positions.length - 1
          );
          grid_pos = grid_test_free_positions[rnd_grid_pos];

          if (word_info.word == "PS" && rnd_direction == "down") {
            console.log(grid_pos);
          }

          // define word position coordinates
          word_info.start_x = grid_pos.x;
          word_info.start_y = grid_pos.y;
          word_info.end_x =
            grid_pos.x + info_direction.right * (word_info.word.length - 1);
          word_info.end_y =
            grid_pos.y + info_direction.down * (word_info.word.length - 1);
          word_info.dir = info_direction;

          // verify if the word is to big for the grid in the given position
          if (this.wordInsideGrid(word_info, WIDTH, HEIGHT)) {
            // verify word colision with others words
            // verify if word is placable
            if (!this.wordColision(GRID, word_info)) {
              // place the word
              // update the GRID with the current word
              // update the flag
              GRID = this.placeWord(GRID, word_info);
              word_placed = true;

              // push word_info to words information array
              WORDS_INFO.placed.push(word_info);
            }
          }
          // update the free position track array
          grid_test_free_positions = this.removeItemOnce(
            grid_test_free_positions,
            grid_pos
          );
        }
      }
      if (!word_placed) {
        // console.log("Didn't put " + word_info.word);
        WORDS_INFO.not_placed.push(word_info.word);
      }
    }
    this.printGrid(GRID, WIDTH, HEIGHT);
  }

  placeWord(grid, word_info) {
    let type = word_info.dir.type;
    let startX = word_info.start_x;
    let startY = word_info.start_y;
    for (let i = 0; i < word_info.word.length; i++) {
      if (type == "down") {
        grid[startY + i][startX] = word_info.word[i];
      } else if (type == "right") {
        grid[startY][startX + i] = word_info.word[i];
      } else if (type == "right-down") {
        grid[startY + i][startX + i] = word_info.word[i];
      } else if (type == "left-down") {
        grid[startY + i][startX - i] = word_info.word[i];
      }
    }
    return grid;
  }

  wordColision(grid, word_info) {
    let flagOverlap = false,
      startX = word_info.start_x,
      startY = word_info.start_y,
      type = word_info.dir.type,
      current_char;

    for (let i = 0; i < word_info.word.length; i++) {
      if (type == "right") {
        current_char = grid[startY][startX + i];
      } else if (type == "down") {
        current_char = grid[startY + i][startX];
      } else if (type == "right-down") {
        current_char = grid[startY + i][startX + i];
      } else if (type == "left-down") {
        current_char = grid[startY + i][startX - i];
      }
      // check if the grid in this position is empty
      // AND
      // check if can crossword, if the letter that is colliding with the word is present in the other word
      if (
        current_char != GRID_EMPTY_CHAR &&
        current_char != word_info.word[i]
      ) {
        flagOverlap = true;
      }
    }
    return flagOverlap;
  }

  wordInsideGrid(word_info, num_horizontal_cells, num_vertical_cells) {
    // case DOWN, RIGHT, RIGHT-DOWN
    if (word_info.end_x >= num_horizontal_cells) return false;
    if (word_info.end_y >= num_vertical_cells) return false;

    // case LEFT-DOWN
    if (word_info.end_x < 0) return false;

    return true;
  }

  wordDirection(direction) {
    let down = 0,
      right = 0;

    if (direction == "down") {
      down = 1;
    } else if (direction == "right") {
      right = 1;
    } else if (direction == "right-down") {
      right = 1;
      down = 1;
    } else if (direction == "left-down") {
      right = -1;
      down = 1;
    }
    return {
      right: right,
      down: down,
      type: direction,
    };
  }

  // VISUAL GRID CREATION FUNCTIONS
  visualWordSearch(s_width, bar_size_height, main_puzzle_height) {
    var cell_text = this.add
      .text(0, 0, "*", {
        fontFamily: "Arial",
        fontSize: CELL_SIZE / 1.5,
        color: 0x696969,
        align: "center",
      })
      .setVisible(false);
    var cell_body = this.add.graphics();
    cell_body.fillStyle(0xffffff, 1);
    cell_body.fillRoundedRect(0, 0, CELL_SIZE, CELL_SIZE, CELL_ROUNDED_VAL);
    cell_body.setVisible(false);

    var cell_texture_name, cell_char;
    var grid_container = this.add.container(SIDE_GAP, bar_size_height);
    var grid_w_counter = 0,
      grid_h_counter = 0;

    for (let i = 0; i < HEIGHT; i++) {
      grid_w_counter = 0;
      for (let j = 0; j < WIDTH; j++) {
        var rt = this.add
          .renderTexture(0, 0, CELL_SIZE, CELL_SIZE)
          .setVisible(false);

        // cell char
        cell_char = GRID[i][j];

        // setText
        cell_text.setText(cell_char);
        let cell_text_center_w = Math.floor((CELL_SIZE - cell_text.width) / 2);
        let cell_text_center_h = Math.floor((CELL_SIZE - cell_text.height) / 2);

        rt.draw(cell_body, 0, 0);
        rt.draw(cell_text, cell_text_center_w, cell_text_center_h);

        cell_texture_name = "cell_" + i + "_" + j;
        rt.saveTexture(cell_texture_name);

        var cell_img = this.add.image(
          grid_w_counter,
          grid_h_counter,
          cell_texture_name
        );
        cell_img.setOrigin(0).setInteractive();

        // some logic where to get the cells grids coordinates
        cell_img.setData("char", cell_char);
        cell_img.setData("grid_x", j);
        cell_img.setData("grid_y", i);
        cell_img.on("pointerdown", function (pointer) {
          FIRST_CELL = {
            x: this.getData("grid_x"),
            y: this.getData("grid_y"),
            obj: this,
          };
        });

        cell_img.on("pointerup", function (pointer) {
          LAST_CELL = {
            x: this.getData("grid_x"),
            y: this.getData("grid_y"),
            obj: this,
          };
        });

        grid_w_counter += CELL_SIZE + CELLS_GAP;
        grid_container.add(cell_img);
      }
      grid_h_counter += CELL_SIZE + CELLS_GAP;
    }
    grid_container.setPosition(
      s_width / 2 - grid_w_counter / 2,
      bar_size_height + main_puzzle_height / 2 - grid_h_counter / 2
    );
    grid_container.setData("container_w", grid_w_counter);
    grid_container.setData("container_h", grid_h_counter);

    SELECTION = this.add.graphics();
    var line = new Phaser.Geom.Line();

    var word_strikethrough = this.add.graphics({
      lineStyle: { width: 3, color: yellow, alpha: 0.6 },
    });

    this.input.on("pointerdown", (pointer) =>
      this.lineOriginHandler(pointer, line, SELECTION, grid_container)
    );
    this.input.on("pointermove", (pointer) =>
      this.lineMovingHandler(pointer, SELECTION, line, grid_container)
    );
    this.input.on("pointerup", () =>
      this.lineEndHandler(SELECTION, grid_container, word_strikethrough)
    );

    return grid_container;
  }

  // HANDLERS FUNCTIONS
  lineOriginHandler(pointer, line, graphics, container) {
    // if input is inside grid
    if (!this.inputInsideGrid(pointer, container, false)) return;

    line.setTo(pointer.x, pointer.y, pointer.x, pointer.y);

    graphics.clear();
    graphics.lineStyle(2, yellow);
    graphics.strokeLineShape(line);
  }

  lineMovingHandler(pointer, graphics, line, grid_container) {
    if (
      pointer.isDown &&
      FLAG_INSIDE_GRID &&
      this.inputInsideGrid(pointer, grid_container, true)
    ) {
      // limit inside grid
      line.x2 = pointer.x;
      line.y2 = pointer.y;

      graphics.clear();
      graphics.lineStyle(20, yellow);
      graphics.setAlpha(0.5);
      graphics.strokeLineShape(line);
    }
  }

  lineEndHandler(graphics, container, word_graphics) {
    if (!FLAG_INSIDE_GRID || FIRST_CELL == null || LAST_CELL == null) {
      graphics.clear();
      return;
    }

    var guess = {
      word: "",
      direction: "",
      first_cell_pos: "",
      last_cell_pos: "",
      cells: [],
    };

    // select all the cells that are in between the frist and last cell interval
    guess.frist_cell_pos = container.list.indexOf(FIRST_CELL.obj);
    guess.last_cell_pos = container.list.indexOf(LAST_CELL.obj);
    // corresponds to the grid witdth
    // offset to skip a column in a 1-D array
    let cell_offset = WIDTH;

    // to work for reverse words
    if (guess.frist_cell_pos > guess.last_cell_pos) {
      let temp_cell_pos = guess.last_cell_pos;
      guess.last_cell_pos = guess.frist_cell_pos;
      guess.frist_cell_pos = temp_cell_pos;
    }

    // find the direction of the word
    // DOWN
    if (FIRST_CELL.x == LAST_CELL.x) {
      guess.direction = "down";
      for (
        let i = guess.frist_cell_pos;
        i <= guess.last_cell_pos;
        i += cell_offset
      ) {
        // verify if the chars correspond to the respective word
        guess.word += container.list[i].getData("char");
        guess.cells.push(container.list[i]);
      }
    }
    // RIGHT
    else if (FIRST_CELL.y == LAST_CELL.y) {
      guess.direction = "right";
      for (let i = guess.frist_cell_pos; i <= guess.last_cell_pos; i++) {
        // verify if the chars correspond to the respective word
        guess.word += container.list[i].getData("char");
        guess.cells.push(container.list[i]);
      }
    }
    // RIGHT-DOWN
    else if (FIRST_CELL.x - FIRST_CELL.y == LAST_CELL.x - LAST_CELL.y) {
      guess.direction = "right-down";
      let right_down_offset_counter = 0;
      let right_down_offset_pos = 0;
      for (
        let i = guess.frist_cell_pos;
        i <= guess.last_cell_pos;
        i += cell_offset
      ) {
        // right-down position
        right_down_offset_pos = i + right_down_offset_counter;
        // verify if the chars correspond to the respective word
        guess.word += container.list[right_down_offset_pos].getData("char");
        guess.cells.push(container.list[right_down_offset_pos]);
        right_down_offset_counter++;
      }
    }
    // LEFT-DOWN
    else if (FIRST_CELL.x + FIRST_CELL.y == LAST_CELL.x + LAST_CELL.y) {
      guess.direction = "left-down";

      let left_down_offset_counter = 0;
      let left_down_offset_pos = 0;
      let left_down_offset_last_cell_pos = guess.last_cell_pos;

      for (
        let i = guess.frist_cell_pos;
        i <= left_down_offset_last_cell_pos;
        i += cell_offset
      ) {
        // left-down position
        left_down_offset_pos = i + left_down_offset_counter;
        // verify if the chars correspond to the respective word
        guess.word += container.list[left_down_offset_pos].getData("char");
        guess.cells.push(container.list[left_down_offset_pos]);
        left_down_offset_counter--;
        left_down_offset_last_cell_pos++;
      }
    } else {
      console.log("direction not found");
    }
    console.log("Word Guess: " + guess.word);

    // verify if the word guess exists
    if (this.verifyWordGuess(guess)) {
      console.log("YES!");
      // guess animation
      // change cell color
      for (let i = 0; i < guess.cells.length; i++) {
        guess.cells[i].setTint(yellow);
      }
      // scribe the respective word
      for (let i = 0; i < WORDS_INFO.w_section.length; i++) {
        let obj = WORDS_INFO.w_section[i].word;
        if (guess.word == this.joinSpacedWord(obj._text)) {
          // set alpha
          obj.alpha = 0.6;

          let line = new Phaser.Geom.Line(
            0,
            obj.y + obj.height / 2,
            obj.width,
            obj.y + obj.height / 2
          );
          word_graphics.strokeLineShape(line);

          WORDS_INFO.w_container.add(word_graphics);
          WORDS_INFO.w_section[i].discovered = true;

          right_guess_sound.play();

          break;
        }
      }
      // guess sound

      // END GAME
      if (this.verifyGameEnd(WORDS_INFO.w_section)) {
        console.log("end");

        finish_game_sound.play();
      }
    }
    graphics.clear();
  }

  verifyGameEnd(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].discovered) return false;
    }
    return true;
  }

  verifyWordGuess(guess) {
    var flag_right_guess = false;
    var arr = WORDS_INFO.placed;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].dir.type == guess.direction) {
        // correct word
        if (arr[i].word == guess.word) flag_right_guess = true;
        // reverse word
        else if (arr[i].word == this.reverseString(guess.word))
          flag_right_guess = true;
      }
    }
    if (flag_right_guess) {
      // remove word, etc, etc
      return true;
    }
    return false;
  }

  // WORDS SELECTION FUNCTIONS
  wordsSection(start_x, grid_container, grid_words) {
    // container with words
    WORDS_INFO.w_container = this.add.container(
      Math.floor(start_x),
      Math.floor(grid_container.y)
    );
    var word_height_container_counter = 0;

    var grid_words_arr = [...grid_words];
    // shuffle the grid words array;
    grid_words_arr = this.shuffleArray(grid_words_arr);

    for (let i = 0; i < grid_words_arr.length; i++) {
      let word_in_words_container = this.add.text(
        0,
        word_height_container_counter,
        grid_words_arr[i].word_original,
        {
          fontFamily: "Arial",
          fontSize: Math.floor(CELL_SIZE / 2),
          color: "#FFFFFF",
        }
      );
      word_in_words_container.setOrigin(0, 0);
      word_height_container_counter += Math.floor(CELL_SIZE / 1.5);

      WORDS_INFO.w_section.push({
        word: word_in_words_container,
        discovered: false,
      });

      WORDS_INFO.w_container.add(word_in_words_container);
    }
  }

  // GRID FUNCTIONS
  createGrid(width, height) {
    var grid = new Array(height);
    for (let i = 0; i < height; ++i) {
      grid[i] = new Array(width);
    }
    return grid;
  }

  initGrid(grid, width, height, value) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        grid[i][j] = value;
      }
    }
    return grid;
  }

  printGrid(grid, width, height) {
    let str = "";
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        str += grid[i][j] + " ";
      }
      str += "\n";
    }
    console.log("printing word puzzle grid\n\n" + str);
  }

  getGridFreePositions(arr) {
    let obj_arr = [];
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        if (arr[i][j] == GRID_EMPTY_CHAR) {
          obj_arr.push({ x: j, y: i });
        }
      }
    }
    return obj_arr;
  }

  populateGridRndChars(grid) {
    for (let i = 0; i < HEIGHT; i++) {
      for (let j = 0; j < WIDTH; j++) {
        if (grid[i][j] == GRID_EMPTY_CHAR) {
          grid[i][j] = this.randomCharFromStr(ascii_uppercase);
        }
      }
    }
  }

  inputInsideGrid(pointer, container, moving) {
    if (
      pointer.x >= container.x &&
      pointer.x <= container.x + container.getData("container_w") &&
      pointer.y >= container.y &&
      pointer.y <= container.y + container.getData("container_h")
    ) {
      if (!moving) FLAG_INSIDE_GRID = true;
      return true;
    }
    // if (pointer >= GRID_OBJ.grid_visual.x && )
    if (!moving) FLAG_INSIDE_GRID = false;
    return false;
  }

  // UTILS FUNCTIONS
  setCellSize(visual_words_grid_width, visual_words_grid_height) {
    var temp_cell_size_h, temp_cell_size_w;
    var total_cell_size_h = (visual_words_grid_height - 2 * SIDE_GAP) / HEIGHT;
    temp_cell_size_h = total_cell_size_h - CELLS_GAP;

    var total_cell_size_w = (visual_words_grid_width - 2 * SIDE_GAP) / WIDTH;
    temp_cell_size_w = total_cell_size_w - CELLS_GAP;

    CELL_SIZE = Math.min(temp_cell_size_w, temp_cell_size_h);

    //if (CELL_SIZE > 50) CELL_SIZE = 50;
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  getRandomNum(min, max) {
    return Math.floor(Math.random() * (max + 1)) + min;
  }

  getRandomProb(length) {
    var num = Math.random();
    // 4 directions
    if (length == 4) {
      if (num < 0.4) return 0;
      //probability 0.40
      else if (num < 0.8) return 1;
      // probability 0.40
      else if (num < 0.9) return 2;
      //probability 0.10
      else return 3; //probability 0.10
    }
    // 3 directions
    else if (length == 3) {
      if (num < 0.45) return 0;
      //probability 0.45
      else if (num < 0.9) return 1;
      // probability 0.45
      else return 2; //probability 0.10
    }
    // 2 directions
    else if (length == 2) {
      if (num < 0.5) return 0;
      //probability 0.5
      else return 1; //probability 0.5
    } else {
      return 0;
    }
  }

  reverseString(str) {
    let newString = "";
    for (let i = str.length - 1; i >= 0; i--) {
      newString += str[i];
    }
    return newString;
  }

  randomCharFromStr(str) {
    return str[this.getRandomNum(0, str.length - 1)];
  }

  joinSpacedWordsArr(words_arr) {
    let temp_arr = [...words_arr];
    for (let i = 0; i < temp_arr.length; i++) {
      temp_arr[i] = this.joinSpacedWord(temp_arr[i]);
    }
    return temp_arr;
  }

  joinSpacedWord(word) {
    return word.split(" ").join("");
  }
}

// var color = 0xffcc5c;
// var thickness = 2;
// var alpha = 1;
// SELECTION.lineStyle(thickness, color, alpha);

// //  Events
// var draw = false;
// var initial_x, initial_y;
// this.input.on('pointerdown', function (pointer) {
//     draw = true;
//     initial_x = pointer.x;
//     initial_y = pointer.y;

// });

// this.input.on('pointerup', function () {
//     draw = false;
// });

// this.input.on('pointermove', function (pointer) {
//     if (draw) {
//         selection.clear();
//         //
//         // selection.strokeRoundedRect(pointer.downX, pointer.downY, pointer.x - pointer.downX, pointer.y - pointer.downY, CELL_SIZE / 4);
//         selection.lineTo(pointer.x, pointer.y);
//     }
// });
