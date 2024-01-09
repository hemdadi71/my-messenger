export const motionDivProps = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
  exit: { opacity: 0, scale: 0.5 },
}
export const popoverMotion = {
  initial: { width: 0, height: 0 },
  animate: { width: 'auto', height: 'auto' },
  transition: { duration: 0.1 },
  exit: { width: 0, height: 0 },
}
export const messageMotionRight = {
  initial: { x: 10000 },
  animate: { x: 0 },
  transition: { duration: 0.2, origin: 1 },
  exit: { x: 1000 },
}
export const messageMotionLeft = {
  initial: { x: -10000 },
  animate: { x: 0 },
  transition: { duration: 0.2, origin: 1 },
  exit: { x: -1000 },
}
export const mobilePageMotion = {
  initial: { x: 10000 },
  animate: { x: 0 },
  transition: { duration: 0.3, origin: 1 },
  exit: { x: 10000 },
}
export const mobileMessageMotion = {
  initial: { x: -10000 },
  animate: { x: 0 },
  transition: { duration: 0.3, origin: 1 },
  exit: { x: -10000 },
}
