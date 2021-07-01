import React, { useRef } from "react";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import ReactPlayer from "react-player";
import SceneContainer from "./SceneContainer";
import { getFixedNumber } from "../utils/MathUtils";
import FormattedTime from "../components/videoPlayer/FormattedTime";
import { useObjectStore, useCameraStore, useAnnotationStore, useVideoStore } from '../stores';

/**
 * Video player slide component.
 *
 * @param {void} onMouseUp Mouse up listener
 * @param {void} onMouseDown Mouse down listener
 * @param {VoidFunction} onChange Update video time
 * @param {Number} played Seconds played
 * @returns
 */
const Slider = ({ onMouseUp, onMouseDown, onChange, played }) => (
  <div>
    <input
      className="tactile-slider"
      type="range"
      min={0}
      max={1}
      step="any"
      value={played}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
      onChange={onChange}
      onInput={onChange}
    />
  </div>
);

/**
 * Annotation component view, it puts video player and 3D scene together.
 *
 * @param {Object} props.camPosition object containing position and field of view of camera properties
 * @returns
 */
const AnnotationView = () => {
  const player = useRef();
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
    handleVideoSpeedChange,
  } = useVideoStore();

  const annotationStore = useAnnotationStore();
  const objectStore = useObjectStore();
  const { camPosition } = useCameraStore();

  const findAnnotation = (t) => {
    if (!annotationStore.reviewMode) return
    const secondsLapsed = t * duration;
    let currentAnnotations = annotationStore.outputAnnotation.annotations;
    if (currentAnnotations.length <= 0) return;
    const annotation = currentAnnotations.reduce((prev, curr) => {
      let closest =
        Math.abs(curr.time - secondsLapsed) <
        Math.abs(prev.time - secondsLapsed)
          ? curr
          : prev;
      return closest;
    });

    if (annotation !== undefined) {
      objectStore.handleRotation(annotation.rotation);
      objectStore.handleTranslation(annotation.position);
      objectStore.setObjScale(annotation.scale);
    }
    return;
  };

  const handleSeekMouseUp = (e) => {
    handleSeekingtoFalse();
    player.current.seekTo(getFixedNumber(e.target.value, 5));
  };

  const handleRewind = () => {
    handleVideoRewind();
    player.current.seekTo(0);
  };

  const onVideoReady = (e) => {
    const videoWidth = player.current.getInternalPlayer().videoWidth;
    const videoHeight = player.current.getInternalPlayer().videoHeight;
    setVideoDimensions(videoWidth, videoHeight);
    annotationStore.setVideoMetadata(e);
  };

  const onProgress = (state) => {
    const { played } = state;
    if (!seeking) handleProgress(getFixedNumber(played, 5));
    findAnnotation(played);
  };

  const onSliderChange = (e) => {
    let t = getFixedNumber(e.target.value, 5);
    handleSeekChange(t);
    findAnnotation(t);
  };

  return (
    <>
      <div className="video_box">
        <div className="video_overlays">
          <div className="scene-container">
            <SceneContainer position={camPosition} />
          </div>
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            ref={player}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            playing={playing}
            controls={false}
            loop={loop}
            playbackRate={playbackRate}
            progressInterval={1000 / 30}
            onReady={(e) => onVideoReady(e)}
            onStart={() => console.log("onStart")}
            onBuffer={() => console.log("onBuffer")}
            onSeek={(e) => onSeekTime(e)}
            onEnded={handleEnded}
            onError={(e) => console.log("onError", e)}
            onProgress={onProgress}
            onDuration={(e) => handleVideoDuration(e)}
          />
        </div>
      </div>
      <div className="mt-2">
        <Slider
          played={played}
          onMouseDown={handleSeekMouseDown}
          onChange={onSliderChange}
          onMouseUp={handleSeekMouseUp}
        />
        <div className="d-flex mt-2 justify-content-between">
          <div className="d-flex align-items-center">
            <ButtonGroup>
              <Button
                className="d-flex align-items-center"
                onClick={handleRewind}
              >
                <i className="bi bi-skip-backward-circle"></i>
              </Button>
              <Button
                className="align-items-center"
                color="default"
                onClick={handleVideoPlayPause}
              >
                {playing ? (
                  <i className="bi bi-pause-circle"></i>
                ) : (
                  <i className="bi bi-play-circle"></i>
                )}
              </Button>
            </ButtonGroup>
            <Dropdown className="px-2" size="sm">
              <Dropdown.Toggle
                className="d-flex align-items-center"
                color="link"
              >
                {playbackRate}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleVideoSpeedChange(0.5)}>
                  0.5
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleVideoSpeedChange(1)}>
                  1
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleVideoSpeedChange(1.5)}>
                  1.5
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleVideoSpeedChange(2)}>
                  2
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="d-flex align-items-center">
            <div className="player-control__time">
              <FormattedTime seconds={played * duration} />
              {" / "}
              <FormattedTime seconds={duration} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnnotationView;
