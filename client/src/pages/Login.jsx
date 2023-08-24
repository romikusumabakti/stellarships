import { useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import { api } from "../utils";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useOutletContext();

  if (user) {
    return <Navigate to="/" />;
  } else {
    return (
      <main className="flex">
        <form
          className="m-auto bg-gray-100 p-8 rounded-3xl w-96 flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await api.post("/auth/login", login);
            if (response.ok) {
              const response = await api.get("/auth/me");
              if (response.ok) {
                const user = await response.json();
                alert(`Hai, ${user.name}!`);
                setUser(user);
              }
            } else {
              const message = await response.text();
              alert(message);
            }
          }}
        >
          <h1 className="text-center text-xl">Login</h1>
          <h1 className="text-center text-lg">Gunakan akun Integer Anda</h1>
          <input
            type="email"
            label="Email"
            className="w-full"
            required
            autoFocus
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
          <input
            type="password"
            label="Kata sandi"
            className="w-full"
            required
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <div className="flex justify-between">
            <button>Buat akun</button>
            <button type="submit">Login</button>
          </div>
        </form>
      </main>
    );
  }
}
