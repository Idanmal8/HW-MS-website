import { type Platform, platformLabel } from '~/stores/release'

/** SoftwareApplication structured data for the desktop app. */
export function useSoftwareSchema() {
  const release = useReleaseStore()
  const site = useSiteConfig()
  const available = (Object.keys(release.assets) as Platform[]).filter(p => release.assets[p].available)

  useSchemaOrg([
    defineSoftwareApp({
      name: 'Hard Will',
      applicationCategory: 'GameApplication',
      applicationSubCategory: 'MapleStory progression tracker',
      operatingSystem: (available.length ? available : ['windows' as Platform]).map(p => platformLabel[p]).join(', '),
      softwareVersion: release.version,
      datePublished: release.date,
      description: site.description,
      downloadUrl: `${site.url}/download`,
      offers: { price: 0, priceCurrency: 'USD' },
    }),
  ])
}
