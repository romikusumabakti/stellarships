import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { api } from "../../utils";
import Button from "../../components/Button";
import Protected from "../../components/Protected";

export default function Planets() {
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

  return (
    <Protected>
      <main className="overflow-y-auto">
        {planets.map((planet) => (
          <div key={planet.id}>
            <h3>
              {planet.id} {planet.name}
            </h3>
            <p>{planet.diameter}</p>
            <Link to={`/planets/${planet.id}`}>
              <Button>Detail</Button>
            </Link>
            <Link to={`/planets/${planet.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button
              onClick={async () => {
                if (
                  confirm(`Apakah Anda yakin ingin menghapus ${planet.name}?`)
                ) {
                  const response1 = await api.delete(`/planets/${planet.id}`);
                  const message = await response1.text();
                  const response2 = await api.get("/planets");
                  const planets = await response2.json();
                  setPlanets(planets);
                  alert(message);
                }
              }}
            >
              Hapus
            </Button>
          </div>
        ))}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setNewPlanet({});
            const response1 = await api.post("/planets", newPlanet);
            const message = await response1.text();
            const response2 = await api.get("/planets");
            const planets = await response2.json();
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
          <Button>Simpan</Button>
        </form>
      </main>
    </Protected>
  );
}
