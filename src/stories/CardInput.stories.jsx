import React from 'react'
import CardInput from '../components/CardInput'

const story = {
  title: 'CardInput',
  component: CardInput,
}

export default story

function TemplateStory(args) {
  return <CardInput {...args} />
}

const CardInputComponent = TemplateStory.bind({})
CardInputComponent.args = {
  title: 'This is title',
  children: 'This is children',
}

export { CardInputComponent }
