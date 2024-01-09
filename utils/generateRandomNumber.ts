export default function generateRandomNumber(length: number) {
  if (length === 5) {
    return Math.floor(10000 + Math.random() * 90000)
  }
  if (length === 6) {
    return Math.floor(100000 + Math.random() * 900000)
  }
}
