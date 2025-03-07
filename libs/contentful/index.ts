import { createClient } from "contentful";

const { SPACE_ID, CONTENT_DELIVERY_TOKEN, CONTENT_ENVIRONMENT } = process.env

console.log(CONTENT_DELIVERY_TOKEN)

const client = createClient({
  accessToken: CONTENT_DELIVERY_TOKEN as string,
  space: SPACE_ID as string,
  environment: CONTENT_ENVIRONMENT
})

export default client
