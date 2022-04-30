import { Navigate, useParams } from "react-router-dom";
import { Spieleverwaltung } from "../../domain/spieleverwaltung";
import * as uno from "../../domain/uno";
import { useSpieleverwaltungStorage } from "../../services/adapters";
import Uno from "../Uno";

function selectSpiel(
  spieleverwaltung: Spieleverwaltung,
  id: UniqueId
): uno.Uno | undefined {
  return spieleverwaltung.uno[id];
}

export default function UnoContainer() {
  const params = useParams<{ id: UniqueId }>();
  const { spieleverwaltung } = useSpieleverwaltungStorage();
  const spiel = selectSpiel(spieleverwaltung, params.id!);

  if (!spiel) {
    return <Navigate replace to="/" />;
  }

  return <Uno spiel={spiel} />;
}
