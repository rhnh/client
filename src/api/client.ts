import { SERVER_URL } from 'utils/configs'
async function client(endpoint: string, data: any) {
  return window
    .fetch(`${SERVER_URL}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async response => {
      if (response.status === 409) {
        return Promise.reject({ message: 'Please re-authenticate.' })
      }
      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(response)
      }
    })
}

export { client }
