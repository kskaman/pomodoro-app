import { useState } from "react";
import settingsIcon from "../assets/icon-settings.svg";
import SettingsModal from "./SettingsModal";

const Settings = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="cursor-pointer">
        <img src={settingsIcon} alt="Open settings" />
      </button>

      {open && <SettingsModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default Settings;
