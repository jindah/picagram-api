import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// Component for rendering three dots icon with click handler
const ThreeDots = ({ onClick }) => (
  <i
    className="fa-solid fa-ellipsis"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
);

// Component for a modal with more options (Edit, Delete, Close)
export const MoreModal = ({ handleEdit, handleDelete }) => {
  const [smShow, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ThreeDots onClick={handleShow} />

      <Modal size="sm" show={smShow}  onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <ButtonGroup>
              <Button
                  variant="dark"
                  onClick={handleEdit}
                  aria-label="edit"
              >
                <i className="fas fa-edit" /> Edit
              </Button>
              <Button
                variant="dark"
                onClick={handleDelete}
                aria-label="delete"
              >
                <i className="fas fa-trash-alt" /> Delete
              </Button>
              <Button
                variant="dark"
                onClick={handleClose}
              >
              <i className="fa-solid fa-xmark" /> Close
              </Button>
            </ButtonGroup>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

// Component for a modal with profile editing options
export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ThreeDots onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="text-center">
            <ButtonGroup>
              <Button
                variant="dark"
                onClick={() => history.push(`/profiles/${id}/edit`)}
                aria-label="edit-profile"
              >
                <i className="fas fa-edit" /> Edit profile
              </Button>
              <Button
                variant="dark"
                onClick={() => history.push(`/profiles/${id}/edit/username`)}
                aria-label="edit-username"
              >
                <i className="far fa-id-card" /> Change username
              </Button>
              <Button
                variant="dark"
                onClick={() => history.push(`/profiles/${id}/edit/password`)}
                aria-label="edit-password"
              >
                <i className="fas fa-key" /> Change password
              </Button>
            </ButtonGroup>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
