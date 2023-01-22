import { Button, CardInput, Icon, Input, MainContainer } from '@components'
import { ROUTE } from '@constants'
import { Form, Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

const loginShema = Yup.object({
  email: Yup.string().label('Email').email().required(),
  password: Yup.string().label('Password').required().min(5).max(255),
})

function Login() {
  const formValue = {
    email: '',
    password: '',
  }

  const handleSubmit = (values) => {
    return values
  }

  return (
    <MainContainer isCenter>
      <CardInput title='Login'>
        <Formik
          initialValues={formValue}
          onSubmit={handleSubmit}
          validationSchema={loginShema}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isValid,
            dirty,
            isSubmitting,
            errors,
          }) => {
            return (
              <Form className='w-full space-y-6'>
                <Input
                  id='email'
                  title='Email'
                  type='email'
                  name='email'
                  placeholder='Write yout email...'
                  error={errors.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Input
                  id='password'
                  title='Password'
                  type='password'
                  name='password'
                  placeholder='Write yout password...'
                  error={errors.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div>
                  <Button
                    isSubmit
                    isFluid
                    disabled={!(isValid && dirty)}
                    isLoading={isSubmitting}
                    rightIcon={<Icon name='login' className='ml-2 h-5 w-5' />}
                  >
                    Login
                  </Button>
                </div>
                <div className='text-gray-600 dark:text-gray-300'>
                  <span>No account? </span>
                  <Link
                    to={ROUTE.register}
                    className='text-blue-500 underline decoration-blue-500 underline-offset-4 dark:text-blue-300 dark:decoration-blue-300'
                  >
                    Create One
                  </Link>
                </div>
              </Form>
            )
          }}
        </Formik>
      </CardInput>
    </MainContainer>
  )
}

export default Login
