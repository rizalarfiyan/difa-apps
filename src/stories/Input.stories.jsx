import React, { useState } from 'react'
import Input from '../components/Input'

const story = {
  title: 'Input',
  component: Input,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
}

export default story

function TemplateStory(args) {
  const { onChange, value } = args
  const [val, setValue] = useState(value ?? '')

  return (
    <Input
      {...args}
      onChange={(params) => {
        onChange(params)
        setValue(params.target.value)
      }}
      value={val}
    />
  )
}

const InputComponent = TemplateStory.bind({})
InputComponent.args = {
  as: 'input',
  type: 'text',
  id: 'input-1',
  name: 'input',
  title: 'This is a title',
  value: 'This is value',
}

const WithLimitInput = TemplateStory.bind({})
WithLimitInput.args = {
  as: 'input',
  type: 'text',
  id: 'input-2',
  name: 'input',
  title: 'This is a title',
  value: 'This is value',
  limit: 100,
}

const WithErrorInput = TemplateStory.bind({})
WithErrorInput.args = {
  as: 'input',
  type: 'text',
  id: 'input-2',
  name: 'input',
  title: 'This is a title',
  value: 'This is value',
  error: 'This is error message!',
}

export { InputComponent, WithLimitInput, WithErrorInput }
