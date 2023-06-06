import React, { useState } from 'react';
 import axios from 'axios';
 import "./register.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    country: '',
    state: '',
    city: '',
    dob: '',
    age:'',
  });

  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const countries = ['India', 'Pakistan', 'Japan']; // Replace with your country list from the database
  const states = ['Delhi', 'Islamabad', 'Tokyo']; // Replace with your states list from the database
  const cities = ['newDelhi', 'Lahore', 'osaka']; // Replace with your cities list from the database

  const handleChange = (e) => {
   
    const { name, value } = e.target;
     console.log(value)
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValid = validateForm();
    if (isValid) {
      try {
         const response = await axios.post('http://localhost:4000/users', formData);
       console.log(response.data);
  
        setIsFormSubmitted(true);
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validation logic for each field
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First Name must contain alphabets only';
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last Name must contain alphabets only';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
      isValid = false;
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
      isValid = false;
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }

    if (!formData.dob.trim()) {
      newErrors.dob = 'Date of Birth is required';
      isValid = false;
    } else {
      const today = new Date();
      const birthDate = new Date(formData.dob);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        formData.age = age - 1;
      } else {
        formData.age = age;
      }

      const minAge = 14;
      if (formData.age < minAge) {
        newErrors.dob = `You must be at least ${minAge} years old`;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div>
      {!isFormSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span>{errors.firstName}</span>}
            </label>
          </div>

          <div>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span>{errors.lastName}</span>}
            </label>
          </div>

          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span>{errors.email}</span>}
            </label>
          </div>

          <div>
             <label>
              Gender:
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />{' '}
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />{' '}
              Female
              <input
                type="radio"
                name="gender"
                value="lgbt"
                checked={formData.gender === 'LGBT'}
                onChange={handleChange}
              />{' '}
              LGBT
              {errors.gender && <span>{errors.gender}</span>}
          </label>
          </div>

          <div>
            <label>
              Country:
              <select name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && <span>{errors.country}</span>}
            </label>
          </div>

          <div>
            <label>
              State:
              <select name="state" value={formData.state} onChange={handleChange}>
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && <span>{errors.state}</span>}
            </label>
          </div>

          <div>
            <label>
              City:
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.city && <span>{errors.city}</span>}
            </label>
          </div>

          <div>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <span>{errors.dob}</span>}
            </label>
        
          </div>

          <button type="submit">Register</button>
        </form>
      ) : (
        <div>
          <h2>Registration Successful!</h2>
          <p>First Name: {formData.firstName}</p>
          <p>Last Name: {formData.lastName}</p>
          <p>Email: {formData.email}</p>
          <p>Gender: {formData.gender}</p>
          <p>Country: {formData.country}</p>
          <p>State: {formData.state}</p>
          <p>City: {formData.city}</p>
          <p>Date of Birth: {formData.dob}</p>
          <p>Age: {formData.age}</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;




