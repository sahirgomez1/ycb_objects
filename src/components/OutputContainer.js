import React, { useRef } from "react";
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAnnotationStore } from "../stores";

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
        <Col md="2" className="">
          <Row className="text-center mt-2 px-2">
            <OverlayTrigger
              placement={"top"}
              overlay={
                <Tooltip id={"tooltip-top"}>
                  <h6> Turn off to annotate,<br/> & turn on to review.</h6>
                </Tooltip>
              }
            >
              <h5>Review</h5>
            </OverlayTrigger>
            <div className="switch_box box_1">
              <input
                type="checkbox"
                className="switch_1"
                checked={annotationStore.editMode}
                onChange={annotationStore.setReviewMode}
              />
            </div>
          </Row>
          <hr />
          <Row className="text-center mt-2">
            <h5>Annotations</h5>
            <Col>
              <Button
                size="sm"
                variant="success"
                className="px-3"
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(annotationStore.outputAnnotation, null, 4)
                )}`}
                download="3Dannotation.json"
              >
                Export
              </Button>
            </Col>
            <Col>
              <Button
                size="sm"
                variant="primary"
                className="px-3"
                onClick={upload}
              >
                Import
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
