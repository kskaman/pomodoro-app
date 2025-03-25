import { useContext, useState } from "react";
import logo from "./assets/logo.svg";
import Dial from "./components/Dial";
import Navigation from "./components/Navigation";
import Settings from "./components/Settings";
import { Session } from "./types/types";
import { SettingsContext } from "./context/SettingsContext";
import useParentWidth from "./customHooks/useParentWidth";

const fontClasses: Record<string, string> = {
  sans: "font-sans",
  slab: "font-slab",
  mono: "font-mono",
};

const App = () => {
  const { fontSetting } = useContext(SettingsContext).settings;

  // session can be "pomodoro", "short break", or "long break"
  const [session, setSession] = useState<Session>("pomodoro");

  // Main container size state and ref
  const { containerRef, parentWidth } = useParentWidth();

  return (
    <div
      ref={containerRef}
      className={`bg-deepNavy h-[100vh] w-[100vw]
      flex flex-col justify-evenly items-center
      ${fontClasses[fontSetting]}
      overflow-scroll min-w-[360px]`}
    >
      <div
        className="flex flex-col
        justify-center items-center gap-[47px]"
      >
        {/* Logo */}
        <div className="sm:w-[157px] sm:h-[40px] w-[117px] h-[30px]">
          <img src={logo} />
        </div>
        {/* navigation */}
        <Navigation selectedSession={session} setSelectedSession={setSession} />
      </div>

      {/* Dial */}
      <Dial selectedSession={session} parentWidth={parentWidth} />

      {/* settings Button */}
      <Settings />
    </div>
  );
};

export default App;
