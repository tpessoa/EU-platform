import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import styled from "styled-components";

import { countriesData } from "../../../pages/Admin/games/RightAnswersData";
import FeedbackAnswer from "./FeedbackAnswer";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorRightAnswer = {
  default: {
    fill: "#28aa00",
    outline: "none",
  },
  hover: {
    fill: "#28aa00",
    outline: "none",
  },
  pressed: {
    fill: "#28aa00",
    outline: "none",
  },
};
const colorWrongAnswer = {
  default: {
    fill: "#920000",
    outline: "none",
  },
  hover: {
    fill: "#920000",
    outline: "none",
  },
  pressed: {
    fill: "#920000",
    outline: "none",
  },
};

const colorDefault = {
  default: {
    fill: "#D6D6DA",
    outline: "none",
  },
  hover: {
    fill: "#D6D6DA",
    outline: "none",
  },
  pressed: {
    fill: "#D6D6DA",
    outline: "none",
  },
};

const colorPickingCountry = {
  default: {
    fill: "#D6D6DA",
    outline: "none",
  },
  hover: {
    fill: "#F53",
    outline: "none",
  },
  pressed: {
    fill: "#E42",
    outline: "none",
  },
};

const MapChart = (props) => {
  const { currQuestion } = props;
  let mapState;

  // const [userPickedCountry, setUserPickedCountry] = useState(null);
  // const [userRight, setUserRight] = useState(null);
  // const [country, setCountry] = useState(null);

  const [userData, setUserData] = useState({
    pickedCountryCode: null,
    countryName: null,
    userRight: null,
  });

  useEffect(() => {
    setUserData({
      pickedCountryCode: null,
      countryName: null,
      userRight: null,
    });
  }, [currQuestion]);

  const userPickHandler = (country) => {
    const rightAnswerObj = countriesData[currQuestion.right_answer];
    const userCountryNamePT = countriesData.find(
      (elem) => elem.code === country
    );
    // check if the country belongs to EU
    if (!userCountryNamePT) {
      setUserData({
        pickedCountryCode: country,
        countryName: "outside",
        userRight: false,
      });
      return;
    }

    let userRightFlag = false;
    // verify answer
    if (rightAnswerObj.code === country) {
      userRightFlag = true;
    }
    setUserData({
      pickedCountryCode: country,
      countryName: userCountryNamePT.country,
      userRight: userRightFlag,
    });

    // paint the countires by user's pick
  };

  return (
    <Container>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-20.0, -52.0, 0],
          scale: 700,
        }}
      >
        <Graticule stroke="#EAEAEC" />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const { ISO_A3 } = geo.properties;
              // start of the game
              // user needs to activate the game by pressing the button random question
              if (currQuestion) {
                // when the game is active
                if (!userData.pickedCountryCode) {
                  mapState = colorPickingCountry;
                }
                // verify if the country picked by the use is this obj "geo"
                else if (userData.pickedCountryCode === ISO_A3) {
                  if (userData.userRight) {
                    mapState = colorRightAnswer;
                  } else {
                    mapState = colorWrongAnswer;
                  }
                }
                // always paint the correct answer (country) in the color green
                else if (
                  countriesData[currQuestion.right_answer].code === ISO_A3
                ) {
                  mapState = colorRightAnswer;
                }
                // if its not the answer that we are looking for -> default the colors of the countries
                else {
                  mapState = colorDefault;
                }
              } else {
                mapState = colorDefault;
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  // onMouseEnter={() => {}}
                  // onMouseLeave={() => {}}
                  onMouseDown={() => {
                    // if there's already a question picked by the user
                    if (currQuestion && !userData.pickedCountryCode) {
                      userPickHandler(ISO_A3);
                    }
                  }}
                  style={mapState}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <FeedbackWrapper>
        {userData.userRight != null && (
          <FeedbackAnswer
            userAnswer={userData.userRight}
            question={currQuestion}
            userCountry={userData.countryName}
            rightCountry={countriesData[currQuestion.right_answer].country}
          />
        )}
      </FeedbackWrapper>
    </Container>
  );
};

export default MapChart;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 0.5rem;
  position: relative;
`;

const FeedbackWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;
