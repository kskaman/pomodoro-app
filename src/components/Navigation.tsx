import { useContext } from "react";
import { Session } from "../types/types";
import { SettingsContext } from "../context/SettingsContext";
import { bgColorClasses } from "../constants/constants";

interface NavigationProps {
  selectedSession: Session;
  setSelectedSession: React.Dispatch<React.SetStateAction<Session>>;
}

const Navigation = ({
  selectedSession,
  setSelectedSession,
}: NavigationProps) => {
  const { colorSetting } = useContext(SettingsContext).settings;

  const sessions: Session[] = ["pomodoro", "short", "long"];

  return (
    <nav>
      <ul
        className="decoration-none text-[12px] sm:text-[14px]
          w-[327px] h-[63px] rounded-[31.5px] sm:w-[372px]
          flex flex-row items-center justify-evenly
          text-softIndigo bg-midnight"
      >
        {sessions.map((s: Session) => (
          <li
            key={s}
            onClick={() => setSelectedSession(s)}
            className={`cursor-pointer
              ${selectedSession === s ? "text-deepNavy" : "softIndigo"}
              ${
                selectedSession === s ? bgColorClasses[colorSetting] : "inherit"
              }
              w-[120px] m-[8px] rounded-full h-[48px]
              flex items-center justify-center font-bold`}
          >
            {s === "short"
              ? "short break"
              : s === "long"
              ? "long break"
              : "pomodoro"}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
