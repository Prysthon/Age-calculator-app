import React, { useState } from 'react';
import './AgeCalculator.css';
import InputsAndButton from './InputsAndButton';
import Result from './Result';
import { calculateAge, animateResult, handleSubmit as importedHandleSubmit } from '../Assets/functions';

function AgeCalculator() {
  // Estados para os campos do formulário
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  
  // Estado para erros de validação
  const [errors, setErrors] = useState({ day: '', month: '', year: '' });
  
  // Estado para o resultado calculado
  const [result, setResult] = useState({ years: '--', months: '--', days: '--' });

  // Cria uma função wrapper para handleSubmit que passa os parâmetros necessários
  const handleSubmit = (e) => {
    importedHandleSubmit(e, day, month, year, setErrors, calculateAge, animateResult, setResult);
  };

  return (
    <div className="age-calculator">
      <InputsAndButton
        handleSubmit={handleSubmit}
        day={day}
        setDay={setDay}
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        errors={errors}
      />
      <Result result={result} />
    </div>
  );
}

export default AgeCalculator;
