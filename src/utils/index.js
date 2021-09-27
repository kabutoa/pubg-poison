export const onLerp = (start, end, t) => start * (1 - t) + end * t
export const onGenCirclePoints = (r, pos) => {
  const circlePoints = []
  const ra = Math.PI / 180
  for (let i = 181; i <= 540; i++) {
    let j = i === 540 ? 181 : i
    const x = pos.x + r * Math.sin(ra * j)
    const y = pos.y + r * Math.cos(ra * j)
    circlePoints.unshift([x, y])
  }
  return circlePoints
}
