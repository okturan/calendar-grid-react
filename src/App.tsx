import { useState } from "react";
import ToggleSwitch from "./components/ToggleSwitch";
import Calendar from "./components/Calendar";
import "./styles/style.css";
import "./styles/slider.css";

interface UsagePeriod {
  start: string; // format: "DD.MM"
  end: string; // format: "DD.MM"
  share: number; // 1-6 representing which unit share this usage period belongs to
}

export const usagePeriods: UsagePeriod[] = [
  { start: "15.05", end: "04.06", share: 1 },
  { start: "18.09", end: "02.10", share: 1 },
  { start: "21.12", end: "04.01", share: 1 },
  { start: "05.06", end: "25.06", share: 2 },
  { start: "03.10", end: "17.10", share: 2 },
  { start: "06.01", end: "20.01", share: 2 },
  { start: "26.06", end: "16.07", share: 3 },
  { start: "18.10", end: "01.11", share: 3 },
  { start: "22.01", end: "05.02", share: 3 },
  { start: "17.07", end: "06.08", share: 4 },
  { start: "31.03", end: "14.04", share: 4 },
  { start: "03.11", end: "17.11", share: 4 },
  { start: "15.04", end: "29.04", share: 5 },
  { start: "07.08", end: "27.08", share: 5 },
  { start: "19.11", end: "03.12", share: 5 },
  { start: "28.08", end: "17.09", share: 6 },
  { start: "30.04", end: "14.05", share: 6 },
  { start: "05.12", end: "19.12", share: 6 }
];

function App() {
  const [isHorizontal, setIsHorizontal] = useState<boolean>(false);

  return (
    <div>
      <div className="controls">
        <ToggleSwitch
          isChecked={isHorizontal}
          onChange={() => setIsHorizontal(!isHorizontal)}
          labelText={isHorizontal ? "Vertical Layout" : "Horizontal Layout"}
        />
      </div>
      <Calendar isHorizontal={isHorizontal} usagePeriods={usagePeriods} />
    </div>
  );
}

export default App;
