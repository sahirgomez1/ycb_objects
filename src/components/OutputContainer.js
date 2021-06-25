import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAnnotationStore } from '../stores/AnnotationStore';

const OutputContainer = () => {

  const { outputAnnotation } = useAnnotationStore()
  const outputJSON = JSON.stringify(outputAnnotation);
 
    return (
      <Container fluid="md" className="mt-2">
        <Row className="section-wrapper">
          <Col md="10">
            <div className="output">
              <code>Output: </code>
              <br/>
              <code>{outputJSON}</code>       
            </div>
          </Col>
          <Col md="2">
            <Button size="sm" variant="light">Edit</Button> <Button size="sm" variant="dark">Generate</Button>
          </Col>
        </Row>
      </Container>
    )
}

export default OutputContainer
