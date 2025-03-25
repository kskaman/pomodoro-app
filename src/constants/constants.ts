import { Font, themeColor } from "../types/types";

// get alarms from audios
import classicAlarm from "../assets/audios/classic-alarm.wav";
import facilityAlarm from "../assets/audios/facility-alarm-sound.wav";
import roosterAlarm from "../assets/audios/rooster-crowing-in-the-morning.wav";
import securityAlarm from "../assets/audios/security-facility-breach-alarm.wav";
import soundAlertAlarm from "../assets/audios/sound-alert-in-hall.wav";
import vintageAlarm from "../assets/audios/vintage-warning-alarm.wav";
import buzzerAlarm from "../assets/audios/warning-alarm-buzzer.wav";

export const bgColorClasses: Record<themeColor, string> = {
    warmPink: "bg-warmPink",
    coolCyan: "bg-coolCyan",
    vividPurple: "bg-vividPurple",
};


// Alarm options.
export const alarmOptions = [
    { label: "Classic Alarm", value: classicAlarm },
    { label: "Facility Alarm", value: facilityAlarm },
    { label: "Rooster Crowing", value: roosterAlarm },
    { label: "Security Breach", value: securityAlarm },
    { label: "Sound Alert", value: soundAlertAlarm },
    { label: "Vintage Warning", value: vintageAlarm },
    { label: "Warning Buzzer", value: buzzerAlarm },
];


// Mapping for time fields
export const timeFields = [
    { label: "pomodoro", key: "pomodoro" },
    { label: "short break", key: "short" },
    { label: "long break", key: "long" },
];

export const fontOptions: Font[] = ["sans", "slab", "mono"];

export const colorOptions: themeColor[] = ["warmPink", "coolCyan", "vividPurple"];

// Map color keys to actual color values for the SVG stroke.
export const ringColors: Record<string, string> = {
    warmPink: "#f87070",
    coolCyan: "#70f3f8",
    vividPurple: "#d881f8",
};