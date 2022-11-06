interface Cookies {
  discord_token: string
  discord_refresh: string
}

const parseCookie = (cookies: string): Cookies => {
  return <Cookies>cookies.split(';')
    .map(v => v.split('='))
    .reduce((acc: {}, v: string[]) => {
      // @ts-expect-error
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim())
      return acc
    }, {})
}

export default parseCookie
