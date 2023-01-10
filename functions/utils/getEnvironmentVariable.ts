const getEnvironmentVariable = (name: string): string => {
  const value = process.env[name]
  if (value == null) {
    throw Error('missing env var for ' + name)
  }
  return value
}

export default getEnvironmentVariable
