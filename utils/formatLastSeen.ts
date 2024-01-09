export function formatLastSeen(timestamp: any) {
  if (!timestamp) {
    return null
  }

  const now: any = new Date()
  const lastSeenDate: any = new Date(timestamp)

  // Calculate the time difference in milliseconds
  const timeDiff = now - lastSeenDate

  // Define time intervals
  const oneMinute = 60 * 1000
  const oneHour = 60 * oneMinute
  const oneDay = 24 * oneHour
  const oneWeek = 7 * oneDay

  // Format last seen based on the time difference
  if (timeDiff < oneDay) {
    // Show time if it's today
    return lastSeenDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  } else if (timeDiff < oneWeek) {
    // Show day of the week if it's within the last week
    return lastSeenDate.toLocaleDateString([], { weekday: 'long' })
  } else if (lastSeenDate.getFullYear() === now.getFullYear()) {
    // Show date and month if it's within the current year
    return lastSeenDate.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    })
  } else {
    // Show full date if it's in a previous year
    return lastSeenDate.toLocaleDateString()
  }
}
