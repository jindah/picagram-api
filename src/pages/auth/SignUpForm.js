import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import Login from "../../assets/login.png";

import Image from "react-bootstrap/Image";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect.js";

const SignUpForm = () => {
  // Redirect the user if already logged in
  useRedirect('loggedIn')
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  // Handle form input changes
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/login");
    } catch (err) {
      // Handle registration errors and display error messages
      setErrors(err.response?.data);
    }
  };

  return (
<Container fluid className={styles.Container}>
  <Row className="justify-content-center align-items-center">
    <Col xs={12} md={6} className="text-center">
      <Image src={Login} className={styles.LoginImg} />
    </Col>

    {/* Column containing the sign-up form */}
    <Col xs={12} md={6}>
    <Row className={`justify-content-center ${styles.Row}`}>
      <Col>
      <h1 className={styles.Header}>Sign Up</h1>
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
              <Form.Group controlId="password1">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password1?.map((message, idx) => (
                <Alert key={idx} variant="dark" className="text-center">
                  {message}
                </Alert>
              ))}

              {/* Confirm password input */}
              <Form.Group controlId="password2">
                <Form.Label className="d-none">Confirm password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                />
              </Form.Group>
              {errors.password2?.map((message, idx) => (
                <Alert key={idx} variant="dark" className="text-center">
                  {message}
                </Alert>
              ))}

              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                type="submit"
              >
                Sign up
              </Button>
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="dark" className="mt-3 text-center">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>

          {/* Container for the sign-in link */}
          <Container className="mt-3">
            <Link className={styles.Link} to="/login">
              Already have an account? <span>Sign in</span>
            </Link>
          </Container>
        </Col>
      </Row>
    </Col>
  </Row>
</Container>
  );
};

export default SignUpForm;