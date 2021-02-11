import React, { useState } from "react";
import { login } from "./features/userSlice";
import { auth } from "./firebase";
import "./Login.css";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const loginToApp = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error));
  };
  const register = () => {
    if (!name) {
      return alert("Please enter a full name!");
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePicture,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePicture,
              })
            );
          });
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="login">
      <img
        src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks"
        alt=""
      />
      <form>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Nom (obligatoire pour l'inscription)"
          type="text"
        />
        <input
          onChange={(e) => setProfilePicture(e.target.value)}
          value={profilePicture}
          placeholder="URL photo de profil (optionnel)"
          type="text"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Courriel"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
          type="Password"
        />
        <button onClick={loginToApp} type="submit">
          Se connecter
        </button>
      </form>
      <p>
        Pas inscrit ?{" "}
        <span className="login__register" onClick={register}>
          S'inscrire
        </span>
      </p>
    </div>
  );
}

export default Login;
