export function getFileType(filename: string) {
  const supportedImageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp']
  const supportedVideoExtensions = ['mp4', 'avi', 'mkv', 'mov', 'wmv']

  const extension = filename.slice(-3).toLowerCase()

  if (supportedImageExtensions.includes(extension)) {
    return 'image'
  } else if (supportedVideoExtensions.includes(extension)) {
    return 'video'
  } else {
    return 'unknown'
  }
}
