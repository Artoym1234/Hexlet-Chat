import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import avatar from '../images/avatar.jpg';

const LoginForm = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    validationSchema: Yup.object({
      username: Yup.string('Required')
        .min(0, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
      password: Yup.string()
        .min(0, 'Too Short!')
        .max(15, 'Too Long!')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || {
          from: { pathname: routes.mainPage() },
        };
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100 p-5">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={avatar} className="rounded-circle" alt="Войти" />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">Войти</h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    type="login"
                    className={
                      authFailed
                        ? 'mb-3 form-control is-invalid'
                        : 'mb-3 form-control'
                    }
                    required
                    isInvalid={authFailed}
                    placeholder="Ваш ник"
                    autocomplite="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    className={
                      authFailed
                        ? 'mb-3 form-control is-invalid'
                        : 'mb-3 form-control'
                    }
                    required
                    isInvalid={authFailed}
                    placeholder="Пароль"
                    autoсomplite="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Неверные имя пользователя или пароль
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 btn btn-outline-primary"
                >
                  Войти
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
