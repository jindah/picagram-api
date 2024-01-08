import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from './components/NavBar';
import styles from './App.module.css'
import {Route, Switch, useLocation} from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import PostEditForm from "./pages/posts/PostEditForm";
import NotFound from "./components/NotFound";
import PopularProfiles from './pages/profiles/PopularProfiles';
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";


function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  const location = useLocation();
  const isSignInOrSignUp = location.pathname.includes('/login') || location.pathname.includes('/signup');

  return (
    <Container className={styles.App} fluid>
      <Row>
        <Col xs={12} lg={2} className={styles.NavCol}><NavBar /></Col>
        <Col xs={12} lg={3} className={`order-lg-2 ${styles.ProfilesCol}`}>
          {/* Render PopularProfiles if not in SignIn/SignUp pages */}
          {!isSignInOrSignUp && (
            <>
              <Col>
                <PopularProfiles mobile />
              </Col>
              <Col className="d-none d-lg-block">
                <PopularProfiles />
              </Col>
              <Col className="d-none d-lg-block mt-4">
                <span className={styles.Copyright}>© 2024 Picagram by J. Timlin / Code Institute</span>
              </Col>
            </>
          )}
        </Col>
        <Col xs={12} lg={7} className={`order-lg-1 justify-content-center align-items-center ${styles.MidCol}`}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <PostsPage message="No results found. Adjust the search keyword." />
              )}
            />
            <Route
              exact
              path="/feed"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or follow a user."
                  filter={`owner__followed__owner__profile=${profile_id}&`}
                />
              )}
            />
            <Route
              exact
              path="/liked"
              render={() => (
                <PostsPage
                  message="No results found. Adjust the search keyword or like a post."
                  filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
                />
              )}
            />
            <Route exact path="/login" render={() => <SignInForm />} />
            <Route exact path="/signup" render={() => <SignUpForm />} />
            <Route exact path="/posts/create" render={() => <PostCreateForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route exact path="/posts/:id/edit" render={() => <PostEditForm />} />
            <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
            <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
            <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
            <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />
            {/* Catch-all route for handling unmatched routes */}            
            <Route render={() => <NotFound />} />
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
