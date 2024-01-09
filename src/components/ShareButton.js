import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import styles from '../styles/ShareButton.module.css'

// Share modal for sharing posts to other platforms
const ShareModal = ({ isOpen, onClose, shareUrl, title }) => {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Body>
        <div className="text-center">
          <div>
            <FacebookShareButton url={shareUrl} quote={title}>
              <div className={styles.share-button}>
                <i className="fa-brands fa-facebook-f"></i>
              </div>
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={title}>
              <div className={styles.share-button}>
                <i className="fa-brands fa-x-twitter"></i>
              </div>
            </TwitterShareButton>

            <WhatsappShareButton url={shareUrl} title={title}>
              <div className={styles.share-button}>
                <i className="fa-brands fa-whatsapp"></i>
              </div>
            </WhatsappShareButton>

            <Button variant="dark" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal;
