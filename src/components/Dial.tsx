import {
  useContext,
  useLayoutEffect,
  useEffect,
  useState,
  useRef,
} from "react";
import { SettingsContext } from "../context/SettingsContext";
import { Session } from "../types/types";
import { alarmOptions, ringColors } from "../constants/constants";

interface DialProps {
  selectedSession: Session;
  parentWidth: number;
}

const Dial = ({ selectedSession, parentWidth }: DialProps) => {
  const { colorSetting, timeSettings, alarmSound } =
    useContext(SettingsContext).settings;

  // Derive the total time for the selected session.
  const totalMinutes =
    selectedSession === "pomodoro"
      ? timeSettings.pomodoro
      : selectedSession === "short"
      ? timeSettings.short
      : timeSettings.long;

  // Convert minutes to seconds.
  const totalTime = totalMinutes * 60;

  // State for remaining time and timer running status.
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // whether alarm is active or not
  const [isAlarmActive, setIsAlarmActive] = useState<boolean>(false);

  const alarmAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const selectedAlarm = alarmOptions.find(
      (option) => option.value === alarmSound
    );
    if (selectedAlarm) {
      alarmAudioRef.current = new Audio(selectedAlarm.value);
      alarmAudioRef.current.loop = true;
    }
  }, [alarmSound]);

  /**
   * useLayoutEffect ensures that the updates for timeLeft and isRunning
   * happen before the browser paints, reducing any flash of old state.
   */
  useLayoutEffect(() => {
    setTimeLeft(totalTime);
    setIsRunning(false);
  }, [totalTime]);

  // Format the remaining time as MM:SS.
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const formattedTime = `${minutes}:${seconds}`;

  // Countdown logic: decrement timeLeft every second while running.
  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Timer reached zero: stop and reset
      setIsRunning(false);
      setTimeLeft(totalTime);
      setIsAlarmActive(true);
      // Start playing the alarm
      alarmAudioRef.current?.play();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, totalTime, isAlarmActive]);

  // Toggle the timer between run/paused states.
  const toggleTimer = () => {
    // If timer just finished, reset first.
    if (timeLeft === 0) setTimeLeft(totalTime);
    setIsRunning((prev) => !prev);
  };

  // Reset the timer to the initial session value, pausing it.
  const resetTimer = () => {
    if (isAlarmActive) return;
    setTimeLeft(totalTime);
    setIsRunning(false);
  };

  // Stop the alarm when user clicks the stop alarm button
  const stopAlarm = () => {
    if (alarmAudioRef.current) {
      alarmAudioRef.current.pause();
      alarmAudioRef.current.currentTime = 0;
    }
    setIsAlarmActive(false);
    setTimeLeft(totalTime);
    setIsRunning(false);
  };

  // Determine visibility for reset button
  const isResetVisible = timeLeft < totalTime && timeLeft > 0;

  // Compute a responsive radius.
  // For example, if parentWidth is less than 450, we set the radius based on parentWidth.
  // Otherwise, use the fixed value 339.
  const isParentSmall = parentWidth <= 500;

  const fixedRadius = 339;
  const dynamicRadius = isParentSmall ? parentWidth * 0.9 : fixedRadius;
  const radius = isParentSmall ? dynamicRadius : fixedRadius;

  // Progress ring calculations.
  const strokeWidth = 11;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = timeLeft / totalTime;
  const strokeDashOffset = circumference * (1 - progress);
  return (
    <>
      <div
        className="relative bg-midnight rounded-full
          w-[70vw] h-[70vw] sm:w-[410px] sm:h-[410px]
          min-w-[320px] min-h-[320px]
          flex items-center justify-center
          shadow-2xl shadow-[#2e3258]"
      >
        {/* Progress ring using SVG instead of a border */}
        <div
          className="absolute w-[90%] h-[90%] min-w-[300px] min-h-[300px] 
        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            width="100%"
            height="100%"
            className="transform -rotate-90"
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          >
            {/* Background circle */}
            <circle
              stroke="inherit"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress circle */}
            <circle
              stroke={ringColors[colorSetting]}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashOffset}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
        </div>

        {/* Center content with time and buttons */}
        <div className="relative z-10 flex flex-col items-center">
          {isAlarmActive ? (
            // When alarm is active, show only the Stop Alarm button.
            <button
              onClick={stopAlarm}
              className="text-[40px] sm:text-[60px] 
              text-softIndigo tracking-[15px] sm:tracking-[13.13px] 
              font-bold cursor-pointer p-2"
            >
              STOP ALARM
            </button>
          ) : (
            <>
              <button
                onClick={resetTimer}
                className="text-[16px] sm:text-[14px] text-softIndigo tracking-[15px] sm:tracking-[13.13px] font-bold cursor-pointer p-2"
                style={{ visibility: isResetVisible ? "visible" : "hidden" }}
              >
                RESET
              </button>

              <div className="text-[80px] sm:text-[100px] text-softIndigo">
                {formattedTime}
              </div>

              <button
                onClick={toggleTimer}
                className="text-[16px] sm:text-[14px] text-softIndigo tracking-[15px] sm:tracking-[13.13px] font-bold cursor-pointer p-2"
              >
                {isRunning ? "PAUSE" : "START"}
              </button>
            </>
          )}{" "}
        </div>
      </div>
    </>
  );
};

export default Dial;
