import { Navigate, useParams } from "react-router-dom";
import { useSiegerehrungenStorage } from "../../services/adapters";
import SiegerehrungPage from "../SiegerehrungPage";

export default function SiegerehrungPageContainer() {
  const params = useParams<{ id: UniqueId }>();
  const { siegerehrungen } = useSiegerehrungenStorage();
  const siegerehrung = siegerehrungen[params.id!];

  if (!siegerehrung) {
    return <Navigate replace to="/" />;
  }

  return <SiegerehrungPage siegerehrung={siegerehrung} />;
}
