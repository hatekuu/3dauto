import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import * as Realm from "realm-web";
import './Login.css'; // Import CSS file
const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });

const Register = ( ) => {
  const [isLoading, setIsLoading] = useState(false);
  const schema = {
    type: 'object',
    required: ['email', 'password', 'confirm'],
    properties: {
      email: { type: 'string', title: 'Tên đăng nhập' },
      password: { type: 'string', title: 'Mật khẩu', format: 'password' },
      confirm: { type: 'string', title: 'Xác nhận mật khẩu', format: 'password' }
    }
  };

  const uiSchema = {
    "ui:submitButtonOptions": {
      "props": {
        "disabled": false,
      },
      "norender": false,
      "submitText": "Đăng ký",
    }
  };

  const onSubmit = async ({ formData }) => {
    setIsLoading(true);
    const { email, password, confirm } = formData;
    if (password === confirm) {
      try {
        await app.emailPasswordAuth.registerUser({ email, password });
        window.location.href ='/3dauto/login'
        window.location.reload();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('password not match');
      setIsLoading(false);
    }
  };

  return (
    <div className='container-wrapper'>
    <div className="containers">
      {isLoading && <div className="spinner">Loading...</div>}
      <Form
        schema={schema}
        validator={validator}
        uiSchema={uiSchema}
        onSubmit={onSubmit}
        disabled={isLoading}
      />
      <p className="text-blue-500  mt-4 cursor-pointer  hover:underline"  onClick={() => window.location.href ='/3dauto/login'}>Trở lại đăng nhập</p>
    </div></div>
  );
};

export default Register;
