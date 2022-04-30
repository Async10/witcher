import Lottie from "lottie-react";
import { Navigate, useParams } from "react-router-dom";
import * as siegerehrungen from "../../domain/siegerehrungen";
import { useSiegerehrungenStorage } from "../../services/adapters";
import fireworks from "./fireworks.json";

function selectSiegerehrung(
  siegerehrungen: siegerehrungen.Siegerehrungen,
  id: UniqueId
): siegerehrungen.Siegerehrung | undefined {
  return siegerehrungen[id];
}

export default function Siegerehrung() {
  const params = useParams<{ id: UniqueId }>();
  const { siegerehrungen } = useSiegerehrungenStorage();
  const siegerehrung = selectSiegerehrung(siegerehrungen, params.id!);

  if (!siegerehrung) {
    return <Navigate replace to="/" />;
  }

  return <Lottie animationData={fireworks} />;
}
