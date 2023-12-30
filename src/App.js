import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from './components/NavBar';
import styles from './App.module.css'
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Container className={styles.App} fluid>
      <Row>
        <Col xs={12} lg={3} className={styles.NavCol}><NavBar /></Col>
        <Col xs={12} lg={6} className={styles.MidCol}>
          <Switch>
            <Route exact path="/" render={() => <h1>Home page</h1>} />
            <Route exact path="/login" render={() => <h1>Sign in</h1>} />
            <Route exact path="/signup" render={() => <h1>Sign Up</h1>} />
          </Switch>
        </Col>
        <Col xs={12} lg={3} className="order-3">3 of 3</Col>
      </Row>
    </Container>
  );
}

export default App;
