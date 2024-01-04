import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { ButtonGroup } from 'react-bootstrap';

const ShareModal = ({ isOpen, onClose, shareUrl, title }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Body>
        <ButtonGroup>
            <FacebookShareButton url={shareUrl} quote={title}>
            <Button variant="dark">
            <i className="fa-brands fa-facebook-f"></i>Facebook</Button>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
            <Button variant="dark">
            <i className="fa-brands fa-x-twitter"></i>X</Button>
            </TwitterShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
            <Button variant="dark">
            <i className="fa-brands fa-whatsapp"></i>Whatsapp</Button>
            </WhatsappShareButton>
            <Button variant="dark" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>Close
            </Button>
        </ButtonGroup>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;