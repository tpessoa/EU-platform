import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = (props) => {
  const { setCountry } = props;
  const { path, url } = useRouteMatch();
  return (
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
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              onMouseDown={() => {
                const { ISO_A3 } = geo.properties;
                setCountry(ISO_A3);
                // setCountry("sdf");
              }}
              style={{
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
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
