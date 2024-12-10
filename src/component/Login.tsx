import "./Login.css";

export default function Login() {
  return (
    <div className="log-in">
      <div className="banner">
        
      </div>
      <div>
        <div>
          <div className="login-title">Welcome!</div>
          <input type="text" className="input-id"></input>
          <input type="text" className="input-pw"></input>
          <button className="login-button">login</button>
        </div>
        <div>
          <div>
            Did you forget id or password? Find account
          </div>
          <div>
            Do you have no account? Sign in
          </div>
        </div>
      </div>
    </div>
  );
}