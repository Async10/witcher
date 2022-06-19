import { Navigate, useParams } from "react-router-dom";
import { Spieleverwaltung } from "../../domain/spieleverwaltung";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import UnoPage from "../UnoPage";

function selectSpiel(spieleverwaltung: Spieleverwaltung, id: UniqueId) {
  return spieleverwaltung.uno[id];
}

export default function UnoPageContainer() {
  const params = useParams<{ id: UniqueId }>();
  const { spieleverwaltung } = useSpieleverwaltungStorage();
  const spiel = selectSpiel(spieleverwaltung, params.id!);

  if (!spiel) {
    return <Navigate replace to="/" />;
  }

  return <UnoPage spiel={spiel} />;
}
