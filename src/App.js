import { useRoutes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import routes from "./Routes";
import "@brainhubeu/react-carousel/lib/style.css";

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
