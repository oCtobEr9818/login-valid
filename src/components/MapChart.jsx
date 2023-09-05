import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

import { markers } from "./markers";

const MapChart = () => {
  const taiwanCenter = [120.982, 23.973];
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerHover = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMarkerLeave = () => {
    setSelectedMarker(null);
  };

  const getInfoCardPosition = (coordinates) => {
    const [x, y] = coordinates;
    const xOffset = x > taiwanCenter[0] ? 150 : -20;
    const yOffset = y > taiwanCenter[1] ? -120 : -20;
    return { x: x + xOffset, y: y + yOffset };
  };

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: taiwanCenter,
          scale: 6000,
        }}
        className="w-full m-auto z-10"
      >
        <ZoomableGroup center={taiwanCenter} zoom={1}>
          <Geographies geography="/gadm41_TWN.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <>
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#aaa" // 縣市框線顏色
                    style={{
                      default: {
                        fill: "#EAEAEC",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#04D",
                        outline: "none",
                      },
                      hover: {
                        fill: "#0AD",
                        outline: "none",
                        cursor: "pointer",
                        opacity: "0.5",
                        stroke: "#000",
                      },
                    }}
                  />
                </>
              ))
            }
          </Geographies>

          {markers.map(
            ({ route, name, coordinates, markerOffset, markerColor }) => (
              <Marker
                key={name}
                coordinates={coordinates}
                onMouseEnter={() => {
                  handleMarkerHover(name);

                  markers.forEach((marker) => {
                    if (marker.name === name) {
                      marker.markerColor = "#0AD";
                    }
                  });
                }}
                onMouseLeave={() => {
                  handleMarkerLeave();

                  markers.forEach((marker) => {
                    if (marker.name === name) {
                      marker.markerColor = "#f00";
                    }
                  });
                }}
              >
                <Link to={route}>
                  {/* 紅色標記點 */}
                  <g
                    fill="none"
                    stroke={markerColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-12, -24)"
                    cursor="pointer"
                  >
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                  </g>
                  {/* 案場名稱 */}
                  <text
                    textAnchor="middle"
                    x={markerOffset.x}
                    y={markerOffset.y}
                    style={{
                      fontFamily: "Arial",
                      fill: "#fcfcfc",
                      cursor: "pointer",
                    }}
                  >
                    {name}
                  </text>
                </Link>
              </Marker>
            )
          )}

          {/* 懸停在標記點或地名的卡片資訊 */}
          {selectedMarker &&
            markers.map(
              ({
                id,
                name,
                projectName,
                coordinates,
                cardCoordinates,
                textOutline,
              }) =>
                name === selectedMarker && (
                  <>
                    <g
                      key={id}
                      transform={`translate(${
                        getInfoCardPosition(coordinates).x
                      },${getInfoCardPosition(coordinates).y})`}
                    >
                      {/* 卡片外框 */}
                      <rect
                        width="150"
                        height="150"
                        x={cardCoordinates.outterBackground.x}
                        y={cardCoordinates.outterBackground.y}
                        fill="#000"
                        clipPath={cardCoordinates.clipPath.attribute}
                      />
                      {/* 卡片白色內頁 */}
                      <rect
                        width="147"
                        height="146"
                        x={cardCoordinates.innerBackground.x}
                        y={cardCoordinates.innerBackground.y}
                        fill="#fff"
                        clipPath={cardCoordinates.clipPath.attribute}
                      />
                      {/* 卡片標題 */}
                      <text
                        x={cardCoordinates.text.x}
                        y={cardCoordinates.text.y}
                        fill="#333"
                        fontSize="12"
                        fontWeight="700"
                      >
                        {projectName}
                      </text>
                      {/* 分隔線 */}
                      <line
                        x1={cardCoordinates.line.xStart}
                        y1={cardCoordinates.line.yStart}
                        x2={cardCoordinates.line.xEnd}
                        y2={cardCoordinates.line.yEnd}
                        stroke="#333"
                        strokeWidth="1"
                      />
                      {/* 卡片圖片 */}
                      <image
                        x={cardCoordinates.image.x}
                        y={cardCoordinates.image.y}
                        width="130"
                        height="90"
                        xlinkHref={cardCoordinates.image.urL}
                      />
                      {/* 地標外框 */}
                    </g>
                    <rect
                      x={textOutline.x}
                      y={textOutline.y}
                      width={textOutline.width}
                      height="25"
                      stroke="#fcfcfc"
                      fill="none"
                      strokeWidth="1"
                      rx="5"
                    />
                  </>
                )
            )}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default MapChart;
