import { useTheme } from "@/src/shared/hooks/useTheme";
import { fontWeight } from "@/src/shared/styles/typography/typography";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import React from "react";
import { TextInput } from "react-native";

interface InputProps {
  onCall: () => void;
}

export default function Input({ onCall }: InputProps) {
  const colors = useTheme();

  const onPress = () => {
    onCall();
  };

  return (
    <Grid row space="sm">
      <TextInput
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
  );
}
