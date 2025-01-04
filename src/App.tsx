import { useState } from 'react';
import ToggleSwitch from './components/ToggleSwitch';
import Calendar from './components/Calendar';
import './styles/style.css';
import './styles/slider.css';

interface DateRange {
  start: string; // format: "DD.MM"
  end: string; // format: "DD.MM"
}

function App() {
  const [isHorizontal, setIsHorizontal] = useState<boolean>(false);
  
  // Initial highlight ranges from the original implementation
  const highlights: DateRange[] = [
    { start: "26.06", end: "16.07" },
    { start: "18.10", end: "01.11" },
    { start: "22.01", end: "05.02" }
  ];

  return (
    <div>
      <div className="controls">
        <ToggleSwitch
          isChecked={isHorizontal}
          onChange={() => setIsHorizontal(!isHorizontal)}
          labelText={isHorizontal ? "Vertical Layout" : "Horizontal Layout"}
        />
      </div>
      <Calendar 
        isHorizontal={isHorizontal}
        highlights={highlights}
      />
    </div>
  );
}

export default App;
