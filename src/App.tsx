import React, { Suspense } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import ErrorBoundary from "./utils/ErrorBoundary";

// Lazy load the Home component
const Home = React.lazy(() => import("./Pages/Home"));

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
          {/* Add Suspense for lazy-loaded components */}
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
