import React from 'react'
import HeadingTitle from '../components/HeadingTitle'

const story = {
  title: 'Heading Title',
  component: HeadingTitle,
}

export default story

function TemplateStory(args) {
  return <HeadingTitle {...args} />
}

const HeadingTitleComponent = TemplateStory.bind({})
HeadingTitleComponent.args = {
  title: 'This is title',
}

export { HeadingTitleComponent }
