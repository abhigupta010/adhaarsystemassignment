import React, { useState, useEffect } from 'react';
import '../App.css';
import RegisteredUserDetails from './RegisteredUserDetails';

const inputs = [
  { name: 'name', placeholder: 'Name', type: 'text' },
  { name: 'fathersName', placeholder: "Father's Name", type: 'text' },
  { name: 'dob', placeholder: 'Date of Birth', type: 'date' },
  { name: 'address', placeholder: 'Full Address', type: 'text' },
  { name: 'locality', placeholder: 'Locality', type: 'text' },
  { name: 'pinCode', placeholder: 'Pin Code', type: 'number' },
  { name: 'state', placeholder: 'State', type: 'text' },
  { name: 'contact', placeholder: 'Contact Details', type: 'number' }
];

const NewAdhaarFormReg = () => {
  const [user, setUser] = useState({
    name: '',
    fathersName: '',
    dob: '',
    address: '',
    locality: '',
    pinCode: '',
    state: '',
    contact: '',
    uid: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [users, setUsers] = useState(() => {
    const storedUsers = sessionStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (user.name && !/^[a-zA-Z\s]+$/.test(user.name)) {
      newErrors.name = 'Name can only contain alphabets';
    }
    if (user.fathersName && !/^[a-zA-Z\s]+$/.test(user.fathersName)) {
      newErrors.fathersName = 'Father Name can only contain alphabets';
    }
    if (user.state && !/^[a-zA-Z\s]+$/.test(user.state)) {
      newErrors.state = 'State can only contain alphabets';
    }
    if (user.pinCode && !/^\d{6}$/.test(user.pinCode)) {
      newErrors.pinCode = 'Pin Code must be exactly 6 digits';
    }
    if (user.contact && !/^\d{10}$/.test(user.contact)) {
      newErrors.contact = 'Contact must be exactly 10 digits';
    }
    return newErrors;
  };

  const generateUID = () => {
    const timestamp = Date.now().toString(); // Convert the current timestamp(ms) in string
    const randomNumbers = Array.from(timestamp, Number).slice(-8).join(''); //Creates an array where each element corresponds to a character in the timestamp string converted to a number
    return timestamp.slice(-8) + randomNumbers; //Concate the timestamp elements with randomNumbers
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const uid = generateUID();
      const newUser = { ...user, uid };
      setUser(newUser);
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      sessionStorage.setItem('users', JSON.stringify(updatedUsers));
      setSubmitted(true);
    }
  };

  return (
    <div className="app">
      {!submitted ? (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h1>Aadhar Card Registration</h1>
            <div className="input-grid">
              {inputs.map((input, index) => (
                <div key={index + input.name} className="input-field">
                  <input
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    value={user[input.name]}
                    required
                  />
                  {errors[input.name] && <small className="error">{errors[input.name]}</small>}
                </div>
              ))}
            </div>
            <button className='regButton' type="submit">Register</button>
          </form>
        </div>
      ) : (
        <div className="outer">
        <div className="content animated fadeInLeft">
          <span className="bg animated fadeInDown">Aadhar Card</span>
          <h1>{user.name}</h1>
          <p>Father Name: {user.fathersName}</p>
          <p>DOB: {user.dob}</p>
          <p>Contact: {user.contact}</p>
          <p>Address: {`${user.address}, ${user.locality}, ${user.state}, ${user.pinCode}`}</p>
          <div className="button">
            <h2 className="uid">UID - {user.uid}</h2>
          </div>
        </div>
        <img
          src="https://www.investopedia.com/thmb/hJrIBjjMBGfx0oa_bHAgZ9AWyn0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png"
          width="300px"
          className="qrcode"
          alt="QRCode"
        />
      </div>
      )}
    </div>
  );
};

export default NewAdhaarFormReg;
