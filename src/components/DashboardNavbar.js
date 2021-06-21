import React from 'react';
import { Container, Navbar } from "react-bootstrap";

const DashboardNavbar = () => {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>
                Tactile Dataset Env
            </Navbar.Brand>
          </Container>
        </Navbar>
      </>
      
    )
}

export default DashboardNavbar;