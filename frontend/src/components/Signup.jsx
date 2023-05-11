import {
  useState, useEffect, useContext, useRef,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import avatar from '../images/avatar_1.jpg';
import AuthContext from '../contexts/index';
import getValidationSchema from '../validate';

const Signup = () => {
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);
  const [authFailed, setAuthFailed] = useState(false);
  const auth = useAuth();
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
      passwordConfirm: '',
    },
    validationSchema: getValidationSchema('signUp')(),
    validateOnChange: false,

    onSubmit: (values) => {
      setAuthFailed(false);
      axios.post(routes.signUpPath(), values)
        .then((response) => {
          auth.logIn(response.data.token, response.data.username);
          navigate('/');
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError) {
            if (err.message === 'Network Error') {
              notify('error', t('feedback.error_network'));
              setAuthFailed(true);
              return;
            }
            if (err.response.status === 409) {
              setAuthFailed(true);
              inputRef.current.select();
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

              <Form.Group className=" form-floating mb-3">
                <Form.Control
                  type="text"
                  name="username"
                  id="username"
                  className={
                    authFailed
                      ? ' form-control is-invalid'
                      : 'form-control'
                  }
                  required
                  isInvalid={formik.errors.username}
                  placeholder={t('placeholder.username')}
                  autoComplete="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  ref={inputRef}
                />
                <Form.Label htmlFor="username">{t('placeholder.username')}</Form.Label>

                <Form.Control.Feedback type="invalid">

                  {formik.touched.username && formik.errors.username ? (
                    <div>{formik.errors.username}</div>
                  ) : null}
                </Form.Control.Feedback>

              </Form.Group>

              <Form.Group className="form-floating mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  value={formik.values.password}
                  autoComplete="password"
                  isInvalid={formik.errors.password}
                  required
                  placeholder={t('placeholder.password')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={authFailed ? 'mb-3 form-control is-invalid' : 'form-control'}
                />
                <Form.Label htmlFor="username">{t('placeholder.password')}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {formik.touched.password && formik.errors.password ? (
                    <div>{formik.errors.password}</div>
                  ) : null}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-floating mb-4">
                <Form.Control
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  value={formik.values.passwordConfirm}
                  autoComplete="passwordConfirm"
                  isInvalid={formik.errors.passwordConfirm}
                  required
                  placeholder={t('placeholder.passwordConfirm')}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={authFailed ? 'mb-3 form-control is-invalid' : 'form-control'}
                />
                <Form.Label htmlFor="username">{t('placeholder.passwordConfirm')}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                    <div>{formik.errors.passwordConfirm}</div>
                  ) : null}
                </Form.Control.Feedback>
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
