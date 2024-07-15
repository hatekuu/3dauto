import React, { useState } from 'react';
import * as Realm from 'realm-web';
import { useNavigate } from 'react-router-dom';
const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });

const Confirmps = () => {
  const navigate= useNavigate()
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const tokenId = params.get("tokenId");

    if (!token || !tokenId) {
      throw new Error("Error: Missing token or tokenId");
    }

    try {
      await app.emailPasswordAuth.resetPassword({
        password,  // Sử dụng giá trị password từ state
        token,
        tokenId,
      });
      navigate('/3dauto')
      console.log("Password reset successful");
    } catch (error) {
      console.error("Failed to reset password:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          
          />
        </label>
        <button type="submit">Xác nhận</button>
      </form>
    </div>
  );
};

export default Confirmps;
