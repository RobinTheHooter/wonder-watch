import React from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./Routes";

const Routes = () => {
  const element = useRoutes(routes);
  return (
    <>
      <Navbar />
      {element}
    </>
  );
};

function App() {
  return <Routes />;
}

export default App;
