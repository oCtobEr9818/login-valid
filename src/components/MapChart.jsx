import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const markers = [
  {
    markerOffset: { x: -28, y: -14 },
    markerColor: "#f00",
    name: "彰化",
    coordinates: [120.3, 23.7],
  },
  {
    markerOffset: { x: 28, y: -5 },
    markerColor: "#f00",
    name: "花蓮",
    coordinates: [121.5, 23.7],
  },
];

const MapChart = () => {
  const taiwanCenter = [120.982, 23.973];

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: taiwanCenter,
          scale: 5000,
        }}
        className="w-full h-full m-auto z-10"
      >
        <Geographies geography="/gadm41_TWN.json">
          {({ geographies }) =>
            geographies.map((geo) => (
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
                  },
                }}
              />
            ))
          }
        </Geographies>

        {markers.map(({ name, coordinates, markerOffset, markerColor }) => (
          <Marker key={name} coordinates={coordinates}>
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
            <text
              textAnchor="middle"
              x={markerOffset.x}
              y={markerOffset.y}
              style={{
                fontFamily: "Arial",
                fill: "#5D5A6D",
                cursor: "pointer",
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </>
  );
};

export default MapChart;
