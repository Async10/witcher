import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Lottie from "lottie-react";
import React from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { useLoescheSiegerehrung } from "../../../application/siegerehrungen";
import { Siegerehrung } from "../../../domain/siegerehrungen";
import fireworks from "./fireworks.json";
import Platzierungen from "./Platzierungen";

export type SiegerehrungPageProps = {
  siegerehrung: Siegerehrung;
};

export default function SiegerehrungPage({
  siegerehrung,
}: SiegerehrungPageProps) {
  const [siegerehrungLoeschenDialogOpen, setSiegerehrungLoeschenDialogOpen] =
    React.useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  const navigate = useNavigate();

  const { loescheSiegerehrung } = useLoescheSiegerehrung();

  // Die Animation friert ein, wenn nicht bei jedem Rendern eine
  // neue Instanz der Animationsdaten verwendet wird.
  // Siehe: https://github.com/airbnb/lottie-web/issues/2070
  const animationData = JSON.parse(JSON.stringify(fireworks));

  const handleMenuButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMenuAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleLoeschenClick = () => {
    setSiegerehrungLoeschenDialogOpen(true);
  };

  const handleLoescheSiegerehrungJaClick = () => {
    loescheSiegerehrung(siegerehrung.id);
    navigate(`/`, { replace: true });
  };

  const handleSiegerehrungLoeschenDialogClose = () => {
    setSiegerehrungLoeschenDialogOpen(false);
  };

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
          <IconButton
            edge="end"
            title="Öffne Menü"
            sx={{ display: "inline-block", marginLeft: "auto" }}
            onClick={handleMenuButtonClick}
          >
            <MoreVertOutlined />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu
        open={!!menuAnchorEl}
        anchorEl={menuAnchorEl}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLoeschenClick}>
          <ListItemIcon>
            <DeleteOutlined color="error" />
          </ListItemIcon>
          <ListItemText>Löschen</ListItemText>
        </MenuItem>
      </Menu>

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
            <Lottie loop animationData={animationData} />
          </Box>
        </Box>
      </Container>

      <Dialog open={siegerehrungLoeschenDialogOpen}>
        <DialogTitle>Siegerehrung löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Soll die Siegerehrung wirklich gelöscht werden?
          </DialogContentText>
          <DialogActions>
            <Button
              size="small"
              onClick={handleSiegerehrungLoeschenDialogClose}
            >
              Nein
            </Button>
            <Button size="small" onClick={handleLoescheSiegerehrungJaClick}>
              Ja
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
