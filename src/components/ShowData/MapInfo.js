import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { useState } from "react";

function MapInfo({ formap }) {
  const [paikkaname, setpaikkaname] = useState({
    name: "Loading.",
    infected: "Loading.",
    tested: "Loading.",
    population: "Loading.",
  });

  const [zoom, setZoom] = useState(2);
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid grey",
        margin: "10px 0",
      }}
    >
      <button onClick={() => setZoom(zoom + 0.5)}>+</button>
      <button onClick={() => setZoom(zoom - 0.5)}>-</button>
      <ComposableMap
        data-tip={paikkaname}
        projectionConfig={{ scale: 500 }}
        height={150}
        width={150}
      >
        <ZoomableGroup center={[26, 64.6]} zoom={zoom}>
          <Geographies geography={formap}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const NAME = geo.properties.NAMEFIN;
                    const infected = geo.properties.extra.infected;
                    const tested = geo.properties.extra.tested;
                    const population = geo.properties.extra.population;

                    setpaikkaname({
                      name: NAME,
                      infected: infected,
                      tested: tested,
                      population: population,
                    });
                  }}
                  onMouseLeave={() => {
                    setpaikkaname("");
                  }}
                  style={{
                    backgroundColor: "#000000",
                    default: {
                      fill: "#005995",
                      outline: "none",
                    },
                    hover: {
                      fill: "#c7af6b",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "#000000",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {formap.map((key, index) => (
            <Marker key={index} coordinates={key.properties.cords.coordinates}>
              <text
                textAnchor="middle"
                y={key.properties.cords.markerOffset}
                style={{
                  fill: "#000000",
                  fontWeight: "bold",
                  fontSize: "2px",
                }}
              >
                {key.properties.extra.infected}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {paikkaname.name && (
        <ReactTooltip>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>{paikkaname.name}</div>
            <div style={{ color: "#c7af6b" }}>
              Infected:{paikkaname.infected}
            </div>
            <div style={{ color: "#8bf0ba" }}>Tested:{paikkaname.tested}</div>
            <div style={{ color: "#005995" }}>
              Population:{paikkaname.population}
            </div>
          </div>
        </ReactTooltip>
      )}
    </div>
  );
}

export default MapInfo;
