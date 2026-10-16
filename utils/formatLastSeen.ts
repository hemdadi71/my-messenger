export function formatLastSeen(timestamp: any) {
  if (!timestamp) {
    return null
  }

  const now: any = new Date()
  const lastSeenDate: any = new Date(timestamp)

  const timeDiff = now - lastSeenDate

  const oneMinute = 60 * 1000
  const oneHour = 60 * oneMinute
  const oneDay = 24 * oneHour
  const oneWeek = 7 * oneDay

  if (timeDiff < oneDay) {
    return lastSeenDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  } else if (timeDiff < oneWeek) {
    return lastSeenDate.toLocaleDateString([], { weekday: 'long' })
  } else if (lastSeenDate.getFullYear() === now.getFullYear()) {
    return lastSeenDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    })
  } else {
    return lastSeenDate.toLocaleDateString()
  }
}
