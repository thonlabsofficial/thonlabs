import axios from 'axios';

const labsInternalAPI = axios.create({
  baseURL: `${process.env.TL_API}/internals`,
  headers: {
    'tl-int-key': process.env.TL_INTERNAL_API_KEY,
  },
});

export { labsInternalAPI };
