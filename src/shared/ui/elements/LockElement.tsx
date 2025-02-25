import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Grid from "../grid/Grid";
import { useTheme } from "../../hooks/useTheme";

export default function LockElement() {
  const colors = useTheme();
  return (
    <Grid
      width="100%"
      height={"100%"}
      justfity="center"
      align="center"
      style={{
        zIndex: 100,
        position: "absolute",
        backgroundColor: "#000000cd",
        alignSelf: "center",
        borderRadius: 20,
      }}
    >
      <Entypo name="lock" size={32} color={colors.accent.primary} />
    </Grid>
  );
}
