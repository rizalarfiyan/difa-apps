import React from 'react'
import LoadingScreen from '../components/LoadingScreen'

const story = {
  title: 'Loading Screen',
  component: LoadingScreen,
}

export default story

function TemplateStory(args) {
  return <LoadingScreen {...args} />
}

const LoadingScreenComponent = TemplateStory.bind({})
LoadingScreenComponent.args = {
  reason: 'This is a reason',
}

export { LoadingScreenComponent }
