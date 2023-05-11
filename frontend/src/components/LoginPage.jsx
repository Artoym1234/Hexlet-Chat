import React, {
  useRef, useEffect, useContext, useState,
} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import avatar from '../images/avatar.jpg';
import AuthContext from '../contexts/index';

const LoginForm = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { notify } = authContext;

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      username: yup.string('Required')
        .required('Required'),
      password: yup.string()
        .required('Required'),
    }),

    onSubmit: (values) => {
      setAuthFailed(false);
      axios.post(routes.loginPath(), values)
        .then((response) => {
          auth.logIn(response.data.token, response.data.username);
          navigate('/');
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError) {
            if (err.message === 'Network Error') {
              notify('error', t('feedback.error_network'));
              return;
            }
            if (err.response.status === 401) {
              setAuthFailed(true);
              inputRef.current.select();
            }
          }
        });
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
                <h1 className="text-center mb-4">{t('logIn.title')}</h1>

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
                    placeholder={t('placeholder.username_login')}
                    autocomplite="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('placeholder.username_login')}</Form.Label>
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
                    placeholder={t('placeholder.password')}
                    autoсomplite="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Label htmlFor="password">{t('placeholder.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {t('logIn.errors.authorization')}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 btn btn-outline-primary"
                >
                  {t('logIn.button')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('logIn.new_user')}</span>
                <a href="/signup">{t('signUp.title')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
