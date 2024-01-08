import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import { Link, useHistory } from "react-router-dom";
import Login from "../../assets/login.png";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  // Get the setCurrentUser function from the context and redirect the user
  // if aleary logged in.
  const setCurrentUser = useSetCurrentUser();
  useRedirect('loggedIn')

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  // Handle form input changes
  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  return ( 
<Container fluid className={styles.Container}>
  <Row className="justify-content-center align-items-center">
    <Col xs={12} md={6} className="text-center">
      <Image src={Login} className={styles.LoginImg} />
    </Col>

    {/* Column containing the login form */}
    <Col xs={12} md={6}>
      <Row className={`justify-content-center ${styles.Row}`}>
        <Col>
          <h1 className={styles.Header}>Login to Picagram</h1>
          <hr className="my-4" />
        </Col>
      </Row>

      <Row className={`${styles.Row}`}>
        <Col>
          <Container className="justify-content-center text-center">
          <Form onSubmit={handleSubmit}>
            
            {/* Username input */}
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) => (
              <Alert variant="dark" key={idx} className="text-center">
                {message}
              </Alert>
            ))}

            {/* Password input */}
            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) => (
              <Alert key={idx} variant="dark" className="text-center">
                {message}
              </Alert>
            ))}

            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} `}
              type="submit"
            >
              Log In
            </Button>
            {errors.non_field_errors?.map((message, idx) => (
              <Alert key={idx} variant="dark" className="mt-3 text-center">
                {message}
              </Alert>
            ))}
          </Form>
          </Container>
        </Col>
      </Row>

      {/* Row for the sign-up link */}
      <Row className={`${styles.Row}`}>
        <Col>
          <Container className="mt-3">
            <Link className={styles.Link} to="/signup">
              Don't have an account? <span>Sign up now!</span>
            </Link>
          </Container>
        </Col>
      </Row>
    </Col>
  </Row>
</Container>
   );
}

export default SignInForm;