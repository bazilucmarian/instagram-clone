import { useState, useEffect } from 'react';

export const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
};
