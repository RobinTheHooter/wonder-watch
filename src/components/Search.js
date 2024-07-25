import { useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_PRODUCT_BY_NAME } from "../operations/Queries";

const Search = () => {
  const [nameQuery, setNameQuery] = useState("");
  const [getProduct, { data, loading, error }] = useLazyQuery(
    GET_PRODUCT_BY_NAME,
    {
      variables: {
        filters: {
          name: {
            startsWith: "",
          },
        },
      },
    }
  );
  return (
    <div className="container">
      <div class="input-field">
        <input
          id="search"
          type="search"
          value={nameQuery}
          onChange={(e) => setNameQuery}
          required
        />
        <label class="label-icon" for="search">
          <i class="material-icons">search</i>
        </label>
        <i class="material-icons">close</i>
      </div>
    </div>
  );
};

export default Search;
