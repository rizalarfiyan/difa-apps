import React from 'react'
import Alert from '../components/Alert'

const story = {
  title: 'Alert',
  component: Alert,
}

export default story

function TemplateStory(args) {
  return <Alert {...args} />
}

const WithTypeSuccess = TemplateStory.bind({})
WithTypeSuccess.args = {
  message: 'Success',
  variant: 'success',
}

const WithTypeDanger = TemplateStory.bind({})
WithTypeDanger.args = {
  message: 'Danger',
  variant: 'danger',
}

const WithTypeWarning = TemplateStory.bind({})
WithTypeWarning.args = {
  message: 'Warning',
  variant: 'warning',
}

const WithTypeInfo = TemplateStory.bind({})
WithTypeInfo.args = {
  message: 'Info',
  variant: 'info',
}

export { WithTypeSuccess, WithTypeDanger, WithTypeWarning, WithTypeInfo }
