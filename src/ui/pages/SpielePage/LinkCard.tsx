import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Box from "@mui/system/Box";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export type LinkCardProps = {
  children?: React.ReactNode;
  color?: string;
  to: string;
  "aria-label"?: string;
};

export default function LinkCard(props: LinkCardProps) {
  return (
    <Card sx={[!!props.color && { backgroundColor: props.color }]}>
      <CardActionArea
        component={RouterLink}
        to={props.to}
        aria-label={props["aria-label"]}
      >
        <CardContent component={Stack} direction="row" alignItems="center">
          <Box flexGrow={1}>{props.children}</Box>
          <ArrowForwardOutlined />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
