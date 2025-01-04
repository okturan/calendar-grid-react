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

export const periods = {
  share1: [
    ["15.05", "04.06"],
    ["18.09", "02.10"],
    ["21.12", "04.01"],
  ],
  share2: [
    ["05.06", "25.06"],
    ["03.10", "17.10"],
    ["06.01", "20.01"],
  ],
  share3: [
    ["26.06", "16.07"],
    ["18.10", "01.11"],
    ["22.01", "05.02"],
  ],
  share4: [
    ["17.07", "06.08"],
    ["31.03", "14.04"],
    ["03.11", "17.11"],
  ],
  share5: [
    ["15.04", "29.04"],
    ["07.08", "27.08"],
    ["19.11", "03.12"],
  ],
  share6: [
    ["28.08", "17.09"],
    ["30.04", "14.05"],
    ["05.12", "19.12"],
  ],
};

function App() {
  const [isHorizontal, setIsHorizontal] = useState<boolean>(false);

  // Convert periods data to usage periods array
  const usagePeriods: UsagePeriod[] = Object.entries(periods).flatMap(([share, dateRanges]) =>
    dateRanges.map(([start, end]) => ({
      start,
      end,
      share: parseInt(share.replace("share", "")),
    })),
  );

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
