import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_PRODUCT_BY_NAME } from "../operations/Queries";
import { Link } from "react-router-dom";

const Search = () => {
  const [nameQuery, setNameQuery] = useState("");
  const [hideResult, setHideResult] = useState(true);
  const [getProduct, { data, loading, error }] = useLazyQuery(
    GET_PRODUCT_BY_NAME,
    {
      variables: {
        filters: {
          name: {
            startsWith: nameQuery,
          },
        },
      },
    }
  );

  useEffect(() => {
    if (nameQuery.length !== 0) {
      getProduct();
      setHideResult(false);
    } else {
      setHideResult(true);
    }
  }, [nameQuery]);

  const handleChange = (e) => {
    setTimeout(() => {
      setNameQuery(e.target.value);
    }, 1000);
  };

  return (
    <div className="container">
      <div class="input-field">
        <input id="search" type="search" onChange={handleChange} required />
        <label class="label-icon" for="search">
          <i class="material-icons">search</i>
        </label>
        <i class="material-icons">close</i>
      </div>
      <div className="searchResults" hidden={hideResult}>
        {data &&
          data.products.data.map(({ id, attributes }) => {
            return (
              <Link key={id} to={`/product/${id}`}>
                <h6 className="blue white-text" style={{ padding: "20px" }}>
                  {attributes.name}
                </h6>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
