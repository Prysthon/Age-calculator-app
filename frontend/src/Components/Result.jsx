import React from 'react';

function Result({ result }) {
  return (
    <div className="result">
      <div className="result-item">
        <span className="number">{result.years}</span>
        <span className="label">anos</span>
      </div>
      <div className="result-item">
        <span className="number">{result.months}</span>
        <span className="label">meses</span>
      </div>
      <div className="result-item">
        <span className="number">{result.days}</span>
        <span className="label">dias</span>
      </div>
    </div>
  );
}

export default Result;
