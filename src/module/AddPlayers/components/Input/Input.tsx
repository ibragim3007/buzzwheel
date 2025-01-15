import { useTheme } from "@/src/shared/hooks/useTheme";
import { fontWeight } from "@/src/shared/styles/typography/typography";
import Button from "@/src/shared/ui/buttons/Button";
import Grid from "@/src/shared/ui/grid/Grid";
import Paper from "@/src/shared/ui/layout/Paper";
import React, { useState } from "react";
import { Alert, TextInput } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
interface InputProps {
  onCall: (name: string) => void;
}

export default function Input({ onCall }: InputProps) {
  const colors = useTheme();

  const [name, setName] = useState("");
  const onPress = () => {
    if (name.trim() === "") {
      Alert.alert("Name is required");
      return;
    }
    onCall(name);
    setName("");
  };

  const handleChangeText = (text: string) => {
    if (text.length <= 25) {
      setName(text);
    }
  };

  return (
    <Paper>
      <Grid row>
        <TextInput
          onChangeText={handleChangeText}
          value={name}
          cursorColor={colors.text.primary}
          selectionColor={colors.text.primary}
          placeholderTextColor={colors.text.white}
          placeholder="Enter name player"
          onSubmitEditing={onPress}
          style={{
            borderWidth: 1,
            borderColor: colors.text.primary,
            paddingHorizontal: 25,
            flex: 1,
            borderTopLeftRadius: 50,
            borderBottomLeftRadius: 50,
            fontSize: 18,
            color: colors.text.primary,
            fontFamily: fontWeight.medium,
            borderRightWidth: 0,
          }}
        />

        <Button
          style={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            paddingLeft: 15,
          }}
          startIcon={
            <FontAwesome6 name="plus" size={20} color={colors.text.primary} />
          }
          onPress={onPress}
          title="Add"
        />
      </Grid>
    </Paper>
  );
}
