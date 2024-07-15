import React, { useState } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import * as Realm from 'realm-web';
import './Login.css'; // Import CSS file

const app = new Realm.App({ id: process.env.REACT_APP_REALM_ID });

const Login = () => {
  const [e, setE] = useState(true);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const schema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', title: 'Tên đăng nhập' },
      password: { type: 'string', title: 'Mật khẩu', format: 'password' }
    }
  };

  const uiSchema = {
    "ui:submitButtonOptions": {
      "props": {
        "disabled": isLoading, // Disable submit button when loading
      },
      "norender": false,
      "submitText": "Đăng nhập",
    }
  };

  const onSubmit = async ({ formData }) => {
    setIsLoading(true);
    const { email, password } = formData;
    const credentials = Realm.Credentials.emailPassword(email, password);
    
    try {
     await app.logIn(credentials);
    
    
          window.location.href ="/3dauto"// Đợi hàm này hoàn thành
  
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      await app.emailPasswordAuth.sendResetPasswordEmail({ email });
      alert("Đã gửi email đặt lại mật khẩu thành công!");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container-wrapper'>
      <div className="containers">

        {e ? (
          <>
            <Form
              schema={schema}
              validator={validator}
              uiSchema={uiSchema}
              onSubmit={onSubmit}
              disabled={isLoading}
            />
            <div >
              <p >Quên mật khẩu?</p>
              <p
               
                onClick={() => setE(false)}
              >
                Đặt lại mật khẩu ngay!
              </p>
            </div>
            <p onClick={() => window.location.href ='/3dauto/register'}>Đăng ký tài khoản</p>
          </>
        ) : (
          <>
            <div>
              <form onSubmit={handleSubmit}>
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    disabled={isLoading}
                  />
                </label>
                <button type="submit" disabled={isLoading}>Submit</button>
              </form>
            </div>
            <p  onClick={() => setE(true)}>Trở lại đăng nhập</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
