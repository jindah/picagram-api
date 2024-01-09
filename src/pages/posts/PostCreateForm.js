import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function PostCreateForm() {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    content: "",
    image: "",
  });
  const { content, image } = postData;

  const imageInput = useRef(null);
  const history = useHistory();

  // Function to handle form field changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to handle image input changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Append content and image data to the FormData object
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      history.push(`/posts/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  // JSX for the text fields section
  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label className="d-none">Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          placeholder="Write a caption..."
          value={content}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button}`}
        onClick={() => history.goBack()}
      ><i className="fa-solid fa-xmark"></i> Cancel</Button>
      <Button className={`${btnStyles.Button}`} type="submit">
      <i className="fa-solid fa-circle-plus"></i>Share
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Container
            className={`${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    {/* Display the selected image */}
                    <Image
                        className={appStyles.Image}
                        src={image}
                        rounded
                    />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                // Display the upload button and message when no image is selected
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              {/* Input element for selecting an image */}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                className={styles.hiddenInputButton}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
        </Container>
      </Col>
    </Row>
    <Container className={appStyles.Content}>{textFields}</Container>
  </Form>
);
}

export default PostCreateForm;