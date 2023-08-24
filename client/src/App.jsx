import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { api } from "./utils.js";
import Button from "./components/Button.jsx";

export default function App() {
  const [user, setUser] = useState();

  return (
    <>
      <header className="flex justify-between px-4 items-center h-16 shrink-0 text-white bg-gray-700">
        <Link to="/">
          <div className="text-lg font-bold">Stellarships</div>
        </Link>
        {user ? (
          <div className="flex gap-3 items-center">
            <div>{user.name}</div>
            <Button
              onClick={async () => {
                const response = await api.post("/auth/logout");
                if (response.ok) {
                  setUser();
                }
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        )}
      </header>
      <Outlet context={[user, setUser]} />
      <footer className="px-4 py-2 text-center">
        &copy; 2023 Romi Kusuma Bakti
      </footer>
    </>
  );
}
