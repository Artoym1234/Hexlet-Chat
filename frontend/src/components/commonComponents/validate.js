import * as yup from 'yup';

const GetValidationSchema = (shemaName) => {
  const shemas = {
    schemaChannelName: (channelsName) => yup.object().shape({
      nameChannel: yup
        .string('')
        .required('errors.requiredField')
        .trim()
        .min(3, 'errors.incorrectChannelNameLength')
        .max(20, 'errors.incorrectChannelNameLength')
        .notOneOf(channelsName, 'errors.needUnique'),
    }),
    signUp: () => yup.object().shape({
      username: yup
        .string()
        .required('errors.requiredField')
        .min(3, 'errors.incorrectUsernameLength')
        .max(20, 'errors.incorrectUsernameLength'),
      password: yup
        .string()
        .required('errors.requiredField')
        .min(6, 'errors.incorrectMinPasswordLength'),
      passwordConfirm: yup
        .string()
        .required('errors.requiredField')
        .oneOf([yup.ref('password'), null], 'errors.shouldConfirm'),
    }),
  };
  return shemas[shemaName];
};

export default GetValidationSchema;
