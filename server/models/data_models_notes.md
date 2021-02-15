# DATA MODELING DATABASE MONGODB
## JOGOS

### Jogo de colorir
#### DOC-1
{
    colors = {
        red: "0xd11141",
        green: "0x00b159",
        blue: "0x00aedb",
        orange: "0xf37735",
        yellow: "0xffc425",
        pink: "0xD130FF",
        cyan: "0x61ffff",
        brown: "0x733F00",
        grey: "0x696969"
    }
}
#### DOC-2
{
    id: 1,
    name: Jogo de Colorir,
    games: {
        title: Bandeira de Portugal
        publish_date: ISODate(...)
        difficulty: easy
        final_image: location of the image
        color_image: location of the image
        colors: [red, green, blue, yellow, ...] (min of 7)
    }
    
}

"images": {
      "flags": {
        "Portugal": {
          "name": "Bandeira de Portugal",
          "src": "tiago/sdfsd/sdfsdf"
        },
        "France": {
          "name": "Bandeira de França",
          "src": "tiago/sdfsd/sdfsdf"
        }
      },
      "animals": {
        "Cat": {
          "name": "Gatinho",
          "src": "tiago/sdfsd/sdfsdf"
        }
      }
    }
