import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../style/registerForm.css';

const RegisterForm = () => {
	
	const navigate = useNavigate();
	
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    country: 'US',
    age:'',
    password: '',
	gender:'',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await axios.post('/api/users', {
        name: formData.name,
        email: formData.email,
        phone: formData.phonenumber,
        password: formData.password,
        age:formData.age,
		gender:formData.gender,
      });
	  navigate(`/login`);
      // setSubmittedData(response.data);
      // setFormData({
      //   name: '',
      //   email: '',
      //   phonenumber: '',
      //   country: 'US',
      //   age:'',
      //   password: '',
      // });
    } catch (err) {
      console.error(err);
      setError('Failed to register. Please try again later.');
    }
  };

  return (
    <div>
      <form id="reservation-form" onSubmit={handleSubmit}>
        <h1>Register Form</h1>

        {/* Name */}
        <div className="form-row full-width">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div className="form-row full-width">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="form-row full-width">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="form-row full-width phone-row">
          <label htmlFor="phonenumber">Phone</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              style={{ flex: '0 0 100px' }} 
            >
              <option value="US">+1 (US)</option>
              <option value="IN">+91 (IN)</option>
              <option value="CA">+1 (CA)</option>
              <option value="EU">+44 (EU)</option>
            </select>
            <input
              type="tel"
              id="phonenumber"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
              style={{ flex: '1' }} 
            />
          </div>
        </div>

        {/* age */}
        <div className="form-row full-width">
          <label htmlFor="state">Age</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
		
		{/* gender */}
		<div className="form-row full-width">
		  <label htmlFor="state">Gender</label>
		  <select
		    id="gender"
		    name="gender"
		    value={formData.gender}
		    onChange={handleChange}
		  >
		    <option value="male">male</option>
		    <option value="female">female</option>
		  </select>
		</div>

        {/* Submit Button */}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default RegisterForm;
