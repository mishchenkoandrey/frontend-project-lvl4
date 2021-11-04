import * as yup from 'yup';

export default {
  LoginFormSchema: yup.object({
    username: yup.string().trim().required(),
    password: yup.string().required(),
  }),
  ChannelIteractionFormSchema: yup.object({
    channelName: yup.string().trim().required()
      .min(3, () => ({ key: 'validation.channelName' }))
      .max(20, () => ({ key: 'validation.channelName' })),
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
