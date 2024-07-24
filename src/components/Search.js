import React from "react";

const Search = () => {
  return (
    <div className="container">
      <div class="input-field">
        <input id="search" type="search" required />
        <label class="label-icon" for="search">
          <i class="material-icons">search</i>
        </label>
        <i class="material-icons">close</i>
      </div>
    </div>
  );
};

export default Search;
