import React, { useState } from 'react';
import './AgeCalculator.css';

function AgeCalculator() {
  // Estados para os campos do formulário
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  // Estado para erros de validação
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });
  
  // Estado para o resultado calculado
  const [result, setResult] = useState({ years: '--', months: '--', days: '--' });

  // Função para calcular a idade baseada na data de nascimento
  const calculateAge = (birthDate) => {
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Obtém o último dia do mês anterior
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days = prevMonthLastDay + days;
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    return { years, months, days };
  };

  // Função para tratar o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { day: '', month: '', year: '' };

    // Validação de campos vazios
    if (!day) {
      newErrors.day = 'Este campo é obrigatório';
      valid = false;
    }
    if (!month) {
      newErrors.month = 'Este campo é obrigatório';
      valid = false;
    }
    if (!year) {
      newErrors.year = 'Este campo é obrigatório';
      valid = false;
    }

    // Validação de intervalo numérico
    if (day && (Number(day) < 1 || Number(day) > 31)) {
      newErrors.day = 'Deve ser um dia válido';
      valid = false;
    }
    if (month && (Number(month) < 1 || Number(month) > 12)) {
      newErrors.month = 'Deve ser um mês válido';
      valid = false;
    }

    // Validação da data em si (incluindo datas inválidas, ex: 31/04/1991)
    if (day && month && year) {
      // Cria o objeto Date com parâmetros numéricos para evitar problemas de fuso horário
      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
      console.log(dateObj);

      if (
        dateObj.getFullYear() !== Number(year) ||
        dateObj.getMonth() !== Number(month) - 1 ||
        dateObj.getDate() !== Number(day)
      ) {
        newErrors.day = 'Deve ser uma data válida';
        valid = false;
      }
      // Verifica se a data é no futuro
      const today = new Date();
      if (dateObj > today) {
        newErrors.day = 'A data não pode ser no futuro';
        valid = false;
      }
    }

    setErrors(newErrors);

    // Se os dados forem válidos, calcula a idade e inicia a animação
    if (valid) {
      // Cria a data de nascimento utilizando o construtor com números
      const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
      const age = calculateAge(inputDate);
      animateResult(age);
    }
  };

  // Função para animar os números do resultado
  const animateResult = (finalAge) => {
    const duration = 1000; // duração da animação em ms
    const frameRate = 30;  // frames por segundo
    const totalFrames = duration / (1000 / frameRate);
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = Math.min(frame / totalFrames, 1);
      setResult({
        years: Math.floor(finalAge.years * progress),
        months: Math.floor(finalAge.months * progress),
        days: Math.floor(finalAge.days * progress)
      });
      if (progress === 1) {
        clearInterval(interval);
      }
    }, 1000 / frameRate);
  };

  return (
    <div className="age-calculator">
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
    </div>
  );
}

export default AgeCalculator;
