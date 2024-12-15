import React from "react";
import PortFilter from "./components/PortFilter";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Port Finder</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div className="container mt-5">
        <h1>Port Finder Application</h1>
        <ErrorBoundary>
          <PortFilter />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
