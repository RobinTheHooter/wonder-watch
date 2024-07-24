import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_CATEGORIES } from "../operations/Queries";
import { Link } from "react-router-dom";

const Category = () => {
  const { data, loading, error } = useQuery(GET_ALL_CATEGORIES);
  if (loading) return <h1>Categories are loading...</h1>;
  return (
    <div className="category">
      {data.categories.data.map(({ id, attributes }) => {
        return (
          <Link key={id} to={`/category/${id}`}>
            <h4 className="chip btn dark">{attributes.name}</h4>;
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
