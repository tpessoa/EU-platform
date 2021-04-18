import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import MapChart from "./MapChart";
import CountryDetails from "./ContryDetails";
import Question from "./Question";

import styled from "styled-components";

import Loading from "../../UI/Loading";
import Error from "../../UI/Error";

const InteractiveMap = () => {
  const [country, setCountry] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // resets when changing the question
  useEffect(() => {
    setCountry(null);
  }, [currentQuestion]);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const gameId = query.get("id");

  const { isLoading, error, data } = useQuery("getInteractiveMapObj", () =>
    axios(`/api/games/game/${gameId}`, {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  // console.log(data.data);
  console.log(country);

  return (
    <Container>
      <MapWrapper>
        <Question
          questions={data.data.config.questions}
          setCurrentQuestion={setCurrentQuestion}
        />
        <MapChart setCountry={setCountry} />
        <CountryDetails country={country} />
      </MapWrapper>
    </Container>
  );
};

export default InteractiveMap;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 80%;
  margin: 2rem;
`;
