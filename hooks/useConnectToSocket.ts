
export async function useConnectToSocket(id: string) {
  try {
    const response = await fetch('/api/socket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        socketId: id,
      }),
    })

    if (response.ok) {
      console.log('Socket.io connection successful')
    } else {
      console.error(
        'Error connecting to Socket.io:',
        response.status,
        response.statusText
      )
    }
  } catch (error: any) {
    console.error('Error connecting to Socket.io:', error?.message)
  }
}
