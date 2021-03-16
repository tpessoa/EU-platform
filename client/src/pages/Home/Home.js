import React from "react";
import HeroSection from "../../components/HeroSection";
import { homePageObjOne } from "./Data";

const Home = () => {
  return (
    <>
      <HeroSection hero={homePageObjOne} />
    </>
  );
};

export default Home;
