import { useTheme } from "@/src/shared/hooks/useTheme";
import { fontWeight } from "@/src/shared/styles/typography/typography";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import Paper from "@/src/shared/ui/layout/Paper";
import React, { useState } from "react";
import { TextInput } from "react-native";

interface InputProps {
  onCall: (name: string) => void;
}

export default function Input({ onCall }: InputProps) {
  const colors = useTheme();

  const [name, setName] = useState("");
  const onPress = () => {
    console.log("first");
    onCall(name);
    setName("");
  };

  return (
    <Paper>
      <Grid row space="sm">
        <TextInput
          onChangeText={(text) => setName(text)}
          value={name}
          style={{
            borderWidth: 1,
            borderColor: colors.text.disabled,
            paddingHorizontal: 10,
            flex: 1,
            borderRadius: 7,
            fontSize: 18,
            color: colors.text.primary,
            fontFamily: fontWeight.medium,
          }}
          cursorColor={colors.text.primary}
          selectionColor={colors.text.primary}
          placeholderTextColor={colors.text.disabled}
          placeholder="Enter name player"
        />

        <Button onPress={onPress} title="+ Add" />
      </Grid>
    </Paper>
  );
}
