import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import MoreVertOutlined from "@mui/icons-material/MoreVertOutlined";
import ShareOutlined from "@mui/icons-material/ShareOutlined";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import html2canvas from "html2canvas";
import Lottie from "lottie-react";
import React from "react";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { useLoescheSiegerehrung } from "../../../application/siegerehrungen";
import { Siegerehrung } from "../../../domain/siegerehrungen";
import JaNeinDialog from "../../components/JaNeinDialog";
import fireworks from "./fireworks.json";
import Platzierungen from "./Platzierungen";

function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}


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
  const theme = useTheme();
  const divRef = React.useRef<HTMLDivElement | null>(null);

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

  const handleTeilen = async () => {
    try {
      if (divRef.current) {
        const canvas = await html2canvas(divRef.current);
        const blob = await (await fetch(canvas.toDataURL("image/png"))).blob();
        const file = new File([blob], `${siegerehrung.titel}.png`, { type: blob.type });
        const data = {
          title: siegerehrung.titel,
          files: [file],
        };
        if (navigator.canShare?.(data)) {
          await navigator.share(data);
        } else {
          alert("Sorry, dein Browser unterstützt das Teilen der Siegerehrung leider nicht :-(");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setMenuAnchorEl(null);
    }
  };

  const handleLoescheSiegerehrungJa = () => {
    loescheSiegerehrung(siegerehrung.id);
    navigate(`/`, { replace: true });
  };

  const handleLoescheSiegerehrungNein = () => {
    setSiegerehrungLoeschenDialogOpen(false);
    setMenuAnchorEl(null);
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
        {"share" in window.navigator && (
          <MenuItem onClick={handleTeilen}>
            <ListItemIcon>
              <ShareOutlined />
            </ListItemIcon>
            <ListItemText>Teilen</ListItemText>
          </MenuItem>
        )}
      </Menu>

      <div ref={divRef} style={{ backgroundColor: theme.palette.background.paper }}>
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
      </div>

      <JaNeinDialog
        open={siegerehrungLoeschenDialogOpen}
        title="Siegerehrung löschen?"
        text="Soll die Siegerehrung wirklich gelöscht werden?"
        onJa={handleLoescheSiegerehrungJa}
        onNein={handleLoescheSiegerehrungNein}
      />
    </>
  );
}
