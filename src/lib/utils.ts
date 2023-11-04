export const daysToSeconds = (days: number) => days * 24 * 60 * 60

export function generateUID() {
  // eslint-disable-next-line no-bitwise
  let firstPart: string | number = (Math.random() * 46656) | 0
  // eslint-disable-next-line no-bitwise
  let secondPart: string | number = (Math.random() * 46656) | 0
  firstPart = `000${firstPart.toString(36)}`.slice(-3)
  secondPart = `000${secondPart.toString(36)}`.slice(-3)
  return firstPart + secondPart
}
