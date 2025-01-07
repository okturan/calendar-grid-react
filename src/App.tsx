import { useState } from "react";
import ToggleSwitch from "./components/ToggleSwitch";
import Calendar from "./components/Calendar";
import "./styles/style.css";
import "./styles/slider.css";

export type DateString = string; // Format: "DD.MM"
export type SelectedShares = Set<string>;
export type UsagePeriod = [DateString, DateString];

export interface ShareUnit {
  [shareId: string]: UsagePeriod[]; // Each share has exactly 3 usage periods
}

export const shares: ShareUnit = {
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
  const [selectedShares, setSelectedShares] = useState<SelectedShares>(new Set());

  const toggleShare = (shareId: string) => {
    setSelectedShares(prev => {
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
        <div className="legend">
          {Object.keys(shares).map((shareId) => (
            <div
              key={shareId}
              className={`legend-item ${selectedShares.has(shareId) ? 'selected' : ''}`}
              onClick={() => toggleShare(shareId)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleShare(shareId);
                  e.preventDefault();
                }
              }}
            >
              <div className={`legend-color ${shareId}`}></div>
              <span>{shareId}</span>
            </div>
          ))}
          <div className="legend-item">
            <div className="legend-color maintenance"></div>
            <span>Maintenance</span>
          </div>
        </div>
        <ToggleSwitch
          isChecked={isHorizontal}
          onChange={() => setIsHorizontal(!isHorizontal)}
          labelText={isHorizontal ? "Horizontal Layout" : "Vertical Layout"}
        />
      </div>
      <Calendar
        isHorizontal={isHorizontal}
        shares={shares}
        selectedShares={selectedShares}
      />
    </>
  );
}

export default App;
