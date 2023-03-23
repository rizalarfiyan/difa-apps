import React from 'react'
import Button from '../components/Button'
import Icon from '../components/Icon'

const story = {
  title: 'Button',
  component: Button,
}

export default story

function TemplateStory({ ...args }) {
  return <Button {...args} />
}

const WithVariantDanger = TemplateStory.bind({})
WithVariantDanger.args = {
  variant: 'danger',
  children: 'Button',
  size: 'md',
}

const WithVariantWarning = TemplateStory.bind({})
WithVariantWarning.args = {
  variant: 'warning',
  children: 'Button',
  size: 'md',
}

const WithVariantSuccess = TemplateStory.bind({})
WithVariantSuccess.args = {
  variant: 'success',
  children: 'Button',
  size: 'md',
}

const WithVariantInfo = TemplateStory.bind({})
WithVariantInfo.args = {
  variant: 'info',
  children: 'Button',
  size: 'md',
}

const WithVariantOutlineDanger = TemplateStory.bind({})
WithVariantOutlineDanger.args = {
  variant: 'outline-danger',
  children: 'Button',
  size: 'md',
}

const WithVariantOutlineWarning = TemplateStory.bind({})
WithVariantOutlineWarning.args = {
  variant: 'outline-warning',
  children: 'Button',
  size: 'md',
}

const WithVariantOutlineSuccess = TemplateStory.bind({})
WithVariantOutlineSuccess.args = {
  variant: 'outline-success',
  children: 'Button',
  size: 'md',
}

const WithVariantOutlineInfo = TemplateStory.bind({})
WithVariantOutlineInfo.args = {
  variant: 'outline-info',
  children: 'Button',
  size: 'md',
}

const WithSizeXS = TemplateStory.bind({})
WithSizeXS.args = {
  variant: 'info',
  children: 'Button',
  size: 'xs',
}

const WithSizeSM = TemplateStory.bind({})
WithSizeSM.args = {
  variant: 'info',
  children: 'Button',
  size: 'sm',
}

const WithSizeMD = TemplateStory.bind({})
WithSizeMD.args = {
  variant: 'info',
  children: 'Button',
  size: 'md',
}

const WithSizeLG = TemplateStory.bind({})
WithSizeLG.args = {
  variant: 'info',
  children: 'Button',
  size: 'lg',
}

const WithSizeXL = TemplateStory.bind({})
WithSizeXL.args = {
  variant: 'info',
  children: 'Button',
  size: 'xl',
}

const WithLeftIcon = TemplateStory.bind({})
WithLeftIcon.args = {
  variant: 'info',
  children: 'Button',
  size: 'md',
  leftIcon: <Icon name='info' className='mr-2 h-5 w-5' />,
}

const WithRightIcon = TemplateStory.bind({})
WithRightIcon.args = {
  variant: 'info',
  children: 'Button',
  size: 'md',
  rightIcon: <Icon name='info' className='ml-2 h-5 w-5' />,
}

const WithDisable = TemplateStory.bind({})
WithDisable.args = {
  variant: 'info',
  children: 'Button',
  size: 'md',
  disabled: true,
}

const WithIsLoading = TemplateStory.bind({})
WithIsLoading.args = {
  variant: 'info',
  children: 'Button',
  size: 'md',
  isLoading: true,
}

const WithIsSubmit = TemplateStory.bind({})
WithIsSubmit.args = {
  variant: 'info',
  children: 'Button',
  size: 'md',
  isSubmit: true,
}

const WithIsFluid = TemplateStory.bind({})
WithIsFluid.args = {
  variant: 'info',
  children: 'Button',
  size: 'md',
  isFluid: true,
}

export {
  WithVariantDanger,
  WithVariantWarning,
  WithVariantSuccess,
  WithVariantInfo,
  WithVariantOutlineDanger,
  WithVariantOutlineWarning,
  WithVariantOutlineSuccess,
  WithVariantOutlineInfo,
  WithSizeXS,
  WithSizeSM,
  WithSizeMD,
  WithSizeLG,
  WithSizeXL,
  WithLeftIcon,
  WithRightIcon,
  WithDisable,
  WithIsLoading,
  WithIsSubmit,
  WithIsFluid,
}
