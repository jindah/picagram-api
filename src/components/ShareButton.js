import React from 'react';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

const ShareModal = ({ isOpen, onClose, shareUrl, title }) => {
  return (
    <Modal size="sm" show={isOpen} onHide={onClose}>
      <Modal.Body>
        <div className="text-center">
            <ButtonGroup>
                <FacebookShareButton url={shareUrl} quote={title}>
                <Button variant="dark">
                <i className="fa-brands fa-facebook-f"></i></Button>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                <Button variant="dark">
                <i className="fa-brands fa-x-twitter"></i></Button>
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title={title}>
                <Button variant="dark">
                <i className="fa-brands fa-whatsapp"></i></Button>
                </WhatsappShareButton>
                <Button variant="dark" onClick={onClose}>
                <i className="fa-solid fa-xmark"></i></Button>
            </ButtonGroup>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;