import React from 'react';

function InputsAndButton({ handleSubmit, day, setDay, month, setMonth, year, setYear, errors }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <div className="input-field">
          <label>DIA</label>
          <input 
            type="number" 
            placeholder="DD" 
            value={day} 
            onChange={(e) => setDay(e.target.value)}
          />
          {errors.day && <span className="error">{errors.day}</span>}
        </div>
        <div className="input-field">
          <label>MÊS</label>
          <input 
            type="number" 
            placeholder="MM" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)}
          />
          {errors.month && <span className="error">{errors.month}</span>}
        </div>
        <div className="input-field">
          <label>ANO</label>
          <input 
            type="number" 
            placeholder="YYYY" 
            value={year} 
            onChange={(e) => setYear(e.target.value)}
          />
          {errors.year && <span className="error">{errors.year}</span>}
        </div>
      </div>
      <button type="submit" className="submit-button">
        Calcular
      </button>
    </form>
  );
}

export default InputsAndButton;
