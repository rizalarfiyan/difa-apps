import React from 'react'
import MainContainer from '../components/MainContainer'
import CardInput from '../components/CardInput'

const story = {
  title: 'Main Container',
  component: MainContainer,
}

export default story

function TemplateStory(args) {
  return <MainContainer {...args} />
}

const MainContainerComponent = TemplateStory.bind({})
MainContainerComponent.args = {
  children: (
    <CardInput title='Example'>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus,
        fuga.
      </p>
    </CardInput>
  ),
  isCenter: false,
}

const WithIsCenterMainContainer = TemplateStory.bind({})
WithIsCenterMainContainer.args = {
  children: (
    <CardInput title='Example'>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus,
        fuga.
      </p>
    </CardInput>
  ),
  isCenter: true,
}

export { MainContainerComponent, WithIsCenterMainContainer }
