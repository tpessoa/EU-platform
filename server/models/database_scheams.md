# DATA MODELING

## GAMES

Game document schema

    {
      _id: ObjectId('ABC')
      game_ref_id: Number
      game_ref_name: String
      title: String
      description: String
      age: {
        min: Number,
        max: NUmber,
      }
      difficulty: String
      assets: {
        images: {
          image_1: {
            id: String
            path: String
          }
          ...
        },
        sounds: {
          sound_1: {
            id: String
            path: String
          }
          ...
        }
      }
      config: {
        ...
        (each game has its own configuration)
        ...
      }
    }

## Categories

Categorie document schema

    {
      _id: ObjectId('VIDEO1')
      title: String
      description: String
      img: {
        id: String
        path: String
      }
      videos: [
        {
          title: String
          description: String
          url: String
        },
        ...
      ]
      reverse: boolean
    }

## Book

    {
      _id: ObjectId('BOOK')
      title: String
      description: String
      pages: [
        {
          image: {
            id: String
            path: String
          }
          audio: {
            id: String
            path: String
          }
        },
        ...
      ]
    }

## Poll

    {
      _id: ObjectId('CAT')
      category_ref_id: Number
      category_ref_name: String
      title: String
      description: String
      works: [
        {
          author: String
          title: String
          description: String
          image: {
            id: String
            path: String
          }
        },
        ...
      ]
    }

### Games ID and name reference

>

    game_ref_id: 1
    game_ref_name: colorGame

>

    game_ref_id: 2
    game_ref_name: puzzle

>

    game_ref_id: 3
    game_ref_name: quiz

>

    game_ref_id: 4
    game_ref_name: wordSearch

>

    game_ref_id: 5
    game_ref_name: memory

>

### Assets and Config description for each game

    {
      assets: {}
      config: {}
    }

#### Color Game

    assets: {
      images: {
        colored_img: {
            id: String
            path: String
        }
        blank_img: {
            id: String
            path: String
        }
      }
    }
    config: {
      colors: [
        0: "red"
        1: "green"
        2: "blue"
        ...
      ]
    }

> minimum of 7 colors

#### Puzzle

    assets: {
      images: {
        final_img: {
            id: String
            path: String
          }
      }
    }
    config: {
      pieces_size: Number
    }

#### Quiz

    assets: {
      images: {}
    }
    config: {
      questions: [
        {
          question: String
          answers: [
            0: String,
            1: String,
            2: String,
            3: String,
          ]
          justification: String
          right_answer: 2
          audio: {
            id: String
            path: String
          } || null
        },
          ...
      ]
      time_to_resp_question: Number || null
      has_audio: Boolean
    }

> minimum of 3 questions and max of 10

#### Word Search

    assets: {
      images: {}
    }
    config: {
      words: [
        0: String
        1: String
        2: String
        3: String
        ...
      ]
      directions: [
        0: String
        ...
      ]
      num_horizontal_cells: Number
      num_vertical_cells: Number
      time_to_complete: Number || null
    }

> directions can be: down, right, right-down, left-down. All simultaneously or individually
