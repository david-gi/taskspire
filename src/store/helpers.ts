const wrapAttempt = (func: () => void) => {
  try {
    func()
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export default {
  wrapAttempt
}