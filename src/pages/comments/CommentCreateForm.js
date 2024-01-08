import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setPost, setComments, profileImage, profile_id } = props;
  const [content, setContent] = useState("");

  // Handle change in the comment content input
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle form submission to create a new comment
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });

      // Update comments and post after successful comment creation
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));

      // Clear the comment input after submission
      setContent("");
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`} className={styles.AvatarHover}>
            <Avatar src={profileImage} height={30}/>
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="Add comment..."
            as="textarea"
            value={content}
            onChange={handleChange}
            rows={1}
          />
        </InputGroup>
      </Form.Group>
      
      {/* Display the "Publish" button if content is not empty */}
      {content.trim() && (
        <button
        className={`${styles.Button} btn d-block ml-auto`}
        type="submit"
        >
        Publish
        </button>
        )}

    </Form>
  );
}

export default CommentCreateForm;