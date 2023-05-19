import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username :
          <input
            type='text'
            onChange={(e) => handleUsernameChange(e.target.value)}
            value={username}
          />
        </div>
        <div>
          Password :
          <input
            type='password'
            onChange={(e) => handlePasswordChange(e.target.value)}
            value={password}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
