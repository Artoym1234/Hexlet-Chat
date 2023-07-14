import React, {
  useRef, useEffect, useState,
} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useAuth } from '../contexts/AuthProvider.jsx';
import { apiRoutes, pageRoutes } from '../../routes.js';
import avatar from '../../images/avatar.jpg';
import Tooltip from '../commonComponents/Tooltip.jsx';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const pasRef = useRef();
  const navigate = useNavigate();

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
        .required('errors.requiredField'),
      password: yup.string()
        .required('errors.requiredField'),
    }),
    validateOnChange: true,

    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(apiRoutes.loginPath(), values);
        auth.logIn(data);
        navigate(pageRoutes.mainPage());
      } catch (err) {
        formik.setSubmitting(false);
        const trowAxiosErr = () => {
          const { code } = err;
          switch (code) {
            case 'ERR_NETWORK':
              return auth.notify('error', t('logIn.errors.network_error'));
            default:
              return setAuthFailed(true);
          }
        };
        trowAxiosErr();
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
                <h1 className="text-center mb-4">{t('logIn.title')}</h1>
                <fieldset disabled={formik.isSubmitting}>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="username"
                      label={t('placeholder.username_login')}
                      className="mb-3"
                    >
                      <Form.Control
                        name="username"
                        type="text"
                        className={formik.touched.username
                          && formik.errors.username ? 'is-invalid' : ''}
                        required
                        isInvalid={!!formik.errors.username}
                        placeholder={t('placeholder.username_login')}
                        autocomplite="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        ref={inputRef}
                      />
                    </FloatingLabel>
                    <Tooltip
                      target={inputRef.current}
                      show={formik.errors.username && formik.touched.username}
                      text={t(formik.errors.username)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <FloatingLabel
                      controlId="password"
                      label={t('placeholder.password')}
                      className="mb-3"
                    >
                      <Form.Control
                        name="password"
                        type="password"
                        className={formik.touched.password
                            && formik.errors.password ? 'is-invalid' : ''}
                        isInvalid={!!formik.errors.password}
                        required
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
                    <Tooltip
                      target={pasRef.current}
                      show={formik.errors.password && formik.touched.password}
                      text={t(formik.errors.password)}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 btn btn-outline-primary"
                  >
                    {t('logIn.button')}
                  </Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer text-muted p-4">
              <div className="text-center">
                <span>{t('logIn.new_user')}</span>
                {' '}
                <a href={pageRoutes.signUpPage()}>{t('signUp.title')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
