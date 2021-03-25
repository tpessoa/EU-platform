# DATA MODELING

## GAMES

Game document schema

{

    _id: ObjectId('ABC')
    game_ref_id: Number
    game_ref_name: String
    title: String
    description: String
    age: Array
    difficulty: String
    assets: {
      images: {
        image_1: ObjectId('IMG1')
        ...
      },
      sounds: {
        sound_1: ObjectId('SOUND1')
        ...
      }
    }
    config: {
      ...
      (each game has its own configuration)
      ...
    }

}

## Images

image document schema

{

      _id: ObjectId('IMG1')
      image_ref_id: String
      path: String

}

## Sounds

Sound document schema

{

    _id: ObjectId('SOUND1')
    sound_ref_id: String
    path: String

}

## Categories

Categorie document schema

> videos make sense to be embedded because they won't be utilized in other part of the platform.

{

    _id: ObjectId('VIDEO1')
    title: String
    description: String
    img: ObjectId('IMG_CAT')
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

## Poll

### Assets and Config description for each game

    {
      assets: {}
      config: {}
    }

#### Color Game

    assets: {
      images: {
        colored_img: ObjectId('IMGX')
        blank_img: ObjectId('IMGY')
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
        final_img: ObjectId('IMGX')
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
          audio: ObjectId('SOUNDXYZ') || null
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
