import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils";

export default function PlanetEdit() {
  const [planet, setPlanet] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/planets/${id}`)
      .then((response) => response.json())
      .then((planet) => setPlanet(planet));
  }, [id]);

  return (
    <main>
      {planet ? (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const message = await api(`/planets/${planet.id}`, "PUT", planet);
            alert(message);
            navigate("/");
          }}
        >
          <h1>Edit Planet</h1>
          <label>
            Nama:
            <input
              type="text"
              value={planet.name}
              onChange={(e) => setPlanet({ ...planet, name: e.target.value })}
            />
          </label>
          <label>
            Diameter:
            <input
              type="number"
              value={planet.diameter}
              onChange={(e) =>
                setPlanet({ ...planet, diameter: e.target.value })
              }
            />
          </label>
          <label>
            Deskripsi:
            <textarea
              value={planet.description}
              onChange={(e) =>
                setPlanet({ ...planet, description: e.target.value })
              }
              cols={64}
              rows={8}
            />
          </label>
          <button>Simpan</button>
        </form>
      ) : (
        "Loading..."
      )}
    </main>
  );
}
