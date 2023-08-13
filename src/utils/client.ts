// sanity.js
import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: '6dksim58',
  dataset: 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2021-10-21', // use current date (YYYY-MM-DD) to target the latest API version
  token: 'sks9YuAGX41xSLc8R8pArDUzTdOSrUDET5Ta1KAACSQWIRRZSevtJfEtjEMswY4ovzCh3TUf8xJmsKHV3SflMaJy8VFZevzOQIQAvgY3iIEMFsG4ogMcXgqEcvnLECT9hGsPOfUcxolSo98XzhKKxZzQ5HsfUHwHtzy2xpTMvKZgdh41crCX'
})
