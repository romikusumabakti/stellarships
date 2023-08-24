import { useOutletContext } from "react-router-dom";
import Protected from "../components/Protected";
import Button from "../components/Button";
import { Link } from "react-router-dom";

export default function Home() {
  const user = useOutletContext()[0];

  return (
    <Protected>
      <main className="grow">
        <h1 className="text-3xl">Hai, {user?.name}!</h1>
        <Link to="/planets">
          <Button>Tampilkan daftar planet</Button>
        </Link>
      </main>
    </Protected>
  );
}
