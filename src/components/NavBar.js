import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { NavLink, Link } from 'react-router-dom';

const NavBar = () => {
    return (
      <>
        <Navbar expand="lg" className={`bg-body-tertiary ${styles.darkNavbar}`} bg="dark" data-bs-theme="dark">
        <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={`flex-column ${styles.fullWidthNav}`}>
                <Link to="/" className={styles.picagramLogo}><Navbar.Brand className={styles.picagramLogo}><i class="fa-solid fa-camera-retro"></i> Picagram</Navbar.Brand></Link>
                <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/"><i class="fa-solid fa-house"></i> Home</NavLink>
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/login"><i class="fa-solid fa-arrow-right-to-bracket"></i> Log In</NavLink>
                <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup"><i class="fa-solid fa-signature"></i> Sign Up</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
      </>
    );
  }

export default NavBar