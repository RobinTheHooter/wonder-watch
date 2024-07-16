import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../operations/Queries";
import Carousel from "@itseasy21/react-elastic-carousel";
import { BACKEND_URL } from "../Helpers";

const Product = () => {
  const { pid } = useParams();
  // const { addItem } = useCart();
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: {
      productId: pid,
    },
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const { name, price, description, images } = data.product.data.attributes;

  // const addToCart = () => {
  //   addItem({
  //     id: pid,
  //     name,
  //     price,
  //     img: BACKEND_URL + images.data[0].attributes.url,
  //   });
  // };

  return (
    <div className="container">
      <Carousel plugins={["arrows"]}>
        {images.data.map(({ attributes }) => {
          return (
            <img
              style={{ height: "50vh" }}
              src={BACKEND_URL + attributes.url}
              alt=""
            />
          );
        })}
      </Carousel>

      <div>
        <h3>{name}</h3>
        <h5 className="green-text" style={{ fontWeight: "bold" }}>
          ₹ {price}
        </h5>
        <p>{description}</p>
        {/* <button className="btn blue" onClick={addToCart}>
          Add to Cart
        </button> */}
      </div>
    </div>
  );
};

export default Product;
