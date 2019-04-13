import React, { createRef } from "react";
import { Marker } from "react-leaflet";

const DraggableMarker = props => {
  const refmarker = createRef();

  const updatePosition = () => {
    const marker = refmarker.current;
    if (marker != null) {
      props.onUpdate(props.id, marker.leafletElement.getLatLng());
    }
  };

  return (
    <Marker
      draggable
      onDrag={updatePosition}
      position={[props.lat, props.lng]}
      ref={refmarker}
    />
  );
};

export default DraggableMarker;