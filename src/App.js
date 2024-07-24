import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./Routes";
import Category from "./components/Category";

const Routes = () => {
  const element = useRoutes(routes);
  return (
    <>
      <Navbar />
      {element}
      <Category />
    </>
  );
};

function App() {
  return <Routes />;
}

export default App;
