import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  // State for form field values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // State for error messages
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field if it has a value
    if (value.trim()) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check if name is empty
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Check if email is empty
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    // Check if message is empty
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Call the onSubmit callback with form data
      onSubmit({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });

      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setErrors({
        name: '',
        email: '',
        message: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        {errors.name && <div role="alert">{errors.name}</div>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <div role="alert">{errors.email}</div>}
      </div>

      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows="4"
        />
        {errors.message && <div role="alert">{errors.message}</div>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;