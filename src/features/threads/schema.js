import * as Yup from 'yup'

const comment = Yup.object({
  comment: Yup.string().label('Password').required().min(10).max(1000),
})

export default {
  comment,
}
