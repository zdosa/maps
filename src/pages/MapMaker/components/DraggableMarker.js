import React, { createRef } from "react";
import { Marker, Popup } from "react-leaflet";

import Button from "react-bootstrap/Button";

const DraggableMarker = props => {
  const refmarker = createRef();

  const updatePosition = () => {
    const marker = refmarker.current;
    if (marker != null) {
      props.onUpdate(props.id, marker.leafletElement.getLatLng());
    }
  };

  const removeMarker = () => {
    props.onRemove(props.id);
  };

  return (
    <Marker
      draggable
      onDrag={updatePosition}
      position={[props.lat, props.lng]}
      ref={refmarker}
    >
      <Popup>
        <Button onClick={() => removeMarker()}>Remove marker</Button>
      </Popup>
    </Marker>
  );
};

export default DraggableMarker;