import * as Yup from 'yup'

const comment = Yup.object({
  comment: Yup.string().label('Password').required().min(10).max(1000),
})

const thread = Yup.object({
  title: Yup.string().label('Title').required().min(6).max(100),
  category: Yup.string().label('Category').required().min(3).max(20),
  content: Yup.string().label('Content').required().min(10).max(10000),
})

export default {
  comment,
  thread,
}
