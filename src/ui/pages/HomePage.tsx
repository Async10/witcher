import AddOutlined from "@mui/icons-material/AddOutlined";
import CasinoOutlined from "@mui/icons-material/CasinoOutlined";
import FormatListNumberedOutlined from "@mui/icons-material/FormatListNumberedOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Container from "@mui/material/Container";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Uno from "../../application/uno";

export default function HomePage() {
  const navigate = useNavigate();
  const { erstelleSpiel } = Uno.useErstelleSpiel();
  const handleErstelleSpielClick = () => {
    const result = erstelleSpiel(["Daniel", "Alisi", "Philipp"]);
    if (!result.success) {
      alert(result.error);
      return;
    }

    navigate(`/uno/${result.value.id}`);
  };

  return (
    <Container sx={{ pb: 7, position: "relative", minHeight: "100vh" }} maxWidth="sm">
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="h1">🔮 Witcher</Typography>
        </Toolbar>
      </AppBar>

      <main>
        <nav>
          <Link to="/uno">Uno</Link>
        </nav>
      </main>

      <Fab onClick={handleErstelleSpielClick} aria-label="Neues Spiel" sx={{ position: "absolute", bottom: 0, right: 0, mb: 11, mr: 4 }}>
        <AddOutlined />
      </Fab>

      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Spiele" icon={<CasinoOutlined />} />
          <BottomNavigationAction label="Spielerverwaltung" icon={<PeopleOutlined />} />
          <BottomNavigationAction label="Bestenliste" icon={<FormatListNumberedOutlined />} />
        </BottomNavigation>
      </Paper>
    </Container>
  );
}
