import React, { useState, FormEvent } from "react";
import { useCookies } from "react-cookie";

const Auth: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["AuthToken", "Email"]);
  const [isLogIn, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogIn && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const endpoint = isLogIn ? "login" : "signup";

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: { email?: string; token?: string; detail?: string } = await response.json();

      if (data.detail) {
        setError(data.detail);
        removeCookie("AuthToken");
        removeCookie("Email");
        return;
      }

      if (data.email && data.token) {
        setCookie("Email", data.email);
        setCookie("AuthToken", data.token);
        window.location.reload(); 
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-container">
          <h3>{isLogIn ? "Log In" : "Sign Up"}</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          {!isLogIn && (
            <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          )}
          <input type="submit" className="create" value={isLogIn ? "Log In" : "Sign Up"} />
          {error && <p className="error">{error}</p>}
        </form>

        <div className="auth-switch-container">
          <p>{isLogIn ? "Don't have an account?" : "Already have an account?"}</p>
          <button className="auth-switch-button" onClick={() => setIsLogin(!isLogIn)}>
            {isLogIn ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
