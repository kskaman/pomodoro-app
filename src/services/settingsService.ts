import {  Settings } from "../types/types";

const SETTINGS_KEY = "pomodoroSettings";
const TIME_SETTINGS_KEY = "timeSettings";
const FONT_SETTING_KEY = "fontSetting";
const COLOR_SETTING_KEY = "colorSetting";

export const getSettings = (): Settings => {
  const stored = localStorage.getItem(SETTINGS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (err) {
      console.error("Error parsing settings:", err);
    }
  }
  const defaultSettings: Settings = {
    [TIME_SETTINGS_KEY]: { pomodoro: 25, short: 5, long: 15 },
    [FONT_SETTING_KEY]: "sans",
    [COLOR_SETTING_KEY]: "warmPink",
  };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
  return defaultSettings;
};

export const saveSettings = (settings: Settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
