import { useSettings } from "@/src/entities/Settings/settings.repository";
import SwitchLabel from "@/src/shared/ui/layout/SwitchLabel";
import React from "react";

export default function SwitchRepetition() {
  const { setRemoveRepetitions, isRemoveRepetitions } = useSettings();
  const onChange = (value: boolean) => setRemoveRepetitions(value);

  return (
    <SwitchLabel
      onValueChange={(value) => onChange(value)}
      label="Отключить повторы действий"
      value={isRemoveRepetitions}
    />
  );
}
