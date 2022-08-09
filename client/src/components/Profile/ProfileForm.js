import classes from './ProfileForm.module.css';
import { useRef } from 'react';
import { updatePassword } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    try {
      await updatePassword(enteredNewPassword).catch((error) => {
        alert(error.message);
      });
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
          minLength="7"
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
