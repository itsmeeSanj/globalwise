import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/FakeAuthContext";

import styles from "./Login.module.css";
import PageNav from "../Components/PageNav";
import Button from "../Components/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = React.useState("jack@example.com");
  const [password, setPassword] = React.useState("qwerty");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    if (email && password) login(email, password);
  }

  React.useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true }); //sideEffects
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      {/*  */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='email'>Email address</label>
          <input
            type='email'
            id='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
