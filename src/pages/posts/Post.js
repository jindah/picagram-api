import React, { useState } from 'react';
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { Link, useHistory, useLocation } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreModal } from "../../components/MoreModal";
import ShareModal from "../../components/ShareModal";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // Check what page the user is on
  const location = useLocation();
  const isFeedPage = location.pathname.includes('/feed');
  const isHomePage = location.pathname === '/';
  const isPostPage = location.pathname.startsWith('/posts/');
  const isProfilePage = location.pathname.startsWith('/profiles/');

  // State to manage the visibility of the ShareModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Construct the share URL
  const shareUrl = `${window.location.origin}/posts/${id}`;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Function to navigate to the post edit page
  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  // Function to handle post deletion
  const handleDelete = async () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');

    if (isConfirmed) {
      try {
        await axiosRes.delete(`/posts/${id}/`);
        history.push('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Function to handle post like
  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  // Function to handle post unlike
  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`/likes/${like_id}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      {isProfilePage ? (
        // Render only the image, likes and comments count when on the profile page
        <>
        <Link to={`/posts/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          <Card.Text className={styles.PostBarDark}>
          {likes_count === 1 ? `${likes_count} like • ` : `${likes_count} likes • `}
          {comments_count === 1 ? `${comments_count} comment` : `${comments_count} comments`}
          </Card.Text>
        </Card.Body>
        </>
      ) : (
        // Render the entire post content when not on the profile page
        <>
        <Card.Body>
        <div className={`d-flex align-items-center justify-content-between ${styles.ProfileDate}`}>
            <Link to={`/profiles/${profile_id}`} className={`d-flex align-items-center ${styles.ProfileDateHover}`}>
            <Avatar src={profile_image} height={30} />
            <span>{owner} • {updated_at}</span>
            </Link>
            {/* Render MoreModal component for post owner to edit or delete the post */}
            {is_owner && <MoreModal handleEdit={handleEdit} handleDelete={handleDelete}/>}
        </div>
        </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={handleUnlike}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleLike}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          <Link to={`/posts/${id}`}>
            {isPostPage ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{currentUser ? 'Comment down below!' : 'Log in to comment!'}</Tooltip>}
              >
                <i className={`far fa-comments ${styles.Comments}`} />
              </OverlayTrigger>
            ) : (
              <i className={`far fa-comments ${styles.Comments}`} /> 
            )}
          </Link>
          {/* Render ShareModal component to share the post */}
          <span onClick={openModal}>
          <i className="fa-regular fa-paper-plane"></i>
          </span>
          <ShareModal isOpen={isModalOpen} onClose={closeModal} shareUrl={shareUrl} title={title} />
          </div>
            <Card.Text className={styles.PostBar}>
            {likes_count === 1 ? `${likes_count} like • ` : `${likes_count} likes • `}
            {comments_count === 1 ? `${comments_count} comment` : `${comments_count} comments`}
            </Card.Text>
            {content && (
              <Card.Text className={styles.PostBar}>
                <span className={styles.boldText}>{owner}</span>
                {content}
              </Card.Text>
            )}
            {isFeedPage || isHomePage ? (
              <Link to={`/posts/${id}`}>
                <Card.Text className={styles.PostBar}>
                  {comments_count === 0
                    ? `Be the first to comment...`
                    : comments_count === 1
                      ? `See the one comment...`
                      : `See all ${comments_count} comments...`}
                </Card.Text>
              </Link>
            ) : null}
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default Post;