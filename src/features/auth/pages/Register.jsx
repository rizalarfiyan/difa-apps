import { Button, CardInput, Icon, Input, MainContainer } from '@components'
import { ROUTE } from '@constants'
import { Form, Formik } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import schema from '../schema'
import services from '../services'

function Register() {
  const formValue = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const [register, { isLoading }] = services.useRegisterMutation()

  const handleSubmit = async (values, formik) => {
    const { name, email, password } = values
    try {
      await register({ name, email, password }).unwrap()
    } catch (err) {
      // console.error(err)
    }
    formik.setSubmitting(false)
  }

  return (
    <MainContainer isCenter>
      <CardInput title='Create an Account'>
        <Formik
          initialValues={formValue}
          onSubmit={handleSubmit}
          validationSchema={schema.register}
        >
          {({
            values,
            handleChange,
            handleBlur,
            isValid,
            dirty,
            isSubmitting,
            errors,
          }) => (
            <Form className='w-full space-y-6'>
              <Input
                id='name'
                title='Name'
                type='text'
                name='name'
                placeholder='Write yout name...'
                error={errors.name}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
              <Input
                id='password_confirmation'
                title='Password Confirmation'
                type='password'
                name='password_confirmation'
                placeholder='Write yout password confirmation...'
                error={errors.password_confirmation}
                value={values.password_confirmation}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div>
                <Button
                  isSubmit
                  isFluid
                  disabled={!(isValid && dirty)}
                  isLoading={isSubmitting || isLoading}
                  rightIcon={<Icon name='register' className='ml-2 h-5 w-5' />}
                >
                  Register
                </Button>
              </div>
              <div className='text-gray-600 dark:text-gray-300'>
                <span>Have an account? </span>
                <Link
                  to={ROUTE.login}
                  className='text-blue-500 underline decoration-blue-500 underline-offset-4 dark:text-blue-300 dark:decoration-blue-300'
                >
                  Go login
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </CardInput>
    </MainContainer>
  )
}

export default Register
