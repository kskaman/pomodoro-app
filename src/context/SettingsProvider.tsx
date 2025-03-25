import { useState, useEffect, ReactNode } from "react";
import { SettingsContext, SettingsContextProps } from "./SettingsContext";
import { Settings } from "../types/types";
import { getSettings, saveSettings } from "../services/settingsService";

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useState<Settings>({
    timeSettings: {
      pomodoro: 25,
      short: 5,
      long: 15,
    },
    fontSetting: "sans",
    colorSetting: "warmPink",
  });

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const contextValue: SettingsContextProps = {
    settings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};
