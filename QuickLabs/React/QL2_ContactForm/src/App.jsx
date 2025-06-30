import React from 'react';
import ContactForm from './ContactForm';

function App() {
  const handleFormSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
    // Here you would typically send the data to a server
    alert(`Thank you ${formData.name}! Your message has been sent.`);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Contact Us</h1>
      <ContactForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;