import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Form, FormControl, InputGroup } from "react-bootstrap";
import { useObjectStore } from '../stores/ObjectStore';
import { useVideoStore } from '../stores/VideoStore';
import AnnotationView from './AnnotationView';

const TopSection = () => {

    const [camPosition, setCamPosition] = useState({ xCamPos: 5, yCamPos:5, zCamPos:8, fov:4 })
    const { objectSelected, defaultObjects, handleSelectObject, objPosition, objRotation, objScale, handleTranslation, handleRotation, setObjScale } = useObjectStore()
    const { url, setVideoOnScene } = useVideoStore()

    const handleChangeCam = e => {
      const { name, value } = e.target;
      setCamPosition({ ...camPosition, [name]: parseFloat(value) })
    };
    const handleObjPosition = e => {
      const { name, value } = e.target;
      const newObjPosition = { ...objPosition, [name]: parseFloat(value) }
      handleTranslation({...newObjPosition})
    };
    const handleObjRotation = e => {
      const { name, value } = e.target;
      handleRotation({ ...objRotation, [name]: parseFloat(value) })
    };

    return (
        <Container fluid="md" className="">
          <Row className="justify-content-center">
            <Col md={3} className="section-wrapper" >
              <div className="controls">
                <Form.Group>
                  <Form.Label><h6>Video</h6></Form.Label>
                  <Form.Control 
                    size="sm" 
                    className="span2" 
                    type="text" 
                    placeholder="Enter video URL" 
                    value={url}
                    onChange={setVideoOnScene}
                  />
                  <Form.Label><h6>Select Object</h6></Form.Label>
                  <Form.Control 
                    size="sm" 
                    as="select" 
                    value={objectSelected.name} 
                    onChange={(e) => handleSelectObject(e.target.value)}
                  >
                    {defaultObjects.map((obj, index) => (
                      <option key={index} value={obj.name}>
                        {obj.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="controls">
                <Tab.Container id="left-tabs-example" defaultActiveKey="camera" >
                    <Row>
                        <Col sm={6}>
                          <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                              <Nav.Link eventKey="camera">CAMERA</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="object">OBJECT</Nav.Link>
                            </Nav.Item>
                            
                          </Nav>
                        </Col>
                        <Col sm={6}>
                        <Tab.Content>
                            <Tab.Pane eventKey="camera">
                              <div>
                                <InputGroup size="sm" className="mb-3">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">X</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl 
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Position camera on x"
                                    type="number" 
                                    name="xCamPos"
                                    value={camPosition.xCamPos || 0}
                                    onChange={handleChangeCam}     
                                  />
                                </InputGroup>
                                <InputGroup size="sm" className="mb-3">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Y</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl 
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Position camera on y"
                                    type="number" 
                                    name="yCamPos"
                                    value={camPosition.yCamPos || 0}
                                    onChange={handleChangeCam}
                                  />            
                                </InputGroup>
                                <InputGroup size="sm" className="mb-3">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Z</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl 
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Position camera on y"
                                    type="number" 
                                    name="zCamPos"
                                    value={camPosition.zCamPos || 0}
                                    onChange={handleChangeCam}
                                  />            
                                </InputGroup>
                                <InputGroup size="sm" className="mb-3">
                                  <label>FOV: {camPosition.fov} </label>
                                  <input 
                                    type="range" 
                                    className="tactile-slider" 
                                    min="1" 
                                    max="20"
                                    name="fov" 
                                    value={camPosition.fov} 
                                    onChange={handleChangeCam}>    
                                  </input>
                                </InputGroup>
                                
                              </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="object">
                              <div>
                                <InputGroup size="sm" className="mb-3">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="scale">Scale</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl 
                                    aria-describedby="scale"
                                    type="number" 
                                    step="0.5"
                                    name="objScale"
                                    value={objScale || 1}
                                    onChange={e => setObjScale(e.target.value)}     
                                  />
                                </InputGroup>
                                <label className="h5"> POSITION </label>
                                <InputGroup size="sm" className="mb-3">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">X</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl 
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Position camera on x"
                                    type="number" 
                                    name="x"
                                    step="0.05"
                                    value={objPosition.x || 0}
                                    onChange={handleObjPosition}     
                                  />
                                </InputGroup>
                                <InputGroup size="sm" className="mb-3">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Y</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl 
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Position camera on x"
                                    type="number" 
                                    name="y" 
                                    step="0.05"
                                    value={objPosition.y || 0}
                                    onChange={handleObjPosition}     
                                  />
                                </InputGroup>
                                <InputGroup size="sm" className="mb-3">
                                  <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Z</InputGroup.Text>
                                  </InputGroup.Prepend>
                                  <FormControl 
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Position camera on x"
                                    type="number" 
                                    name="z"
                                    step="0.05"
                                    value={objPosition.z || 0}
                                    onChange={handleObjPosition}     
                                  />
                                </InputGroup>
                                <label className="h5"> ROTATION (deg) </label>
                                <InputGroup size="sm" className="mb-3">
                                  <label className="h5">X: {Math.round(objRotation._x * (180 / Math.PI) * 10) / 10} </label>
                                  <input 
                                    type="range" 
                                    className="tactile-slider" 
                                    min={-Math.PI} 
                                    max={Math.PI}
                                    step="0.02"
                                    name="_x" 
                                    value={objRotation._x} 
                                    onChange={handleObjRotation}
                                    >    
                                  </input>
                                </InputGroup>
                                <InputGroup size="sm" className="mb-3">
                                  <label className="h5">Y: {Math.round(objRotation._y * (180 / Math.PI) * 10) / 10} </label>
                                  <input 
                                    type="range" 
                                    className="tactile-slider" 
                                    min={-Math.PI} 
                                    max={Math.PI}
                                    step="0.02"
                                    name="_y" 
                                    value={objRotation._y} 
                                    onChange={handleObjRotation}
                                    >    
                                  </input>
                                </InputGroup>
                                <InputGroup size="sm" className="mb-3">
                                  <label className="h5">Z: {Math.round(objRotation._z * (180 / Math.PI) * 10) / 10}</label>
                                  <input 
                                    type="range" 
                                    className="tactile-slider" 
                                    min={-Math.PI} 
                                    max={Math.PI}
                                    step="0.02"
                                    name="_z" 
                                    value={objRotation._z} 
                                    onChange={handleObjRotation}
                                    >    
                                  </input>
                                </InputGroup>
                               
                              </div>
                            </Tab.Pane>
                            
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                <hr/>
                <h6>
                  Press Shift to rotate object over X and Y, 
                  press Control to rotate over Z <br/> 
                  Click to translate object
                </h6>
              </div>
            </Col>
            <Col md={9}>
              <AnnotationView 
                camPosition={camPosition} 
              />
            </Col>
        </Row>
      </Container>
    )
}

export default TopSection;
