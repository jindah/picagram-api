import React, { useState } from 'react';
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreModal } from "../../components/MoreModal";
import ShareModal from "../../components/ShareButton";

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

  const location = useLocation();
  // Check if the user is on the feed page or home page
  const isFeedPage = location.pathname.includes('/feed');
  const isHomePage = location.pathname === '/';
  const isPostPage = location.pathname.startsWith('/posts/');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const shareUrl = `${window.location.origin}/posts/${id}`;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to delete this post?');

    if (isConfirmed) {
      try {
        await axiosRes.delete(`/posts/${id}/`);
        history.push('/');
      } catch (err) {
        // Handle error
        console.error(err);
      }
    }
  };

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
        <Card.Body>
        <div className={`d-flex align-items-center justify-content-between ${styles.ProfileDate}`}>
            <Link to={`/profiles/${profile_id}`} className={`d-flex align-items-center ${styles.ProfileDateHover}`}>
            <Avatar src={profile_image} height={30} />
            <span>{owner} • {updated_at}</span>
            </Link>
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
          <span onClick={openModal} style={{ cursor: 'pointer' }}>
          <i className="fa-regular fa-paper-plane"></i>
          </span>
          <ShareModal isOpen={isModalOpen} onClose={closeModal} shareUrl={shareUrl} title={title} />
        </div>
        <Card.Text className={styles.PostBar}>{likes_count === 1 ? `${likes_count} like` : `${likes_count} likes`}</Card.Text>
        {content && <Card.Text className={styles.PostBar}><span className={styles.boldText}>{owner}</span>{content}</Card.Text>}
        {isFeedPage || isHomePage ? ( <Link to={`/posts/${id}`}><Card.Text className={styles.PostBar}>{comments_count === 0 ? `Be the first to comment...` : `See all ${comments_count} comments...`}</Card.Text></Link>) : null}
      </Card.Body>
    </Card>
  );
};

export default Post;