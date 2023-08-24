import { useEffect } from "react";
import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { api } from "../utils";

export default function Home() {
  const navigate = useNavigate();

  const [planets, setPlanets] = useState([]);
  const [newPlanet, setNewPlanet] = useState({});

  const user = useOutletContext()[0];

  useEffect(() => {
    api
      .get("/planets")
      .then((response) => response.json())
      .then((planets) => setPlanets(planets));
  }, [user, navigate]);

  if (user) {
    return (
      <div>
        {planets.map((planet) => (
          <div key={planet.id}>
            <h3>
              {planet.id} {planet.name}
            </h3>
            <p>{planet.diameter}</p>
            <Link to={`/planets/${planet.id}`}>
              <button>Detail</button>
            </Link>
            <Link to={`/planets/${planet.id}/edit`}>
              <button>Edit</button>
            </Link>
            <button
              onClick={async () => {
                if (
                  confirm(`Apakah Anda yakin ingin menghapus ${planet.name}?`)
                ) {
                  const message = await api(`/planets/${planet.id}`, "DELETE");
                  const planets = await api("/planets");
                  setPlanets(planets);
                  alert(message);
                }
              }}
            >
              Hapus
            </button>
          </div>
        ))}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setNewPlanet({});
            const message = await api("/planets", "POST", newPlanet);
            const planets = await api("/planets");
            setPlanets(planets);
            alert(message);
          }}
        >
          <h1>Tambah Planet</h1>
          <label>
            Nama:
            <input
              type="text"
              value={newPlanet.name ?? ""}
              onChange={(e) =>
                setNewPlanet({ ...newPlanet, name: e.target.value })
              }
              required
            />
          </label>
          <label>
            Diameter:
            <input
              type="number"
              value={newPlanet.diameter ?? ""}
              onChange={(e) =>
                setNewPlanet({
                  ...newPlanet,
                  diameter: parseFloat(e.target.value),
                })
              }
              required
            />
          </label>
          <label>
            Deskripsi:
            <textarea
              value={newPlanet.description ?? ""}
              onChange={(e) =>
                setNewPlanet({
                  ...newPlanet,
                  description: e.target.value,
                })
              }
              required
            />
          </label>
          <button>Simpan</button>
        </form>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
