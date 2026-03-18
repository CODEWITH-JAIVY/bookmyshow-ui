import React from 'react';

export default function SeatMap({ allSeats, availableIds, selectedIds, onToggle }) {

  // seatNumber se row aur col extract karo (A1 → row=A, col=1)
  const getRow = (seat) => {
    if (seat.seatRow) return seat.seatRow;
    if (seat.row) return seat.row;
    return seat.seatNumber?.charAt(0) || '?';
  };

  const getCol = (seat) => {
    if (seat.seatCol) return seat.seatCol;
    if (seat.col) return seat.col;
    return parseInt(seat.seatNumber?.slice(1)) || 0;
  };

  // Group by row
  const rows = {};
  allSeats.forEach(seat => {
    const r = getRow(seat);
    if (!rows[r]) rows[r] = [];
    rows[r].push(seat);
  });

  return (
    <div className="seat-map-wrapper">
      <div className="screen-label">SCREEN</div>
      <div className="screen-indicator"></div>
      <div className="seat-map">
        {Object.keys(rows).sort().map(row => (
          <div className="seat-row" key={row}>
            <div className="seat-row-label">{row}</div>
            {rows[row]
              .sort((a, b) => getCol(a) - getCol(b))
              .map(seat => {
                const isSelected  = selectedIds.includes(seat.id);
                const isAvailable = availableIds.includes(seat.id);

                let cls = 'seat';
                if (isSelected)       cls += ' selected';
                else if (isAvailable) cls += ' available';
                else                  cls += ' booked';

                if (seat.seatType === 'VIP')     cls += ' vip';
                if (seat.seatType === 'PREMIUM') cls += ' premium';

                return (
                  <div
                    key={seat.id}
                    className={cls}
                    title={`${seat.seatNumber} - ${seat.seatType}`}
                    style={{ cursor: isAvailable ? 'pointer' : isSelected ? 'pointer' : 'not-allowed' }}
                    onClick={() => {
                      if (isAvailable || isSelected) onToggle(seat);
                    }}
                  >
                    {seat.seatNumber}
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      <div className="seat-legend">
        <div className="seat-legend-item">
          <div className="seat-legend-box available-box"></div> Available
        </div>
        <div className="seat-legend-item">
          <div className="seat-legend-box selected-box"></div> Selected
        </div>
        <div className="seat-legend-item">
          <div className="seat-legend-box booked-box"></div> Booked
        </div>
        <div className="seat-legend-item">
          <div className="seat-legend-box vip-box"></div> VIP
        </div>
        <div className="seat-legend-item">
          <div className="seat-legend-box premium-box"></div> Premium
        </div>
      </div>
    </div>
  );
}