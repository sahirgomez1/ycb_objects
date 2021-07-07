const getFixedNumber = (number, digits) =>
  Math.round(number * 10 ** digits) / 10 ** digits;

const secondsToFrame = (t, fps) => Math.round(t * fps);

const frameToS = (frame, fps) => frame / fps;

export { getFixedNumber, secondsToFrame, frameToS };
