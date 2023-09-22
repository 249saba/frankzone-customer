export function getUniqueId() {
    const timestamp = Date.now().toString(36)
    const randomNum = Math.random().toString(36).substr(2, 5) // Adjust the length as needed
  
    return `${timestamp}-${randomNum}`
  }