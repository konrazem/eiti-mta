import React from 'react';

/**
 * useForm
 * @param {Function} callback function that operate on inputs
 * @returns {Object}  
 */
const useForm = (state, callback) => {
  const [inputs, setInputs] = React.useState(state);
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
  }
  const handleInputChange = (event) => {
    event.persist();
    setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
  }
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
}

export default useForm;