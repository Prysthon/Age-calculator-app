export const calculateAge = (birthDate) => {
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

export const animateResult = (finalAge, setResult) => {
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

export const handleSubmit = (
  e,
  day,
  month,
  year,
  setErrors,
  calculateAge,
  animateResult,
  setResult
) => {
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
    animateResult(age, setResult);
  }
};
