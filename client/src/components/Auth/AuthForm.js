import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './AuthForm.module.css';

import { signUp, signIn } from '../../services/supabaseClient';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // could add validation

    let res;

    try {
      if (isLogin) {
        res = await signIn(enteredEmail, enteredPassword);
      } else {
        res = await signUp(enteredEmail, enteredPassword);
      }
      setLoading(false);

      if (res.error) {
        alert(res.error.message);
      } else {
        const expirationTime = new Date(
          new Date().getTime() + res.session.expires_in * 1000
        );
        authCtx.login(res.session.access_token, expirationTime.toISOString());
        navigate('/');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button disabled={loading}>
            {isLogin ? 'Login' : 'Create Account'}
          </button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
