import { URL } from '../const/const'

export const fetchCandidates = async () => {
  const result = await fetch(URL)
  if (!result.ok) {
    throw new Error('Failed to fetch candidates')
  }
  return await result.json()
}
