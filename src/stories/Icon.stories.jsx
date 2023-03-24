import React from 'react'
import Icon from '../components/Icon'

const story = {
  title: 'Icon',
  component: Icon,
}

export default story

function TemplateStory(args) {
  return <Icon {...args} />
}

const IconComponent = TemplateStory.bind({})
IconComponent.args = {
  name: 'info',
  width: 24,
  height: 24,
}

export { IconComponent }
