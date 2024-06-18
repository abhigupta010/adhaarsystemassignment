import React, { useEffect, useState } from 'react';
import '../App.css';

function RegisteredUserDetails() {
  const [userData, setUserData] = useState([])
  useEffect(() => {
    const storedUsers = JSON.parse(sessionStorage.getItem('users'));
    setUserData(storedUsers);
  }, []);


  return (
    <>
      {!userData ? (
        <div className="no-user">
          <h2>No user found</h2>
        </div>
      ) : (
        <div className="user-list">
          {userData?.map((user, index) => (
            <div key={index} className="outer">
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
                className="qrcode"
                alt="QRCode"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default RegisteredUserDetails;
