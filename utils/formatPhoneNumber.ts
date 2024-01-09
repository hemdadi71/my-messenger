export function formatPhoneNumber(phoneNumber: string): string {
  const cleanedNumber: string = phoneNumber?.replace(/\D/g, '')
  const formattedNumber: string = `+98 ${cleanedNumber?.slice(
    1,
    4
  )} ${cleanedNumber?.slice(4, 7)} ${cleanedNumber?.slice(7)}`
  return formattedNumber
}

