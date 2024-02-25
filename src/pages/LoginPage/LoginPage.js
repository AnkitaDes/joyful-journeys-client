import { useState } from "react";
import { useUser } from "../../context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await logIn(email, password);
    navigate("/");
  };

  return (
    <section className="login">
      <div className="login__form-wrap">
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__email-wrap">
            <label className="login__label">Email:</label>
            <input
              className="login__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login__password-wrap">
            <label className="login__label">Password:</label>
            <input
              className="login__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="login__button-wrap">
            <button className="login__button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
