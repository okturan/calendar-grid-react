import MONTHS, { type Month } from "./Months";
import { getUsageShare } from "../calendar";
import type { ShareUnit } from "../types";

interface CalendarProps {
  isHorizontal: boolean;
  shares: ShareUnit;
  selectedShares: Set<string>;
}
const Calendar = ({ isHorizontal, shares, selectedShares }: CalendarProps) => {
  // Render the calendar grid with all months and their days
  // Apply appropriate styling based on usage periods and selections
  return (
    <div className={`calendar ${isHorizontal ? "horizontal" : "vertical"}`}>
      {MONTHS.map((month: Month, monthIndex: number) => (
        <div key={month.name} className="month-container">
          <div className="month">{month.name}</div>
          <div className={`days ${month.name}`}>
            {[...Array(month.days)].map((_, i) => {
              const day = i + 1;
              const shareId = getUsageShare(day, monthIndex, shares);
              const opacity = shareId && selectedShares.size > 0 ? (selectedShares.has(shareId) ? "" : "dimmed") : "";
              return (
                <div key={day} className={`day ${shareId ? `${shareId}` : "maintenance-pattern"} ${opacity}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
