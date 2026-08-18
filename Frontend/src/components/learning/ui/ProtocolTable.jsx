import { memo } from 'react';

const ProtocolTable = memo(function ProtocolTable({ headers, rows, title }) {
  return (
    <div className="protocol-table-container">
      {title && <h4 className="protocol-table-title">{title}</h4>}
      <div className="protocol-table-scroll">
        <table className="protocol-table">
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .protocol-table-container {
          margin: 2rem 0;
        }

        .protocol-table-title {
          font-family: 'Sora', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #e6e9f0;
          margin: 0 0 1rem 0;
        }

        .protocol-table-scroll {
          overflow-x: auto;
          border-radius: 12px;
          background: rgba(10, 15, 25, 0.5);
          border: 1px solid rgba(45, 214, 143, 0.15);
        }

        .protocol-table {
          width: 100%;
          border-collapse: collapse;
          font-family: 'Oxanium', sans-serif;
        }

        .protocol-table thead {
          background: linear-gradient(135deg, rgba(45, 214, 143, 0.12), rgba(2, 168, 154, 0.12));
        }

        .protocol-table th {
          padding: 1rem 1.25rem;
          text-align: left;
          font-family: 'Sora', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          color: #2dd68f;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(45, 214, 143, 0.2);
        }

        .protocol-table tbody tr {
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(45, 214, 143, 0.08);
        }

        .protocol-table tbody tr:nth-child(even) {
          background: rgba(255, 255, 255, 0.02);
        }

        .protocol-table tbody tr:hover {
          background: rgba(45, 214, 143, 0.08);
          transform: scale(1.01);
        }

        .protocol-table td {
          padding: 1rem 1.25rem;
          font-size: 0.95rem;
          color: rgba(224, 224, 224, 0.9);
          line-height: 1.5;
        }

        .protocol-table td:first-child {
          color: #2dd68f;
          font-weight: 600;
        }

        .protocol-table code {
          background: rgba(45, 214, 143, 0.15);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
          color: #3de9a0;
        }

        @media (max-width: 768px) {
          .protocol-table th,
          .protocol-table td {
            padding: 0.75rem 1rem;
            font-size: 0.875rem;
          }

          .protocol-table th {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
});

export default ProtocolTable;
