import { ShareUnit, SelectedShares } from "../App";

interface LegendProps {
  shares: ShareUnit;
  selectedShares: SelectedShares;
  onToggleShare: (shareId: string) => void;
}

const Legend = ({ shares, selectedShares, onToggleShare }: LegendProps) => {
  return (
    <div className="legend">
      {Object.keys(shares).map((shareId) => (
        <div
          key={shareId}
          className={`legend-item ${selectedShares.has(shareId) ? "selected" : ""}`}
          onClick={() => onToggleShare(shareId)}>
          <div className={`legend-color ${shareId}`}></div>
          <span>{shareId}</span>
        </div>
      ))}
      <div className="legend-item">
        <div className="legend-color maintenance"></div>
        <span>Maintenance</span>
      </div>
    </div>
  );
};

export default Legend;
