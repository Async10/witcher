import CasinoOutlined from "@mui/icons-material/CasinoOutlined";
import FormatListNumberedOutlined from "@mui/icons-material/FormatListNumberedOutlined";
import PeopleOutlined from "@mui/icons-material/PeopleOutlined";
import AppBar from "@mui/material/AppBar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, left: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="h1">
            🔮 Witcher
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ pt: 9 }} maxWidth="sm">
        <Outlet />
      </Container>

      <Paper
        component="footer"
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation value={location.pathname} showLabels>
          <BottomNavigationAction
            component={RouterLink}
            to="/"
            value="/"
            label="Spiele"
            icon={<CasinoOutlined />}
          />
          <BottomNavigationAction
            component={RouterLink}
            to="/spieler"
            value="/spieler"
            label="Spielerverwaltung"
            icon={<PeopleOutlined />}
          />
          <BottomNavigationAction
            component={RouterLink}
            to="/bestenliste"
            value="/bestenliste"
            label="Bestenliste"
            icon={<FormatListNumberedOutlined />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
