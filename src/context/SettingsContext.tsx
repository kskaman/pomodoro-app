import { createContext } from "react";
import { Settings } from "../types/types";

export interface SettingsContextProps {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

export const SettingsContext = createContext<SettingsContextProps>({
  settings: {
    timeSettings: { pomodoro: 25, short: 5, long: 15 },
    fontSetting: "sans",
    colorSetting: "warmPink",
    alarmSound: "classic",
  },
  updateSettings: () => {},
});
