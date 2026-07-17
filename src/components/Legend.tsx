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
        <button
          type="button"
          key={shareId}
          className={`legend-item ${selectedShares.has(shareId) ? "selected" : ""}`}
          aria-pressed={selectedShares.has(shareId)}
          aria-label={`Highlight ${shareId} periods`}
          onClick={() => onToggleShare(shareId)}>
          <div className={`legend-color ${shareId}`}></div>
          <span>{shareId}</span>
        </button>
      ))}
      <div className="legend-item legend-maintenance">
        <div className="legend-color maintenance"></div>
        <span>Maintenance</span>
      </div>
    </div>
  );
};

export default Legend;
