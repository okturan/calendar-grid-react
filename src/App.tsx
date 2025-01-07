import { useState } from "react";
import OrientationSwitch from "./components/OrientationSwitch";
import Calendar from "./components/Calendar";
import Legend from "./components/Legend";
import { shares } from "./data/shares";
import "./styles/style.css";
import "./styles/slider.css";

// Format: "DD.MM"
export type DateString = string;
export type SelectedShares = Set<string>;
export type UsagePeriod = [DateString, DateString];

export interface ShareUnit {
  [shareId: string]: UsagePeriod[];
}

function App() {
  const [isHorizontal, setIsHorizontal] = useState<boolean>(false);
  const [selectedShares, setSelectedShares] = useState<SelectedShares>(new Set());

  // Toggles selection state of a share for highlighting
  const toggleShare = (shareId: string) => {
    setSelectedShares((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(shareId)) {
        newSet.delete(shareId);
      } else {
        newSet.add(shareId);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="controls">
        <Legend shares={shares} selectedShares={selectedShares} onToggleShare={toggleShare} />
        <OrientationSwitch
          isHorizontal={isHorizontal}
          onChange={() => setIsHorizontal(!isHorizontal)}
        />
      </div>
      <Calendar isHorizontal={isHorizontal} shares={shares} selectedShares={selectedShares} />
    </>
  );
}

export default App;
