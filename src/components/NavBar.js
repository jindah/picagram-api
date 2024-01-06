import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { NavLink, Link } from 'react-router-dom';
import { 
  useCurrentUser,
  useSetCurrentUser,
  } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar.js";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle.js";
import { removeTokenTimestamp } from "../utils/utils.js";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      // // console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/feed"
      >
      <i className="fas fa-stream"></i>Feed
      </NavLink>
      
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/liked"
      >
      <i className="fas fa-heart"></i>Liked
      </NavLink>

      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/posts/create"
      >
      <i className="fas fa-plus-square"></i>Add Post
      </NavLink>

      <NavLink
      className={styles.NavLink}
      to="/"
      onClick={handleSignOut}>
      <i className="fas fa-sign-out-alt"></i>Sign Out
      </NavLink>

      <NavLink
      className={styles.NavLink}
      to={`/profiles/${currentUser?.profile_id}`}
      >
      <Avatar src={currentUser?.profile_image} text="Profile" height={30} />
      </NavLink>

    </>
    );
  const loggedOutIcons = (
    <>
      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/login"
      >
      <i className="fa-solid fa-arrow-right-to-bracket"></i> Log In
      </NavLink>

      <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/signup"
      >
      <i className="fa-solid fa-signature"></i> Sign Up
      </NavLink>
    </>
    );
    return (
      <>
        <Navbar expanded={expanded} expand="lg" className={`bg-body-tertiary ${styles.darkNavbar}`} bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className={`flex-column ${styles.fullWidthNav}`}>
                <Link to="/" className={styles.picagramLogo}><Navbar.Brand className={styles.picagramLogo}><i className="fa-solid fa-camera-retro"></i> Picagram</Navbar.Brand></Link>
                <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/"><i className="fa-solid fa-house"></i> Home</NavLink>
                
                {currentUser ? loggedInIcons : loggedOutIcons}
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
      </>
    );
  }

export default NavBar