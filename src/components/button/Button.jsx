import React from 'react'
import './Button.scss';

const Button = ({ name }) => {
  return (
    <div className='button-genre active'>{name}</div>
  )
}

export default Button