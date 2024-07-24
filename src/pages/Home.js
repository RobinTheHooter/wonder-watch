import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_PRODUCTS } from "../operations/Queries";
import Card from "../components/Card";
import Search from "../components/Search";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  if (loading) return <h1>Loading...</h1>;

  if (data) {
    console.log(data);
  }
  return (
    <div>
      <Search />
      <div className="homeroot">
        {data.products.data.map(({ id, attributes }) => {
          return (
            <Card
              key={id}
              id={id}
              name={attributes.name}
              price={attributes.price}
              description={attributes.description}
              img={attributes.images.data[0].attributes.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
