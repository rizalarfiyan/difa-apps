import { Button, CardInput, Icon, Input, MainContainer } from '@components'
import { ROUTE } from '@constants'
import { useNotification, useRouter } from '@hooks'
import { Form, Formik } from 'formik'
import React from 'react'
import schema from '../schema'
import services from '../services'

function CreateThread() {
  const formValue = {
    title: '',
    category: '',
    content: '',
  }

  const [AddThread, { isLoading }] = services.useAddThreadMutation()
  const notification = useNotification()
  const { navigate } = useRouter()

  const handleSubmit = async (values, formik) => {
    try {
      await AddThread({
        title: values.title,
        category: values.category,
        body: values.content,
      }).unwrap()
      notification.success('Success Add Thread!')
      navigate(ROUTE.threads)
    } catch (err) {
      notification.error(err)
    }

    formik.setSubmitting(false)
  }

  return (
    <MainContainer isCenter>
      <CardInput title='Create a Thread'>
        <Formik
          initialValues={formValue}
          onSubmit={handleSubmit}
          validationSchema={schema.thread}
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
                id='title'
                title='Title'
                type='text'
                name='title'
                placeholder='Write your title...'
                error={errors.title}
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                id='category'
                title='Category'
                type='text'
                name='category'
                placeholder='Write your category...'
                error={errors.category}
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                as='textarea'
                id='content'
                title='Content'
                type='text'
                name='content'
                placeholder='Write your content...'
                error={errors.content}
                value={values.content}
                onChange={handleChange}
                onBlur={handleBlur}
                limit={10000}
                className='min-h-[150px]'
              />
              <Button
                isSubmit
                isFluid
                disabled={!(isValid && dirty)}
                isLoading={isSubmitting || isLoading}
                rightIcon={<Icon name='plus' className='ml-2 h-5 w-5' />}
              >
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </CardInput>
    </MainContainer>
  )
}

export default CreateThread
