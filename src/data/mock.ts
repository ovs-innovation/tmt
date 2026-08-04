export type Role = 'customer' | 'contractor' | 'dealer' | 'admin'

export const livePrice = {
  pricePerTon: 58420,
  change: 1.2,
  asOf: 'Today, 10:42 AM',
  region: 'Delhi NCR',
  breakup: [
    { label: 'Base Rate', value: 56200 },
    { label: 'Freight Est.', value: 1450 },
    { label: 'Handling', value: 770 },
  ],
}

export const products = [
  {
    id: 'tmt-8',
    name: 'Ambashakti SD TMT',
    dia: '8 mm',
    grade: 'Fe 550D',
    price: 58420,
    unit: 'per ton',
    badge: 'Best Seller',
    image: 'rebars',
    desc: 'High ductility TMT for residential slabs and beams. Earthquake-resistant notching.',
    specs: ['IS 1786', 'Corrosion protected', 'Uniform strength'],
  },
  {
    id: 'tmt-10',
    name: 'Ambashakti SD TMT',
    dia: '10 mm',
    grade: 'Fe 550D',
    price: 58280,
    unit: 'per ton',
    badge: 'Popular',
    image: 'rebars',
    desc: 'Ideal for columns and structural framing with consistent rib pattern.',
    specs: ['IS 1786', 'High tensile', 'ISO certified'],
  },
  {
    id: 'tmt-12',
    name: 'Ambashakti Flexion',
    dia: '12 mm',
    grade: 'Fe 550D',
    price: 58150,
    unit: 'per ton',
    badge: 'Premium',
    image: 'rebars',
    desc: 'Premium flexion grade for high-rise and infrastructure works.',
    specs: ['NHAI approved', 'MES approved', 'Precision notching'],
  },
  {
    id: 'tmt-16',
    name: 'Ambashakti SD TMT',
    dia: '16 mm',
    grade: 'Fe 550D',
    price: 57990,
    unit: 'per ton',
    badge: null,
    image: 'rebars',
    desc: 'Heavy structural bars for commercial and industrial projects.',
    specs: ['High strength', 'Consistent length', 'Trusted by builders'],
  },
  {
    id: 'angle-50',
    name: 'MS Angle',
    dia: '50×50×6',
    grade: 'IS 2062',
    price: 54800,
    unit: 'per ton',
    badge: null,
    image: 'angles',
    desc: 'Precision angles for frames, towers and fabrication.',
    specs: ['Dimensional accuracy', 'Clean edges'],
  },
  {
    id: 'channel-100',
    name: 'MS Channel',
    dia: '100×50',
    grade: 'IS 2062',
    price: 55200,
    unit: 'per ton',
    badge: null,
    image: 'channels',
    desc: 'Structural channels for industrial and commercial builds.',
    specs: ['Stable section', 'Plant quality'],
  },
]

export const dealers = [
  {
    id: 'd1',
    name: 'Shakti Steel Traders',
    area: 'Okhla Phase 2',
    city: 'New Delhi',
    distanceKm: 2.4,
    rating: 4.8,
    phone: '+91 98100 11223',
    open: true,
    stock: 'In stock',
  },
  {
    id: 'd2',
    name: 'NCR TMT Depot',
    area: 'Ghaziabad Industrial',
    city: 'Ghaziabad',
    distanceKm: 8.1,
    rating: 4.6,
    phone: '+91 98200 44556',
    open: true,
    stock: 'Limited',
  },
  {
    id: 'd3',
    name: 'Ambika Building Materials',
    area: 'Faridabad Sec 15',
    city: 'Faridabad',
    distanceKm: 12.6,
    rating: 4.5,
    phone: '+91 98765 33445',
    open: false,
    stock: 'Opens 9 AM',
  },
]

export const orders = [
  {
    id: 'AS-24081',
    product: 'Ambashakti SD TMT 12 mm',
    qty: '2.5 ton',
    amount: 145375,
    status: 'Out for delivery',
    dealer: 'Shakti Steel Traders',
    eta: 'Today, 5:30 PM',
    placedAt: '3 Aug 2026, 11:20 AM',
    address: 'Plot 14, Greater Noida West',
    timeline: [
      { label: 'Order placed', time: '11:20 AM', done: true },
      { label: 'Dealer accepted', time: '11:28 AM', done: true },
      { label: 'Packed at godown', time: '1:10 PM', done: true },
      { label: 'Out for delivery', time: '3:45 PM', done: true },
      { label: 'Delivered', time: 'ETA 5:30 PM', done: false },
    ],
  },
  {
    id: 'AS-24055',
    product: 'Ambashakti SD TMT 10 mm',
    qty: '1.0 ton',
    amount: 58280,
    status: 'Delivered',
    dealer: 'NCR TMT Depot',
    eta: 'Delivered 1 Aug',
    placedAt: '1 Aug 2026, 4:05 PM',
    address: 'Site B, Indirapuram',
    timeline: [
      { label: 'Order placed', time: '4:05 PM', done: true },
      { label: 'Dealer accepted', time: '4:12 PM', done: true },
      { label: 'Out for delivery', time: '10:00 AM', done: true },
      { label: 'Delivered', time: '12:40 PM', done: true },
      { label: 'QR verified', time: '12:55 PM', done: true },
    ],
  },
]

export const pendingDealerOrders = [
  {
    id: 'AS-24091',
    customer: 'Rahul Verma',
    product: 'TMT 12 mm Fe 550D',
    qty: '3.0 ton',
    amount: 174450,
    area: 'Noida Sec 62',
    distanceKm: 3.2,
    slaMins: 12,
  },
  {
    id: 'AS-24092',
    customer: 'Meena Constructions',
    product: 'TMT 16 mm + 10 mm mix',
    qty: '5.5 ton',
    amount: 319000,
    area: 'Okhla',
    distanceKm: 1.1,
    slaMins: 8,
  },
]

export const stockItems = [
  { id: 's1', sku: 'TMT 8 mm', available: 18.5, unit: 'ton', status: 'Healthy' },
  { id: 's2', sku: 'TMT 10 mm', available: 9.2, unit: 'ton', status: 'Healthy' },
  { id: 's3', sku: 'TMT 12 mm', available: 3.4, unit: 'ton', status: 'Low' },
  { id: 's4', sku: 'TMT 16 mm', available: 1.1, unit: 'ton', status: 'Critical' },
  { id: 's5', sku: 'MS Angle 50', available: 6.0, unit: 'ton', status: 'Healthy' },
]

export const rewards = {
  balance: 4280,
  lifetime: 12650,
  tier: 'Steel Plus',
  nextTierAt: 15000,
  campaign: {
    title: 'Monsoon Build Bonus',
    subtitle: 'Earn 2× points on every verified delivery till 31 Aug',
    cta: 'View rules',
  },
  history: [
    { id: 'r1', title: 'QR verified · AS-24055', points: 580, date: '1 Aug', type: 'earn' },
    { id: 'r2', title: 'Referral · Amit joined', points: 1000, date: '28 Jul', type: 'earn' },
    { id: 'r3', title: 'Redeemed · Site tools kit', points: -1500, date: '20 Jul', type: 'redeem' },
  ],
  redeemOptions: [
    { id: 'rd1', title: '₹500 Order Credit', points: 2500, tag: 'Popular' },
    { id: 'rd2', title: 'Safety Kit', points: 1800, tag: null },
    { id: 'rd3', title: '₹1000 Order Credit', points: 4800, tag: 'Best value' },
  ],
}

export const referrals = {
  code: 'AMBA-DRISTY',
  link: 'ambashakti.app/r/AMBA-DRISTY',
  invited: 12,
  joined: 7,
  rewarded: 4,
  earnings: 4000,
  leaderboard: [
    { rank: 1, name: 'Suresh Patel', points: 18200, city: 'Ahmedabad', avatar: '/suresh.png' },
    { rank: 2, name: 'Meena Constructions', points: 15400, city: 'Noida', avatar: '/meena.png' },
    { rank: 3, name: 'You', points: 12650, city: 'Delhi', you: true, avatar: '/avatar-dristy.png' },
    { rank: 4, name: 'Ravi Infra', points: 11200, city: 'Jaipur', avatar: '/ravi.png' },
    { rank: 5, name: 'BuildRight Co.', points: 9800, city: 'Lucknow', avatar: '/buildright.png' },
  ],
}

export const news = [
  {
    id: 'n1',
    title: 'TMT demand rises 8% in NCR this monsoon',
    source: 'Steel Daily',
    time: '2h ago',
  },
  {
    id: 'n2',
    title: 'How to store TMT on site without rust risk',
    source: 'Ambashakti Tips',
    time: 'Yesterday',
  },
  {
    id: 'n3',
    title: 'NHAI projects accelerate steel offtake in North India',
    source: 'Infra Watch',
    time: '2 days ago',
  },
]

export const notifications = [
  {
    id: 'nt1',
    title: 'Order out for delivery',
    body: 'AS-24081 will arrive today by 5:30 PM',
    time: '20 min ago',
    unread: true,
    type: 'order',
  },
  {
    id: 'nt2',
    title: '2× Reward campaign live',
    body: 'Monsoon Build Bonus is active on verified deliveries',
    time: '1h ago',
    unread: true,
    type: 'reward',
  },
  {
    id: 'nt3',
    title: 'Quote saved',
    body: 'Your 12 mm · 2.5 ton quote is valid for 6 hours',
    time: 'Yesterday',
    unread: false,
    type: 'quote',
  },
]

export const savedQuotes = [
  {
    id: 'Q-8891',
    product: 'TMT 12 mm Fe 550D',
    qty: '2.5 ton',
    amount: 145375,
    validTill: 'Today, 5:20 PM',
    status: 'Valid',
  },
  {
    id: 'Q-8802',
    product: 'TMT 8 mm + 10 mm',
    qty: '4.0 ton',
    amount: 233400,
    validTill: 'Expired',
    status: 'Expired',
  },
]

export const wishlist = [
  { id: 'w1', productId: 'tmt-12', note: 'Tower A columns' },
  { id: 'w2', productId: 'tmt-16', note: 'Basement beams' },
]

export const trainingVideos = [
  {
    id: 'v1',
    title: 'How to identify genuine Ambashakti TMT',
    duration: '3:42',
    tag: 'Authenticity',
  },
  {
    id: 'v2',
    title: 'On-site storage best practices',
    duration: '5:10',
    tag: 'Site Tips',
  },
  {
    id: 'v3',
    title: 'Reading a steel quotation correctly',
    duration: '4:05',
    tag: 'Buying',
  },
]

export const adminStats = {
  gmv: 4.82,
  ordersToday: 128,
  activeDealers: 214,
  qrScans: 86,
  rewardLiability: 12.4,
  chartOrders: [
    { day: 'Mon', orders: 92 },
    { day: 'Tue', orders: 110 },
    { day: 'Wed', orders: 104 },
    { day: 'Thu', orders: 128 },
    { day: 'Fri', orders: 141 },
    { day: 'Sat', orders: 98 },
    { day: 'Sun', orders: 74 },
  ],
  chartRegions: [
    { name: 'Delhi NCR', value: 38 },
    { name: 'UP', value: 24 },
    { name: 'Haryana', value: 18 },
    { name: 'Rajasthan', value: 12 },
    { name: 'Others', value: 8 },
  ],
  recentOrders: [
    { id: 'AS-24101', user: 'Rahul V.', dealer: 'Shakti Steel', amount: 145375, status: 'In transit' },
    { id: 'AS-24100', user: 'Meena Co.', dealer: 'NCR Depot', amount: 319000, status: 'Accepted' },
    { id: 'AS-24099', user: 'BuildRight', dealer: 'Ambika BM', amount: 88200, status: 'Delivered' },
    { id: 'AS-24098', user: 'Suresh P.', dealer: 'Shakti Steel', amount: 116560, status: 'Placed' },
  ],
}

export const profileUser = {
  name: 'Dristy',
  phone: '+91 98765 43210',
  city: 'New Delhi',
  memberSince: 'Jan 2026',
}
