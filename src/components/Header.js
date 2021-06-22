import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Header = () => {
    return (
      <Container fluid="md">
        <Row className="justify-content-center mt-4">
            <Col md={6} className="text-center">
                <p>YCB objects</p>
            </Col>
        </Row>
        <hr/>
      </Container>
    )
}

export default Header;