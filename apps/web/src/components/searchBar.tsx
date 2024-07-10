import React, { useState } from 'react'
const searchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search here"
        onChange={(e)=>{setSearchInput(e.target.value)}}
        value={searchInput} />
    </div>
  )
}
export default searchBar;