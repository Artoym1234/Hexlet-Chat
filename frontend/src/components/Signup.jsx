import { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useFormik } from 'formik';
import AuthContext from '../contexts/index';
import routes from '../routes.js';
import avatar from '../images/avatar_1.jpg';
import getValidationSchema from '../validate';

const Signup = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const authContext = useContext(AuthContext);
  const inputRef = useRef();
  const { logIn } = authContext;

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: getValidationSchema('signUp')(),
    validateOnChange: true,

    onSubmit: (values) => {
      setAuthFailed(false);
      axios.post(routes.signUpPath(), values)
        .then((response) => {
          logIn(response.data.token, response.data.username);
          navigate('/');
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 409) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
          setAuthFailed(true);
        });
    },
  });

  return (
    <div className="row justify-content-center align-content-center flex-grow-1 bg-light">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="d-flex card shadow-sm">
          <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img src={avatar} alt="Регистрация" className="rounded-circle" />
            </div>
            <Form className="w-50" onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Регистрация</h1>

              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="username"
                  label="Имя пользователя"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="username"
                    id="username"
                    value={formik.values.username}
                    autoComplete="username"
                    isInvalid={!!formik.errors.username}
                    required
                    placeholder="Имя пользователя"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={inputRef}
                    className={authFailed ? ' form-control is-invalid' : 'form-control'}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </FloatingLabel>

              </Form.Group>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="password"
                  label="Пароль"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    autoComplete="password"
                    isInvalid={!!formik.errors.password}
                    required
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={inputRef}
                    className={authFailed ? 'mb-3 form-control is-invalid' : 'form-control'}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </FloatingLabel>

              </Form.Group>
              <Form.Group className="mb-4">
                <FloatingLabel
                  controlId="passwordConfirm"
                  label="Подтвердите пароль"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    value={formik.values.passwordConfirm}
                    autoComplete="passwordConfirm"
                    isInvalid={!!formik.errors.passwordConfirm}
                    required
                    placeholder="Пароль"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    ref={inputRef}
                    className={authFailed ? 'mb-3 form-control is-invalid' : 'form-control'}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.passwordConfirm}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Form.Group>
              {authFailed ? <div className="invalid-feedback d-block">Такой пользователь уже существует</div> : null}
              <Button className="w-100" variant="outline-primary" type="submit">
                Зарегистироваться
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
