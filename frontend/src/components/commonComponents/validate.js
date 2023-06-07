import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const GetValidationSchema = (shemaName) => {
  const { t } = useTranslation();

  const shemas = {
    schemaChannelName: (channelsName) => yup.object().shape({
      nameChannel: yup
        .string('')
        .required(t('errors.requiredField'))
        .trim()
        .min(3, t('errors.incorrectChannelNameLength'))
        .max(20, t('errors.incorrectChannelNameLength'))
        .notOneOf(channelsName, t('errors.needUnique')),
    }),
    signUp: () => yup.object().shape({
      username: yup
        .string()
        .required(t('errors.requiredField'))
        .min(3, t('errors.incorrectUsernameLength'))
        .max(20, t('errors.incorrectUsernameLength')),
      password: yup
        .string()
        .required(t('errors.requiredField'))
        .min(6, t('errors.incorrectMinPasswordLength')),
      passwordConfirm: yup
        .string()
        .required(t('errors.requiredField'))
        .oneOf([yup.ref('password'), null], t('errors.shouldConfirm')),
    }),
  };
  return shemas[shemaName];
};

export default GetValidationSchema;
