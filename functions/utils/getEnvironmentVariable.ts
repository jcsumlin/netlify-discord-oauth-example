const getEnvironmentVariable = (name: string) => {
  const value = process.env[name]
  if (!value) {
    throw Error('missing env var for ' + name)
  }
  return value
}

export default getEnvironmentVariable
