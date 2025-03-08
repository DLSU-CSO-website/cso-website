import { strict as assert } from "assert"
import contentfulManagement from "contentful-management"
import { EnvironmentGetter, ContentfulEnvironment } from "contentful-typescript-codegen"
import * as dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

// ACCCESS TOKEN EXPIRES WITHIN 90 DAYS

const { CONTENT_ACCESS_TOKEN, SPACE_ID, CONTENT_ENVIRONMENT } = process.env

assert(CONTENT_ACCESS_TOKEN)
assert(SPACE_ID)
assert(CONTENT_ENVIRONMENT)

const getContentfulEnvironment: EnvironmentGetter = async () => {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: CONTENT_ACCESS_TOKEN,
  })
  const space = await contentfulClient.getSpace(SPACE_ID)
  const environment = await space.getEnvironment(CONTENT_ENVIRONMENT)

  return environment as unknown as ContentfulEnvironment
}

export default getContentfulEnvironment
