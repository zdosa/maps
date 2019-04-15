import React from "react";
import Control from "react-leaflet-control";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Spinner from "react-bootstrap/Spinner";

const MapMenu = props => {
  return (
    <Control position="topleft">
      <ButtonGroup toggle vertical>
        {props.loading ? (
            <Spinner variant="primary" animation="border" className="mr-3" />
          ) : (
            <ToggleButton
              type="checkbox"
              checked={props.editing}
              onChange={props.toggleEditRoute}
            >
              {props.editing ? <span>Stop editing</span> : <span>Edit route</span>}
            </ToggleButton>
          )
        }
      </ButtonGroup>
    </Control>
  );
};

export default MapMenu;