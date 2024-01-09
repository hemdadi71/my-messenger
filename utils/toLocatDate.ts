export function toLocalDateString({
  date,
  local,
}: {
  date: Date
  local: string
}) {
  const options: any = {
    // weekday: "long",
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  }

  return new Date(date).toLocaleDateString(local, options)
}

export function toLocalDateStringShort(date: Date) {
  return new Date(date).toLocaleDateString('fa-IR')
}
