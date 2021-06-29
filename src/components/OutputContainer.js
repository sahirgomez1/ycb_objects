import React, { useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAnnotationStore } from "../stores/AnnotationStore";

const OutputContainer = () => {
  const inputFile = useRef();
  const annotationStore = useAnnotationStore();
  const outputJSON = JSON.stringify(annotationStore.outputAnnotation);

  const openFile = (e) => {
    const fileObj = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContents = e.target.result;
      annotationStore.setAnnotationsFromFile(JSON.parse(fileContents));
    };
    if (fileObj) reader.readAsText(fileObj);
    else return;
  };

  const upload = (e) => {
    e.preventDefault();
    inputFile.current.click();
  };

  return (
    <Container fluid="md" className="mt-2">
      <Row className="section-wrapper justify-content-center">
        <Col md="10">
          <div className="output">
            <code>Output: </code>
            <br />
            <code>{outputJSON}</code>
          </div>
        </Col>
        <Col md="2" className="align-items-center">
          <Row className="text-center mt-2">
            <Button size="sm" variant="light">
              Edit
            </Button>{" "}
          </Row>
          <hr />
          <Row className="text-center mt-2">
            <h5>Annotations</h5>
            <Col>
              <Button
                size="sm"
                variant="success"
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(annotationStore.outputAnnotation, null, 4)
                )}`}
                download="3Dannotation.json"
              >
                Download
              </Button>
            </Col>
            <Col>
              <Button
                size="sm"
                variant="primary"
                className="px-3"
                onClick={upload}
              >
                Upload
              </Button>

              <input
                type="file"
                name="file"
                ref={inputFile}
                style={{ display: "none" }}
                multiple={false}
                accept=".json,application/json"
                onChange={openFile}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default OutputContainer;
