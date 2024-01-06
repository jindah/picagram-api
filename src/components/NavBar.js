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
import { removeTokenTimestamp } from "../utils/utils.js";
import { useMediaQuery } from 'react-responsive';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const isMobile = useMediaQuery({ maxWidth: 767 });

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
      <Link to="/" className={styles.picagramLogo}>
      <Navbar.Brand className={styles.picagramLogo}>
      <i className="fa-solid fa-camera-retro"></i> Picagram
      </Navbar.Brand>
      </Link>

      <NavLink
      exact className={styles.NavLink}
      activeClassName={styles.Active}
      to="/"
      >
      <i className="fa-solid fa-house"></i> Home
      </NavLink>

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
      <Link to="/" className={styles.picagramLogo}>
      <Navbar.Brand className={styles.picagramLogo}>
      <i className="fa-solid fa-camera-retro"></i> Picagram
      </Navbar.Brand>
      </Link>

      <NavLink
      exact className={styles.NavLink}
      activeClassName={styles.Active}
      to="/"
      >
      <i className="fa-solid fa-house"></i> Home
      </NavLink>

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

  const loggedInIconsMobile = (
    <>
      <NavLink
      exact className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/"
      >
      <i className="fa-solid fa-house"></i>
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/feed"
      >
      <i className="fas fa-stream"></i>
      </NavLink>
      
      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/liked"
      >
      <i className="fas fa-heart"></i>
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/posts/create"
      >
      <i className="fas fa-plus-square"></i>
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      to="/"
      onClick={handleSignOut}>
      <i className="fas fa-sign-out-alt"></i>
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      to={`/profiles/${currentUser?.profile_id}`}
      >
      <Avatar src={currentUser?.profile_image} height={25} />
      </NavLink>

    </>
    );

  const loggedOutIconsMobile = (
    <>
      <NavLink
      exact className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/"
      >
      <i className="fa-solid fa-house"></i>
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/login"
      >
      <i className="fa-solid fa-arrow-right-to-bracket"></i> Log In
      </NavLink>

      <NavLink
      className={styles.NavLinkMob}
      activeClassName={styles.Active}
      to="/signup"
      >
      <i className="fa-solid fa-signature"></i> Sign Up
      </NavLink>
    </>
    );

    const desktopIcons = currentUser ? loggedInIcons : loggedOutIcons;
    const mobileIcons = currentUser ? loggedInIconsMobile : loggedOutIconsMobile;
  
    return (
      <>
        <Navbar
          expand="lg"
          className={`bg-body-tertiary ${styles.darkNavbar} sticky-top`}
          bg="dark"
          data-bs-theme="dark"
        >
          <Container className={styles.Container}>
            {isMobile ? (
              // Render icons in a single row for small screens
              <Nav className={`${styles.mobileIconsRow}`}>
                {mobileIcons}
              </Nav>
            ) : (
              // Render icons in a column for larger screens
              <Nav className="flex-column">
                {desktopIcons}
              </Nav>
            )}
          </Container>
        </Navbar>
      </>
    );
  };

export default NavBar