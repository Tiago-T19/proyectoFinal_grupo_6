import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Menu from "./components/Menu";

const App = () => {

  return (
    <>
      <Menu />
      <Container className="my-4">
        <Outlet />
      </Container>
    </>
  );
};

export default App;