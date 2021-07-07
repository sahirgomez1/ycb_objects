import create from 'zustand';
import { secondsToFrame } from '../utils/MathUtils';

const useVideoStore = create(set => ({
    url: "https://storage.turbo360.co/instagram_clone-vjcpvp/rbgt_banana.mp4",
    duration: 0, // frames
    id :'react-player',
    played: 0,
    seekedTime: 0,
    fps: 30,
    playing: false,
    controls: false ,
    muted: true,
    loop: false,
    seeking: false,
    playbackRate: 1.0,
    width: '100%',
    height: 'auto',

    setVideoOnScene : (e) => set ( state => ({ url: e.target.value })),
    setVideoDimensions : (videoWidth, videoHeight) => set (state => ({ videoHeight: videoHeight, videoWidth: videoWidth})),
    setVideoClientDimensions : (e) => set (state => ({ videoClientHeight: e.wrapper.clientHeight, videoClientWidth: e.wrapper.clientWidth})),
    onSeekTime : (e) => set (state => ({seekedTime : e})),
    handleToggleLoop : () => set ( state => ({ loop: !state.loop})),
    handleVideoPlayPause : () => set (state => ({ playing : !state.playing })),
    handleVideoRewind : () => set (state => ({ playing: false, played: 0})),
    handleVideoDuration : (duration) => set (state => ({ duration : secondsToFrame(duration, state.fps) })), 
    handleEnded: () => set (state => ({ playing : state.loop})),
    handleProgress: (played) => set(state => ({ played: played })),
    handleSeekingtoFalse: () => set (state => ({ seeking: false })), 
    handleSeekMouseDown: (e) => set (state => ({ seeking: true })),
    handleSeekChange : (played) => set (state => ({ 
      played : played 
    })),
    handleVideoSpeedChange : (speed) => set(state => ({ playbackRate: speed }))
}))


export default useVideoStore;