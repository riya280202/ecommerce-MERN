import React from "react";
import { Modal, Button } from "react-bootstrap";

function NewModal(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modelTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons ?
          props.buttons.map((btn, index) => (
            <Button variant={btn.color} onClick={btn.onClick} key={index}>
              {btn.label}
            </Button>
          )) 
          :
          <Button variant="primary" className="btn-sm" onClick={props.onSubmit} {...props}
          style={{backgroundColor:"#333", padding: "5px 15px"}}
          >
          Save
        </Button>
        }
        
      </Modal.Footer>
    </Modal>
  );
}

export default NewModal;
