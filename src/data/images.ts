export const images = {
  splash: '/products/dusk.jpg',
  welcome: '/products/tmt.jpg',
  rebar: '/products/tmt.jpg',
  steelClose: '/products/rebar-coil.jpg',
  site: '/products/rebar-site.jpg',
  construction: '/products/steel-structure.jpg',
  dusk: '/products/dusk.jpg',
  avatar: '/avatar-dristy.png',
  roles: {
    customer: '/roles/customer.jpg',
    contractor: '/roles/contractor.jpg',
    dealer: '/roles/dealer.jpg',
    admin: '/roles/admin.jpg',
  } as Record<string, string>,
  dealers: {
    d1: '/dealers/d1.jpg',
    d2: '/dealers/d2.jpg',
    d3: '/dealers/d3.jpg',
  } as Record<string, string>,
  products: {
    'tmt-8': '/products/tmt-8.jpg',
    'tmt-10': '/products/tmt-10.jpg',
    'tmt-12': '/products/tmt-12.jpg',
    'tmt-16': '/products/tmt-16.jpg',
    'angle-50': '/products/angle.jpg',
    'channel-100': '/products/channel.jpg',
  } as Record<string, string>,
}

export function productImage(id: string) {
  return images.products[id] ?? images.rebar
}

export function dealerImage(id: string) {
  return images.dealers[id] ?? images.site
}

export function roleImage(id: string) {
  return images.roles[id] ?? images.construction
}
