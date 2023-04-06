import React from 'react';
import LoginForm from '../components/LoginForm';
import avatar from '../images/avatar.jpg';

const LoginPage = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img className="rounded-circle" src={avatar} alt="logo" width="250" height="250" />
        </div>
        <LoginForm />
         <div className="card-footer p-4">
        <div className="text-center">
            <span>Нет аккаунта?</span>
            <a href="/signup">Регистрация</a>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginPage;
