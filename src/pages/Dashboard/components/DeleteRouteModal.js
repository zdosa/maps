import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteRouteModal = props => {
  return (
    <Modal show={props.show} centered onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete route "{props.selectedRoute.name}"</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to delete route?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setShow(false)}>Cancel</Button>
        <Button variant="danger" onClick={props.onDelete(props.selectedRoute.id)}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRouteModal;