import type { Supporters } from '~~/server/api/supporters.get'

/** The Patreon supporters, fetched once per build and shared by every page. */
export function useSupporters() {
  return useFetch<Supporters>('/api/supporters', {
    key: 'supporters',
    default: () => ({ credited: [], total: 0, tiers: [], updatedAt: null }),
  })
}
