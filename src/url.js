const BASE_URL = 'https://api.getimpala.com/v1/'

const makeImpalaUrl = (path = [], base = BASE_URL) => base + path.join('/')

export default makeImpalaUrl
