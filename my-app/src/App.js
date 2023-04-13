import React, { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    product_name: '',
    cost: '',
    length: '',
    breadth:'',
    width:'',
    height:''
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

// Connection with python http request
    const response = await fetch('https://marginanalyzer.azurewebsites.net/api/Calculate?code=P8O3B27U6R6vdurncQ3jZPSsQ2BWCrLefzpQaTWbcsazAzFuP987fg==', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(result);
  };
  
// Frontend form  

}

export default MyForm;
