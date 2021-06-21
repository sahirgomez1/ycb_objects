import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, FormControl, InputGroup } from "react-bootstrap";
import EnvironmentContainer from './EnvironmentContainer';
import video from '../rbgt_banana.mp4'
import { useObjectStore } from '../stores/ObjectStore';

const TopSection = () => {

    const [camPosition, setCamPosition] = useState({ xCamPos: 5, yCamPos:5, zCamPos:8, fov:4 })
    const [objScale, setObjScale] = useState(3)

    const { objPosition, objRotation, handleTranslation, handleRotation } = useObjectStore()

    const handleChangeCam = e => {
      const { name, value } = e.target;
      setCamPosition({ ...camPosition, [name]: parseFloat(value) })
    };
    const handleChangeObj = e => {
      const { name, value } = e.target;
      const newObjPosition = { ...objPosition, [name]: parseFloat(value) }
      handleTranslation({...newObjPosition})
    };
    const handleObjRotation = e => {
      const { name, value } = e.target;
      handleRotation({ ...objRotation, [name]: parseFloat(value) })
    };

    return (
        <Container fluid="md">
        <Row className="justify-content-center">
            <Col md={3} >
                <Tab.Container id="left-tabs-example" defaultActiveKey="camera">
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
                                    onChange={handleChangeObj}     
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
                                    onChange={handleChangeObj}     
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
                                    onChange={handleChangeObj}     
                                  />
                                </InputGroup>
                                <label className="h5"> ROTATION (deg) </label>
                                <InputGroup size="sm" className="mb-3">
                                  <label>X: {Math.round(objRotation._x * (180 / Math.PI) * 10) / 10} </label>
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
                                  <label>Y: {Math.round(objRotation._y * (180 / Math.PI) * 10) / 10} </label>
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
                                  <label>Z: {Math.round(objRotation._z * (180 / Math.PI) * 10) / 10}</label>
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
            </Col>
            <Col md={9} >
                <h6 className="text-center">Press shift to rotate object</h6>
                <div className="video_box">
                    <div className="video_overlays">
                      <div className="scene-container">
                        <EnvironmentContainer 
                          position={camPosition}
                          objScale={objScale}/>
                      </div>
                    </div>
                    
                    <video src={video} controls></video>
                    
                </div>
            </Col>
        </Row>
      </Container>
    )
}

export default TopSection;

