import React from 'react'
import Spinner from '../components/Spinner'

const story = {
  title: 'Spinner',
  component: Spinner,
}

export default story

function TemplateStory(args) {
  return <Spinner {...args} />
}

const WithSizeXS = TemplateStory.bind({})
WithSizeXS.args = {
  size: 'xs',
}

const WithSizeSM = TemplateStory.bind({})
WithSizeSM.args = {
  size: 'sm',
}

const WithSizeMD = TemplateStory.bind({})
WithSizeMD.args = {
  size: 'md',
}

const WithSizeLG = TemplateStory.bind({})
WithSizeLG.args = {
  size: 'lg',
}

const WithSizeXL = TemplateStory.bind({})
WithSizeXL.args = {
  size: 'xl',
}

export { WithSizeXS, WithSizeSM, WithSizeMD, WithSizeLG, WithSizeXL }
