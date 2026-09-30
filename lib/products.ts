export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  priceInCents: number
  image: string
  specs: { label: string; value: string }[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'node-k1',
    name: 'Node K1',
    tagline: '75% mechanical keyboard',
    description:
      'CNC-milled aluminum, hot-swappable switches, and a gasket mount tuned for a quiet, deep sound. Built for long sessions in the terminal.',
    priceInCents: 18900,
    image: '/images/k1-keyboard.png',
    specs: [
      { label: 'Layout', value: '75% / 84 keys' },
      { label: 'Latency', value: '1ms wired' },
      { label: 'Battery', value: '200 hrs' },
      { label: 'Weight', value: '1.2 kg' },
    ],
  },
  {
    id: 'node-dock',
    name: 'Node Dock',
    tagline: '11-in-1 USB-C hub',
    description:
      'One cable for everything. Dual 4K output, 100W passthrough, and 10Gbps data in a single anodized block that disappears on your desk.',
    priceInCents: 12900,
    image: '/images/dock.png',
    specs: [
      { label: 'Ports', value: '11' },
      { label: 'Display', value: 'Dual 4K60' },
      { label: 'Power', value: '100W PD' },
      { label: 'Data', value: '10 Gbps' },
    ],
  },
  {
    id: 'node-m1',
    name: 'Node M1',
    tagline: 'Wireless precision mouse',
    description:
      'A 26K DPI sensor in a 58g shell. Tri-mode connectivity switches between your machines instantly, with a battery that lasts months.',
    priceInCents: 8900,
    image: '/images/mouse.png',
    specs: [
      { label: 'Sensor', value: '26K DPI' },
      { label: 'Weight', value: '58 g' },
      { label: 'Polling', value: '4 kHz' },
      { label: 'Battery', value: '90 days' },
    ],
  },
]

export function formatPrice(cents: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100)
}
