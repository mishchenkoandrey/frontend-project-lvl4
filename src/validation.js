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
  RegistrationFormSchema: yup.object({
    username: yup.string().trim().required()
      .min(3, () => ({ key: 'validation.username' }))
      .max(20, () => ({ key: 'validation.username' })),
    password: yup.string().required().min(6),
    passwordConfirmation: yup.string().min(6)
      .oneOf([yup.ref('password'), null], () => ({ key: 'validation.passwordConfirmation' })),
  }),
};
