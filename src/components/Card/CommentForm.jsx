import { Alert, Button, Icon, Input } from '@components'
import { ROUTE } from '@constants'
import { threads } from '@features'
import { useNotification, useRouter, useUsers } from '@hooks'
import { Formik, Form } from 'formik'
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

function CommentForm({ id }) {
  const { me } = useUsers()
  const { pathname } = useRouter()

  const formValue = {
    content: '',
  }
  const [addComent, { isLoading }] = threads.services.useAddCommentMutation()
  const notification = useNotification()
  const handleSubmit = async (values, formik) => {
    try {
      await addComent({
        id,
        content: values.comment,
      }).unwrap()
      notification.success('Success add Comment!')
      formik.resetForm(formValue)
    } catch (err) {
      notification.error(err)
    }

    formik.setSubmitting(false)
  }

  if (!me) {
    return (
      <Alert>
        Please{' '}
        <Link
          to={ROUTE.login}
          state={{
            redirect: pathname,
          }}
          className='mx-1 font-semibold underline underline-offset-4'
        >
          Login
        </Link>{' '}
        first, for add a new comment!
      </Alert>
    )
  }

  return (
    <div className='relative rounded-md bg-white p-4 shadow-lg dark:bg-gray-600 sm:p-6 md:p-8'>
      <Formik
        initialValues={formValue}
        onSubmit={handleSubmit}
        validationSchema={threads.schema.login}
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
              as='textarea'
              id='comment'
              title='Comment'
              type='text'
              name='comment'
              placeholder='Write your comment...'
              error={errors.comment}
              value={values.comment}
              onChange={handleChange}
              onBlur={handleBlur}
              limit={1000}
              className='min-h-[120px]'
            />
            <Button
              isSubmit
              isFluid
              disabled={!(isValid && dirty)}
              isLoading={isSubmitting || isLoading}
              rightIcon={<Icon name='send' className='ml-2 h-5 w-5' />}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

CommentForm.propTypes = {
  id: PropTypes.string.isRequired,
}

export default CommentForm
