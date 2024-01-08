import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "./Post";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Asset from "../../components/Asset";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });

  // Get the current user and their profile image
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;


  // Use useEffect to fetch post and comments data on component mount
  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row >
      <Col lg={12}>
        <Post {...post.results[0]} setPosts={setPost} postPage />
        <Container className={appStyles.ContentBlack}>
        {/* Render CommentCreateForm only if there is a current user */}
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              post={id}
              setPost={setPost}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            <InfiniteScroll 
            children={
              comments.results.map(comment => (
                <Comment
                key={comment.id}
                {...comment}
                setPost={setPost}
                setComments={setComments}
                />
              ))
            }
            dataLength={comments.results.length}
            loader={<Asset spinner />}
            hasMore={!!comments.next}
            next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            // Render an empty span if there are no comments (and user is logged in)
            <span> </span>
          ) : (
            // Render a message if there are no comments and user is not logged in
            <span>No comments yet. Login to comment!</span>
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default PostPage;