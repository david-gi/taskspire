const wrapAttempt = (func: CallableFunction) => {
  try {
    return func()
  } catch (e) {
    console.error(e)
    throw e
  }
}

export default {
  wrapAttempt,
}