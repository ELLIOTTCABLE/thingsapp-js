type uuid = string

export type Client = {
   email: string
   password: string
   history_key: uuid
}

function headers() {
   const h = new Headers()
   h.set("Host", "cloud.culturedcode.com")
   h.set("User-Agent", "thingsapp-js/0.1")
   h.set("Content-Type", "application/json; charset=UTF-8")
   h.set("Accept", "application/json")
   h.set("Accept-Charset", "UTF-8")
   h.set("Accept-Language", "en-US,en;q=0.9")
}

export async function auth({
   email,
   password,
}: {
   email: string
   password: string
}): Promise<Client> {
   const req = new Request(`https://cloud.culturedcode.com/version/1/account/${email}`, {
      headers: {
         Authorization: "Password " + password,
      },
   })
   let resp = await fetch(req)
   if (!resp.ok) {
      return Promise.reject(`Authentication failed: ${resp.statusText}`)
   }

   let data = await resp.json()
   let history_key = data["history-key"]

   return { email, password, history_key }
}

export async function getHistory(client: Client, startIndex: number = 0) {
   const req = new Request(
      `https://cloud.culturedcode.com/version/1/history/${client.history_key}/items?start-index=${startIndex}`,
   )
   let resp = await fetch(req)
   if (!resp.ok) {
      return Promise.reject(`Failed to get history: ${resp.statusText}`)
   }

   let data = await resp.json()
   return data
}
