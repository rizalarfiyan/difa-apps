import * as Yup from 'yup'

const login = Yup.object({
  email: Yup.string().label('Email').email().required(),
  password: Yup.string().label('Password').required().min(5).max(255),
})

const register = Yup.object({
  name: Yup.string().label('Name').required(),
  email: Yup.string().label('Email').email().required(),
  password: Yup.string().label('Password').required().min(5).max(255),
  password_confirmation: Yup.string()
    .label('Password Confirmation')
    .required()
    .oneOf([Yup.ref('password'), null], 'Password must match'),
})

export default {
  login,
  register,
}
