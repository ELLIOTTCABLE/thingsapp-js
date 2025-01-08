import {auth, getHistory} from './things-cloud.mts'

import {env} from 'node:process'

async function start() {
   console.log('Requesting ...')
   if (!env.THINGS_CLOUD_EMAIL || !env.THINGS_CLOUD_PASSWORD)
      throw new TypeError(
         'Please provide both THINGS_CLOUD_EMAIL and THINGS_CLOUD_PASSWORD as environment variables.',
      )

   let client = await auth({
      email: env.THINGS_CLOUD_EMAIL,
      password: env.THINGS_CLOUD_PASSWORD,
   })

   console.log(`Authenticated as ${client.email}, history_key: ${client.history_key}`)
   let history = await getHistory(client)
   console.log(history)
}

await start()
