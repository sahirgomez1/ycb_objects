import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import EnvironmentContainer from './EnvironmentContainer';
import Scene2 from './Scene2';

const Section = () => {
    return (
      <Container fluid="md">
        <Row className="justify-content-center">
            <Col md={6} >
                <div className="scene-container">
                  <Scene2/>
                </div>
            </Col>
            <Col md={6} >
                <div className="scene-container">
                  <EnvironmentContainer/>
                </div>
            </Col>
        </Row>
      </Container>
    )
}

export default Section;
