import React, {
  useRef, useEffect, useContext, useState,
} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import cn from 'classnames';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import avatar from '../images/avatar.jpg';
import AuthContext from '../contexts/index';
import Tooltip from '../components/Tooltip';
import Loading from '../components/Loading.jsx';

const LoginForm = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const pasRef = useRef();
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
      username: yup.string()
        .required('Required'),
      password: yup.string()
        .required('Required'),
    }),

    onSubmit: (values) => {
      setAuthFailed(false);
      setLoading(true);
      axios.post(routes.loginPath(), values)
        .then((response) => {
          auth.logIn(response.data.token, response.data.username);
          console.log(response);
          if (response.status === 200) {
            setLoading(false);
            navigate('/');
          }
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError) {
            if (err.message === 'Network Error') {
              notify('error', t('logIn.errors.network_error'));
              return;
            }
            if (err.response.status === 401) {
              setAuthFailed(true);
              setLoading(false);
              inputRef.current.select();
            }
          }
        });
    },
  });

  return (
    <div>
      {loading ? <Loading /> : null};
      <div className={cn('container-fluid', 'h-100', { 'd-none': loading === true })}>
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

                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="username"
                      label={t('placeholder.username_login')}
                      className="mb-3"
                    >
                      <Form.Control
                      // id="username"
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
                    </FloatingLabel>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <FloatingLabel
                      controlId="password"
                      label={t('placeholder.password')}
                      className="mb-3"
                    >
                      <Form.Control
                      // id="password"
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
                        ref={pasRef}
                      />
                      <Tooltip
                        target={pasRef.current}
                        show={authFailed}
                        text={t('logIn.errors.authorization')}
                      />
                    </FloatingLabel>

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
              <div className="card-footer text-muted p-4">
                <div className="text-center">
                  <span>{t('logIn.new_user')}</span>
                  {' '}
                  <a href="/signup">{t('signUp.button')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
