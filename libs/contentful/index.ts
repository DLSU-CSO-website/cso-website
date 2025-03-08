import { createClient } from "contentful";
import { strict as assert } from "assert"

const { SPACE_ID, CONTENT_DELIVERY_TOKEN, CONTENT_ENVIRONMENT } = process.env

assert(SPACE_ID)
assert(CONTENT_DELIVERY_TOKEN)
assert(CONTENT_ENVIRONMENT)

const client = createClient({
  accessToken: CONTENT_DELIVERY_TOKEN,
  space: SPACE_ID,
  environment: CONTENT_ENVIRONMENT
})

export default client
