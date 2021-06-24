import React from 'react';
import { Container, Row } from "react-bootstrap";
import { useAnnotationStore } from '../stores/AnnotationStore';

const OutputContainer = () => {

  const { outputAnnotation } = useAnnotationStore()
  const outputJSON = JSON.stringify(outputAnnotation);
 
    return (
      <Container fluid="md" className="mt-2">
        <Row className="section-wrapper">
          <div className="output">
            <code>Output: </code>
            <br/>
            <code>{outputJSON}</code>
            
          </div>
        </Row>
      </Container>
    )
}

export default OutputContainer
