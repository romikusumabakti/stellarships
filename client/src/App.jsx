import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { api } from "./utils.js";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    api.get("/auth/me").then(async (response) => {
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      }
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div>Memuat...</div>
  ) : (
    <>
      <header>
        <Link to="/">
          <div>Stellarships</div>
        </Link>
        {user ? (
          <div>
            <div>{user.name}</div>
            <button
              onClick={async () => {
                const response = await api.post("/auth/logout");
                if (response.ok) {
                  setUser();
                }
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </header>
      <Outlet context={[user, setUser]} />
      <footer>&copy; 2023 Stellarships</footer>
    </>
  );
}
