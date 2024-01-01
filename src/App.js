import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from './components/NavBar';
import styles from './App.module.css'
import {Route, Switch} from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from "./pages/posts/PostCreateForm";
import NotFound from "./components/NotFound";


function App() {
  return (
    <Container className={styles.App} fluid>
      <Row>
        <Col xs={12} lg={2} className={styles.NavCol}><NavBar /></Col>
        <Col xs={12} lg={7} className={`justify-content-center align-items-center ${styles.MidCol}`}>
          <Switch>
            <Route exact path="/" render={() => <h1>Home page</h1>} />
            <Route exact path="/login" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/posts/create" render={() => <PostCreateForm />} />
            <Route render={() => <NotFound />} />
          </Switch>
        </Col>
        <Col xs={12} lg={3} className="order-3">3 of 3</Col>
      </Row>
    </Container>
  );
}

export default App;
