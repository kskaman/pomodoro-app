import { useContext, useEffect, useState } from "react";
import closeButton from "../assets/icon-close.svg";
import arrowUpIcon from "../assets/icon-arrow-up.svg";
import arrowDownIcon from "../assets/icon-arrow-down.svg";
import { Font, themeColor, TimeSettings } from "../types/types";
import { SettingsContext } from "../context/SettingsContext";
import {
  alarmOptions,
  bgColorClasses,
  colorOptions,
  fontOptions,
  timeFields,
} from "../constants/constants";

const Divider = () => {
  return <div className="w-full h-px bg-[#e3e1e1]"></div>;
};

const SubHeading = ({ text }: { text: string }) => {
  return (
    <div className="font-bold tracking-[13px] text-[13px] text-midnight uppercase">
      {text}
    </div>
  );
};

interface FieldInputProps {
  heading: string;
  value?: number;
  onChange: (newValue: number) => void;
}

const FieldInput = ({ heading, value = 0, onChange }: FieldInputProps) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(Math.max(0, value - 1));

  return (
    <div className="flex flex-row sm:flex-col justify-between items-center sm:items-start h-[40px] sm:h-[70px] w-full">
      <h3 className="text-[12px] font-bold text-deepNavy">{heading}</h3>
      <div className="relative">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "");
            onChange(Number(numericValue));
          }}
          className="w-[140px] rounded-[10px] h-[40px] sm:h-[48px] bg-misty text-deepNavy text-[14px] font-bold pl-3 pr-10"
        />
        {/* Custom arrows */}
        <div className="absolute right-3 top-0 bottom-0 flex flex-col justify-center items-center gap-[8px]">
          <button
            onClick={increment}
            className="cursor-pointer hover:text-deepNavy"
          >
            <img
              src={arrowUpIcon}
              alt="Increase"
              className="w-[12px] h-[4px]"
            />
          </button>
          <button
            onClick={decrement}
            className="cursor-pointer hover:text-deepNavy"
          >
            <img
              src={arrowDownIcon}
              alt="Decrease"
              className="w-[12px] h-[4px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal = ({ onClose }: SettingsModalProps) => {
  const { settings, updateSettings } = useContext(SettingsContext);

  const [time, setTime] = useState<TimeSettings>(() => settings.timeSettings);
  const [font, setFont] = useState<Font>(settings.fontSetting);
  const [color, setColor] = useState<themeColor>(settings.colorSetting);
  const [alarmSound, setAlarmSound] = useState<string>(settings.alarmSound);

  useEffect(() => {
    setTime(settings.timeSettings);
    setFont(settings.fontSetting);
    setColor(settings.colorSetting);
  }, [settings]);

  const handleApply = () => {
    const newSettings = {
      timeSettings: time,
      fontSetting: font,
      colorSetting: color,
      alarmSound: alarmSound,
    };
    updateSettings(newSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-midnight bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-[90%] sm:w-[540px] h-[85%] sm:h-[550px] bg-white rounded-[25px] py-[40px] relative flex justify-between flex-col">
        {/* Heading and close button */}
        <div className="flex justify-between items-center px-[40px]">
          <h2 className="text-[28px] font-bold text-midnight">Settings</h2>
          <button onClick={onClose} className="cursor-pointer">
            <img src={closeButton} alt="Close settings" />
          </button>
        </div>

        <Divider />

        {/* Settings Options */}
        <div className="flex flex-col gap-6 px-[40px]">
          {/* Time Options */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <SubHeading text="time (minutes)" />
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
              {timeFields.map((field) => (
                <FieldInput
                  heading={field.label}
                  key={field.key}
                  value={time[field.key as keyof TimeSettings]}
                  onChange={(newValue) =>
                    setTime((prev) => ({ ...prev, [field.key]: newValue }))
                  }
                />
              ))}
            </div>
          </div>

          <Divider />

          {/* Font Options */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 items-center">
            <SubHeading text="Font" />
            <div className="flex gap-[16px]">
              {fontOptions.map((option: Font) => (
                <div
                  key={option}
                  onClick={() => setFont(option)}
                  className={`cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center text-[15px] ${
                    font === option
                      ? "bg-deepNavy text-white"
                      : "bg-misty text-deepNavy"
                  } font-${option}`}
                >
                  Aa
                </div>
              ))}
            </div>
          </div>

          <Divider />

          {/* Color Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <SubHeading text="color" />
            <div className="flex gap-[16px]">
              {colorOptions.map((option: themeColor) => (
                <div
                  key={option}
                  onClick={() => setColor(option)}
                  className={`relative cursor-pointer w-[40px] h-[40px] rounded-full ${bgColorClasses[option]}`}
                >
                  {color === option && (
                    <div
                      className="absolute inset-0 flex items-center justify-center 
                    text-deepNavy text-[18px] font-bold"
                    >
                      ✓
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Divider />
          {/* Alarm Options */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
            <SubHeading text="alarm" />
            <select
              value={alarmSound}
              onChange={(e) => setAlarmSound(e.target.value)}
              className="w-[224px] h-[40px] rounded-full 
              bg-misty text-deepNavy text-[14px] font-bold py-2 
              px-3 rounded-full appearance-none focus:outline-none"
            >
              {alarmOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Apply button */}
        <button
          onClick={handleApply}
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[140px] h-[53px] rounded-[26.5px] bg-warmPink cursor-pointer hover:bg-hoverPink"
        >
          <span className="font-bold text-[16px] text-white">Apply</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
