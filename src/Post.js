import { Avatar } from "@material-ui/core";
import React, { forwardRef, useState, useEffect } from "react";
import "./Post.css";
import { db } from "./firebase";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import firebase from "firebase";

const Post = forwardRef(({ name, description, message, photoUrl, id }, ref) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const user = useSelector(selectUser);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(id).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [id]);

  return (
    <div ref={ref} className="post">
      <div className="post__header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="post__body">
        <h3 className="post__text">{message}</h3>
      </div>

      <div className="posts__comments">
        {comments.map(({ id, data: { username, text } }) => (
          <p key={id}>
            <strong>
              {username}
              {":"}
            </strong>{" "}
            {text}
          </p>
        ))}
      </div>
      <form className="post__commentBox">
        <input
          className="post__input"
          type="text"
          placeholder="Entrer un commentaire"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={postComment}
          type="submit"
          disabled={!comment}
          className="post__button"
        >
          Poster
        </button>
      </form>
    </div>
  );
});

export default Post;
