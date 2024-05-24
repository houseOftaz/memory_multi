import { useState } from "react";


const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Lgin successful :", data);
      } else {
        console.error("Failed to login :", data);
      }
    } catch (error) {
      console.error("Erro loggin in", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="fist-name"
        />
        <input
          type="pasword"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="fist-name"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
