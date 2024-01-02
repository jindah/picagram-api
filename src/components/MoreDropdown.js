import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ButtonGroup } from 'react-bootstrap';

const ThreeDots = ({ onClick }) => (
  <i
    className="fa-solid fa-ellipsis"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
);

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
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
              <i className="fa-solid fa-xmark"></i> Close
              </Button>
            </ButtonGroup>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

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
            <Button
              variant="link"
              onClick={() => history.push(`/profiles/${id}/edit`)}
              aria-label="edit-profile"
            >
              <i className="fas fa-edit" /> edit profile
            </Button>
            <Button
              variant="link"
              onClick={() => history.push(`/profiles/${id}/edit/username`)}
              aria-label="edit-username"
            >
              <i className="far fa-id-card" />
              change username
            </Button>
            <Button
              variant="link"
              onClick={() => history.push(`/profiles/${id}/edit/password`)}
              aria-label="edit-password"
            >
              <i className="fas fa-key" />
              change password
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
