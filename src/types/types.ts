export type Font = "sans" | "slab" | "mono";
export type themeColor = "warmPink" | "coolCyan" | "vividPurple";

export type Session = "pomodoro" | "short" | "long";

export interface TimeSettings {
  pomodoro: number;
  short: number;
  long: number;
}


export interface Settings {
  timeSettings: TimeSettings;
  fontSetting: Font;
  colorSetting: themeColor;
}