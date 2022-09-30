import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import _ from "lodash";

const MyComponent = ({
  listGeofences,
  loadingGeofences,
  bounds,
  onSetName,
}) => {
  const [polygon, setPolygon] = useState([]);
  const map = useMap();

  const outerHandlers = useMemo(
    () => ({
      click(e) {
        const pol = !loadingGeofences
          ? listGeofences.filter(
              (l) =>
                l.polygons[0][0][0][0] === e.target._latlngs[0][0][0]["lat"]
            )
          : null;
        console.log(pol);
        setPolygon(e.target._latlngs);
        map.fitBounds(e.target._latlngs);
        onSetName(pol[0]);
      },
    }),
    [map]
  );

  useEffect(() => {
    if (bounds.length !== 0) {
      map.fitBounds(bounds);
      setPolygon(bounds);
    }
    if (bounds.length === 0) {
      const def = map.getBounds();
      map.fitBounds(def);
      map.flyTo(listGeofences[0].polygons[0][0][0], 11);
      setPolygon([]);
    }
  }, [map, bounds]);

  return (
    <>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {!loadingGeofences &&
        listGeofences?.map((item, index) => {
          return (
            <Polygon
              pathOptions={
                polygon.length !== 0
                  ? item.polygons[0][0][0][0] === polygon[0][0][0]["lat"] ||
                    item.polygons[0][0][0][0] === polygon[0][0][0][0]
                    ? { color: "red" }
                    : { color: "green" }
                  : { color: "green" }
              }
              positions={item.polygons}
              key={index}
              eventHandlers={outerHandlers}
            />
          );
        })}
    </>
  );
};

const ReportMap = ({
  listGeofences,
  loadingGeofences,
  bounds,
  onSetName,
}) => {
  return (
    <>
      {listGeofences.length === 0 ? (
        <MapContainer
          center={[61.52, 95.31]}
          zoom={3}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      ) : (
        !loadingGeofences && listGeofences && listGeofences?.length !== 0 ? 
        <MapContainer
          center={listGeofences[0].polygons[0][0][0]}
          zoom={11}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          {!loadingGeofences && (
            <MyComponent
              {...{ listGeofences, loadingGeofences, bounds, onSetName }}
            />
          )}
        </MapContainer>
        :
        null
      )}
    </>
  );
};

export default ReportMap;
