import React, { useRef } from 'react';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import EnvironmentContainer from './EnvironmentContainer';
import FormattedTime from '../components/videoPlayer/FormattedTime';
import { useVideoStore } from '../stores/VideoStore';
import { useAnnotationStore } from '../stores/AnnotationStore';
import { useObjectStore } from '../stores/ObjectStore'

const Slider = ({ onMouseUp, onMouseDown, onChange, played }) => (
    <div>
      <input
        className="tactile-slider" 
        type='range'
        min={ 0 }
        max={ 1 }
        step='any'
        value={ played }
        onMouseUp={ onMouseUp }
        onMouseDown={ onMouseDown }
        onChange={ onChange }
        onInput={ onChange }
      />
    </div>
);

const AnnotationView = ({camPosition, objScale}) => {

    const player = useRef()
    const { 
        url,
        playing, 
        played, 
        duration, 
        playbackRate,
        loop, 
        seeking,
        setVideoDimensions,
        onSeekTime,
        handleProgress,
        handleVideoPlayPause,
        handleVideoRewind,
        handleSeekingtoFalse,
        handleVideoDuration, 
        handleEnded, 
        handleSeekMouseDown, 
        handleSeekChange,
        handleVideoSpeedChange } = useVideoStore();
    
    const annotationStore = useAnnotationStore();
    const objectStore = useObjectStore();

    const findAnnotation = t => {
      //if (!editMode) return
      let currentAnnotations = annotationStore.outputAnnotation.annotations
      //if (!currentAnnotations) return
      let annotation = currentAnnotations.find(x => x.time === t)
      //console.log(currentAnnotations)
      if (annotation !== undefined) {
        objectStore.handleRotation(annotation.rotation)
        objectStore.handleTranslation(annotation.position)
      }
      return
    }
    
    const handleSeekMouseUp = e => {
      handleSeekingtoFalse()
      player.current.seekTo(parseFloat(e.target.value))
      findAnnotation(parseFloat(e.target.value))
    }

    const handleRewind = () => {
      handleVideoRewind()
      player.current.seekTo(0);
    }

    const onVideoReady = (e) => {
      const videoWidth = player.current.getInternalPlayer().videoWidth;
      const videoHeight = player.current.getInternalPlayer().videoHeight;
      setVideoDimensions(videoWidth, videoHeight)
      annotationStore.setVideoMetadata(e)
    }

    const onProgress = state => {
      if (!seeking) handleProgress(state.played)
    }

    return (
        <>
          <div className="video_box">
            <div className="video_overlays">
              <div className="scene-container">
                <EnvironmentContainer 
                  position={camPosition}
                  objScale={objScale}/>
              </div>
            </div>
            <div className="player-wrapper">
              <ReactPlayer
                ref={player}
                className='react-player'
                width='100%'
                height='100%'
                url={url}
                playing={playing}
                controls={false}
                loop={loop}
                playbackRate={playbackRate}
                progressInterval={1000 / 30}
                onReady={(e) => onVideoReady(e)}
                onStart={() => console.log('onStart')}
                onBuffer={() => console.log('onBuffer')}
                onSeek={e => onSeekTime(e)}
                onEnded={handleEnded}
                onError={e => console.log('onError', e)}
                onProgress={onProgress}
                onDuration={e => handleVideoDuration(e)}
              />   
            </div>                      
          </div>
          <div className="mt-2">
              <Slider
                played={ played }
                onMouseDown={(e) => handleSeekMouseDown(e)}
                onChange={(e) => handleSeekChange(e)}
                onMouseUp={(e) => handleSeekMouseUp(e)}
              />
              <div className='d-flex mt-2 justify-content-between'>
                <div className='d-flex align-items-center'>
                  <ButtonGroup>
                    <Button className='d-flex align-items-center' onClick={handleRewind}>
                      <i className="bi bi-skip-backward-circle"></i>
                    </Button>
                    <Button className='align-items-center' color='default' onClick={ handleVideoPlayPause }>
                      {playing ? <i className="bi bi-pause-circle"></i> : <i className="bi bi-play-circle"></i>}
                    </Button>
                  </ButtonGroup>
                  <Dropdown className="px-2" size='sm'>
                    <Dropdown.Toggle className='d-flex align-items-center' color='link'>
                      { playbackRate }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={ () => handleVideoSpeedChange(0.5) }>0.5</Dropdown.Item>
                      <Dropdown.Item onClick={ () => handleVideoSpeedChange(1) }>1</Dropdown.Item>
                      <Dropdown.Item onClick={ () => handleVideoSpeedChange(1.5) }>1.5</Dropdown.Item>
                      <Dropdown.Item onClick={ () => handleVideoSpeedChange(2) }>2</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className='d-flex align-items-center'>
                  <div className='player-control__time'>
                    <FormattedTime seconds={ played * duration} />
                    {' / ' }
                    <FormattedTime seconds={ duration } />
                  </div>
                </div>
              </div>
          </div>      
        </>
    )
}

export default AnnotationView;
