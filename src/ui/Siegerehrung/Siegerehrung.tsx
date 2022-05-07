import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import { Link as RouterLink, Navigate, useParams } from "react-router-dom";
import * as siegerehrungen from "../../domain/siegerehrungen";
import { useSiegerehrungenStorage } from "../../services/adapters";
import fireworks from "./fireworks.json";
import Platzierungen from "./Platzierungen";

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

  return (
    <>
      <AppBar color="transparent">
        <Toolbar sx={{ py: 1 }}>
          <IconButton
            edge="start"
            title="Zurück zur Spieleübersicht"
            component={RouterLink}
            to="/"
          >
            <ArrowBackOutlined />
          </IconButton>
          <Typography
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
            variant="h6"
            component="h1"
          >
            {siegerehrung.titel}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Box
          component="main"
          sx={{
            position: "relative",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Platzierungen endstand={siegerehrung.endstand} />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Lottie loop animationData={fireworks} />
          </Box>
        </Box>
      </Container>
    </>
  );
}