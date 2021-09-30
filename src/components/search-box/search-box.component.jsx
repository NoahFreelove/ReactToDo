import React from 'react'

export const SearchBox = ({ placeholder, onChange }) => (
    <input
      name='searchValue'
      className='search'
      type='search'
      placeholder={placeholder}
      onChange={onChange}
    />
  );
