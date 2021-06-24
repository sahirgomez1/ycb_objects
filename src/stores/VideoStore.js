import create from 'zustand';

const useVideoStore = create(set => ({
    url: "https://storage.turbo360.co/instagram_clone-vjcpvp/rbgt_banana.mp4",
    duration: 0,
    id :'react-player',
    played: 0,
    playing: false,
    controls: false ,
    muted: true,
    loop: false,
    seeking: false,
    playbackRate: 1.0,
    width: '100%',
    height: 'auto',

    handleToggleLoop : () => set ( state => ({ loop: !state.loop})),
    handleVideoPlayPause : () => set (state => ({ playing : !state.playing })),
    handleVideoRewind : () => set (state => ({ playing: false, played: 0})),
    handleVideoDuration : (duration) => set (state => ({ duration : duration })), 
    handleEnded: () => set (state => ({ playing : state.loop})),
    handleProgress: (played) => set(state => ({ played: played })),
    handleSeekingtoFalse: () => set (state => ({ seeking: false })), 
    handleSeekMouseDown: (e) => set (state => ({ seeking: true })),
    handleSeekChange : (e) => set (state => ({ played : parseFloat(e.target.value) })),
    handleVideoSpeedChange : (speed) => set(state => ({ playbackRate: speed }))
}))


export { useVideoStore };