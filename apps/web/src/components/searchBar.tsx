import { useState } from 'react'
const SearchBar = () => {
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
export default SearchBar;