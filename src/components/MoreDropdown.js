import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ThreeDots = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-ellipsis"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ThreeDots onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want to...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark">
          <div className="text-center">
            <Button
                variant="outline-success"
                size="sm"
                onClick={handleEdit}
                aria-label="edit"
            >
              <i className="fas fa-edit" /> Edit
            </Button>{'  '}{'  '}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleDelete}
              aria-label="delete"
            >
              <i className="fas fa-trash-alt" /> Delete
            </Button>
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
