import {
  useState, useContext, useEffect, useRef,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import avatar from '../images/avatar_1.jpg';
import AuthContext from '../contexts/index';
import getValidationSchema from '../validate.js';
import Tooltip from '../components/Tooltip.jsx';

const Signup = () => {
  const targetUsername = useRef();
  const targetPassword = useRef();
  const targetPasswordConf = useRef();
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const { notify } = authContext;

  useEffect(() => {
    targetUsername.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: getValidationSchema('signUp')(),
    validateOnChange: true,

    onSubmit: (values) => {
      axios.post(routes.signUpPath(), values)
        .then((response) => {
          auth.logIn(response.data.token, response.data.username);
          navigate('/');
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError) {
            if (err.message === 'Network Error') {
              notify('error', t('signUp.errors.network_error'));
              return;
            }
            if (err.response.status === 409) {
              inputRef.current.select();
              setAuthFailed(true);
            }
          }
        });
    },
  });

  return (
    <div className="row justify-content-center align-content-center flex-grow-1 bg-light">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="d-flex card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src={avatar} alt={t('signUp.title')} className="rounded-circle" />
            </div>
            <Form className="w-50" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">{t('signUp.title')}</h1>
              <Form.Group className="mb-3">
                <FloatingLabel controlId="username" label={t('placeholder.username')} className="mb-3">
                  <Form.Control
                    id="username"
                    name="username"
                    value={formik.values.username}
                    placeholder={t('placeholder.username')}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={targetUsername}
                    className={formik.touched.username
                    && formik.errors.username ? 'is-invalid' : ''}
                    isInvalid={!!formik.errors.username}
                  />
                </FloatingLabel>
                <Tooltip
                  target={targetUsername.current}
                  show={formik.errors.username && formik.touched.username}
                  text={formik.errors.username}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel controlId="password" label={t('placeholder.password')} className="mb-3">
                  <Form.Control
                    name="password"
                    type="password"
                    id="password"
                    placeholder={t('placeholder.password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={targetPassword}
                    className={formik.touched.username
                      && formik.errors.username ? 'is-invalid' : ''}
                    isInvalid={!!formik.errors.password}
                  />
                </FloatingLabel>
                <Tooltip
                  target={targetPassword.current}
                  show={formik.errors.password && formik.touched.password}
                  text={formik.errors.password}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <FloatingLabel controlId="passwordConfirm" label={t('placeholder.passwordConfirm')} className="mb-3">
                  <Form.Control
                    name="passwordConfirm"
                    type="password"
                    id="passwordConfirm"
                    placeholder={t('placeholder.passwordConfirm')}
                    value={formik.values.passwordConfirm}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={targetPasswordConf}
                    className={formik.touched.username
                      && formik.errors.username ? 'is-invalid' : ''}
                    isInvalid={!!formik.errors.passwordConfirm}
                  />
                </FloatingLabel>
                <Tooltip
                  target={targetPasswordConf.current}
                  show={formik.errors.passwordConfirm && formik.touched.passwordConfirm}
                  text={formik.errors.passwordConfirm}
                />
              </Form.Group>

              {authFailed ? <div className="invalid-feedback d-block">{t('signUp.errors.user_registered')}</div> : null}

              <Button className="w-100" variant="outline-primary" type="submit">
                {t('signUp.button')}
              </Button>

            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
