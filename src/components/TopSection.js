import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ControlsContainer from "./ControlsContainer";
import AnnotationView from "./AnnotationView";

const TopSection = () => {
  return (
    <Container fluid="md">
      <Row className="justify-content-center">
        <Col md={3} className="section-wrapper">
          <ControlsContainer />
        </Col>
        <Col md={9}>
          <AnnotationView />
        </Col>
      </Row>
    </Container>
  );
};

export default TopSection;
