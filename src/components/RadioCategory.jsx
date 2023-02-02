import React from 'react'
import PropTypes from 'prop-types'
import { titleCase } from '@utils'

function RadioCategory({ name, id, value, checkedValue, count, onChange }) {
  return (
    <div className='w-auto'>
      <input
        type='radio'
        id={id}
        name='category'
        value={value}
        className='peer hidden'
        checked={value === checkedValue}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className='flex w-full cursor-pointer items-center justify-between gap-4 rounded-md border-2 border-gray-300 bg-white py-2 px-3 text-gray-400 transition-colors duration-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 peer-checked:border-blue-500 peer-checked:text-blue-500 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:hover:border-blue-500 dark:hover:bg-gray-500 dark:hover:text-white dark:peer-checked:text-white'
      >
        <h3>{titleCase(name)}</h3>
        <div className='flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 border-current border-opacity-50 text-sm font-semibold'>
          {count}
        </div>
      </label>
    </div>
  )
}

RadioCategory.defaultProps = {
  count: 0,
}

RadioCategory.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checkedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  count: PropTypes.number,
}

export default RadioCategory
