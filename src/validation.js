import * as yup from 'yup';

export default {
  LoginFormSchema: yup.object({
    username: yup.string().trim().required(),
    password: yup.string().required(),
  }),
  MessageFormSchema: yup.object({
    body: yup.string().trim().required(),
  }),
  ChannelFormSchema: (channelsNames) => yup.object().shape({
    name: yup.string().required().notOneOf(channelsNames).min(3)
      .max(20),
  }),
  RegistrationFormSchema: yup.object().shape({
    username: yup.string().required().min(3).max(20),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null]),
  }),
};
