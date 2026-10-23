import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export interface Transaction {
  id: string
  type: 'earn' | 'redeem'
  title: string
  points: number
  date: string
  amount?: number
  customer?: string
  status: 'Verified' | 'HQ Dispatched' | 'Processing'
  invoiceNo?: string
  bonusLabel?: string
}

export interface CatalogueItem {
  id: string
  title: string
  subtitle: string
  points: number
  category: string
  icon: string
  tag?: string
  specs: string
  inStock: boolean
}

export interface ReferredContractor {
  id: string
  name: string
  phone: string
  site: string
  status: 'Active' | 'Verifying' | 'Invited'
  invoicedTons: number
  pointsAwarded: number
  joinedDate: string
}

export interface VolumeSlab {
  minAmount: number
  label: string
  points: number
  commercialIncentive: string
  isBonus?: boolean
  multiplierDesc: string
}

export const VOLUME_SLABS: VolumeSlab[] = [
  {
    minAmount: 10000,
    label: '₹10,000',
    points: 100,
    commercialIncentive: 'Standard Base Accrual',
    multiplierDesc: '100 Pts / ₹10,000 Base Ratio',
  },
  {
    minAmount: 25000,
    label: '₹25,000',
    points: 250,
    commercialIncentive: 'Linear Transaction Rate',
    multiplierDesc: 'Direct linear volume accrual',
  },
  {
    minAmount: 50000,
    label: '₹50,000',
    points: 600,
    commercialIncentive: '+20% High-Basket Bonus',
    isBonus: true,
    multiplierDesc: 'High-Basket Incentive (+20% extra)',
  },
  {
    minAmount: 100000,
    label: '₹1,00,000',
    points: 1500,
    commercialIncentive: '+50% Commercial Volume Accelerator',
    isBonus: true,
    multiplierDesc: 'Commercial Accelerator (+50% extra)',
  },
]

export const CATALOGUE_ITEMS: CatalogueItem[] = [
  {
    id: 'cat-polo',
    title: 'Corporate Apparel',
    subtitle: 'Branded Polo Shirt',
    points: 2000,
    category: 'Apparel',
    icon: '👕',
    tag: 'Official Merch',
    specs: 'Premium dry-fit cotton with Amba Shakti embroidered crest. Available in M/L/XL.',
    inStock: true,
  },
  {
    id: 'cat-toolkit',
    title: 'Workshop Tool Kit',
    subtitle: 'Heavy-Duty Case',
    points: 5000,
    category: 'Tools',
    icon: '🧰',
    tag: 'Site Favorite',
    specs: '46-piece forged carbon-steel socket, ratchets, measuring tape & heavy-duty blow mold case.',
    inStock: true,
  },
  {
    id: 'cat-drill',
    title: 'Impact Drill Machine',
    subtitle: '13mm Industrial Kit',
    points: 10000,
    category: 'Machinery',
    icon: '⚡',
    tag: 'Best Seller',
    specs: '750W high-torque industrial motor with hammer function, auxiliary handle & depth gauge.',
    inStock: true,
  },
  {
    id: 'cat-tv',
    title: 'Smart LED Television',
    subtitle: '55" 4K Display Unit',
    points: 25000,
    category: 'Electronics',
    icon: '📺',
    tag: 'Tier Milestone',
    specs: '55-inch Ultra HD 4K, HDR10+, Dolby Audio, Google TV OS, with 3-year commercial on-site warranty.',
    inStock: true,
  },
  {
    id: 'cat-travel',
    title: 'International Travel',
    subtitle: 'All-Inclusive Holiday',
    points: 100000,
    category: 'Luxury Reward',
    icon: '✈️',
    tag: 'Elite Grand Prize',
    specs: '5 Days / 4 Nights all-inclusive luxury holiday package to Dubai or Thailand (Flights, 5-Star Stay & Visa).',
    inStock: true,
  },
]

const INITIAL_DEALER_DATA = {
  dealerName: 'Shakti Steel Traders',
  partnerStatus: 'VERIFIED PARTNER',
  tier: 'Gold Dealer',
  availablePoints: 14850,
  lifetimeEarned: 32400,
  customerSalesCount: 28,
  totalRedeemed: 17550,
  giftsDelivered: 4,
  nextTier: 'Platinum Dealer',
  nextTierAt: 50000,
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-4401',
    type: 'earn',
    title: 'Bill #INV-4401 (Customer: Apex Build)',
    points: 600,
    amount: 50000,
    customer: 'Apex Build',
    invoiceNo: 'INV-4401',
    date: 'Today, 2:15 PM',
    status: 'Verified',
    bonusLabel: '+20% High-Basket Bonus',
  },
  {
    id: 'tx-redeem-drill',
    type: 'redeem',
    title: 'Redemption: Impact Drill Machine',
    points: -10000,
    date: 'Yesterday, 4:30 PM',
    status: 'HQ Dispatched',
    bonusLabel: 'Merchandise Dispatch',
  },
  {
    id: 'tx-4389',
    type: 'earn',
    title: 'Bill #INV-4389 (Customer: Shanti Infra)',
    points: 1500,
    amount: 100000,
    customer: 'Shanti Infra',
    invoiceNo: 'INV-4389',
    date: '21 Oct, 11:10 AM',
    status: 'Verified',
    bonusLabel: '+50% Commercial Volume Accelerator',
  },
  {
    id: 'tx-4372',
    type: 'earn',
    title: 'Bill #INV-4372 (Customer: Modern Residency)',
    points: 250,
    amount: 25000,
    customer: 'Modern Residency',
    invoiceNo: 'INV-4372',
    date: '18 Oct, 5:40 PM',
    status: 'Verified',
    bonusLabel: 'Linear Accrual',
  },
  {
    id: 'tx-4360',
    type: 'earn',
    title: 'Bill #INV-4360 (Customer: Horizon Homes)',
    points: 100,
    amount: 10000,
    customer: 'Horizon Homes',
    invoiceNo: 'INV-4360',
    date: '15 Oct, 1:20 PM',
    status: 'Verified',
    bonusLabel: 'Base Rate',
  },
]

const INITIAL_REFERRAL_DATA = {
  customerCode: 'AMBA-CUST-8812',
  invitesSent: 8,
  verifyingSites: 2,
  purchasesVerified: 6,
  discountValueRupees: 3000,
  referralPoints: 3000,
  contractors: [
    {
      id: 'c-1',
      name: 'Ramesh Mistri & Sons',
      phone: '+91 98112 44321',
      site: 'Plot 44, Sec 78 Noida',
      status: 'Active' as const,
      invoicedTons: 14.5,
      pointsAwarded: 1450,
      joinedDate: '12 Oct 2026',
    },
    {
      id: 'c-2',
      name: 'Gupta Construction Works',
      phone: '+91 98223 99881',
      site: 'Tower B, Greater Noida West',
      status: 'Active' as const,
      invoicedTons: 22.0,
      pointsAwarded: 2200,
      joinedDate: '16 Oct 2026',
    },
    {
      id: 'c-3',
      name: 'Verma Site Fabricators',
      phone: '+91 98711 00213',
      site: 'Green Villa, Faridabad Sec 16',
      status: 'Verifying' as const,
      invoicedTons: 0,
      pointsAwarded: 0,
      joinedDate: 'Yesterday (OTP Verified, Awaiting First Invoice)',
    },
    {
      id: 'c-4',
      name: 'Shree Krishna Builders',
      phone: '+91 98990 11244',
      site: 'Commercial Block C, Okhla',
      status: 'Verifying' as const,
      invoicedTons: 0,
      pointsAwarded: 0,
      joinedDate: 'Today (Site Coordinates Logged)',
    },
  ],
}

interface RewardsContextType {
  // Dealer State
  dealer: typeof INITIAL_DEALER_DATA
  transactions: Transaction[]
  // Referral State
  referral: typeof INITIAL_REFERRAL_DATA
  // Helper calculations
  calculatePointsForSale: (amount: number) => {
    points: number
    bonusRate: string
    isAccelerator: boolean
  }
  // Actions for live demo
  simulateSale: (amount: number, customerName: string) => {
    points: number
    invoiceNo: string
    bonusLabel: string
  }
  redeemGift: (item: CatalogueItem) => {
    success: boolean
    message: string
  }
  inviteContractor: (name: string, phone: string, site: string) => void
  resetToBlueprintDefault: () => void
}

const RewardsContext = createContext<RewardsContextType | null>(null)

const STORAGE_KEY = 'amba_shakti_rewards_state_v1'

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [dealer, setDealer] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_dealer`)
    return saved ? JSON.parse(saved) : INITIAL_DEALER_DATA
  })

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tx`)
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS
  })

  const [referral, setReferral] = useState(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_ref`)
    return saved ? JSON.parse(saved) : INITIAL_REFERRAL_DATA
  })

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_dealer`, JSON.stringify(dealer))
  }, [dealer])

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_tx`, JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_ref`, JSON.stringify(referral))
  }, [referral])

  const calculatePointsForSale = (amount: number) => {
    if (amount >= 100000) {
      const units = amount / 100000
      return {
        points: Math.round(units * 1500),
        bonusRate: '+50% Commercial Volume Accelerator',
        isAccelerator: true,
      }
    }
    if (amount >= 50000) {
      const units = amount / 50000
      return {
        points: Math.round(units * 600),
        bonusRate: '+20% High-Basket Bonus',
        isAccelerator: true,
      }
    }
    if (amount >= 25000) {
      const units = amount / 25000
      return {
        points: Math.round(units * 250),
        bonusRate: 'Linear Transaction Rate',
        isAccelerator: false,
      }
    }
    const units = Math.max(1, amount / 10000)
    return {
      points: Math.round(units * 100),
      bonusRate: 'Standard Base Accrual (100 Pts / ₹10,000)',
      isAccelerator: false,
    }
  }

  const simulateSale = (amount: number, customerName: string) => {
    const calc = calculatePointsForSale(amount)
    const randomInv = `INV-${Math.floor(4400 + Math.random() * 99)}`

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      type: 'earn',
      title: `Bill #${randomInv} (Customer: ${customerName || 'Direct Build'})`,
      points: calc.points,
      amount,
      customer: customerName || 'Direct Build',
      invoiceNo: randomInv,
      date: 'Just now',
      status: 'Verified',
      bonusLabel: calc.bonusRate,
    }

    setTransactions((prev) => [newTx, ...prev])
    setDealer((prev: typeof INITIAL_DEALER_DATA) => ({
      ...prev,
      availablePoints: prev.availablePoints + calc.points,
      lifetimeEarned: prev.lifetimeEarned + calc.points,
      customerSalesCount: prev.customerSalesCount + 1,
    }))

    return {
      points: calc.points,
      invoiceNo: randomInv,
      bonusLabel: calc.bonusRate,
    }
  }

  const redeemGift = (item: CatalogueItem) => {
    if (dealer.availablePoints < item.points) {
      return {
        success: false,
        message: `Insufficient points! You need ${item.points.toLocaleString('en-IN')} Pts, available is ${dealer.availablePoints.toLocaleString('en-IN')} Pts.`,
      }
    }

    const newTx: Transaction = {
      id: `tx-red-${Date.now()}`,
      type: 'redeem',
      title: `Redemption: ${item.subtitle || item.title}`,
      points: -item.points,
      date: 'Just now',
      status: 'HQ Dispatched',
      bonusLabel: 'Corporate Merchandise Dispatch',
    }

    setTransactions((prev) => [newTx, ...prev])
    setDealer((prev: typeof INITIAL_DEALER_DATA) => ({
      ...prev,
      availablePoints: prev.availablePoints - item.points,
      totalRedeemed: prev.totalRedeemed + item.points,
      giftsDelivered: prev.giftsDelivered + 1,
    }))

    return {
      success: true,
      message: `${item.title} (${item.subtitle}) redeemed successfully! Corporate logistics dispatch ticket created.`,
    }
  }

  const inviteContractor = (name: string, phone: string, site: string) => {
    const newContractor: ReferredContractor = {
      id: `c-${Date.now()}`,
      name: name || 'Site Contractor',
      phone: phone || '+91 98000 00000',
      site: site || 'Under Construction Site',
      status: 'Verifying',
      invoicedTons: 0,
      pointsAwarded: 0,
      joinedDate: 'Just now (OTP Verified, First Order Pending)',
    }

    setReferral((prev: typeof INITIAL_REFERRAL_DATA) => ({
      ...prev,
      invitesSent: prev.invitesSent + 1,
      verifyingSites: prev.verifyingSites + 1,
      contractors: [newContractor, ...prev.contractors],
    }))
  }

  const resetToBlueprintDefault = () => {
    setDealer(INITIAL_DEALER_DATA)
    setTransactions(INITIAL_TRANSACTIONS)
    setReferral(INITIAL_REFERRAL_DATA)
    localStorage.removeItem(`${STORAGE_KEY}_dealer`)
    localStorage.removeItem(`${STORAGE_KEY}_tx`)
    localStorage.removeItem(`${STORAGE_KEY}_ref`)
  }

  return (
    <RewardsContext.Provider
      value={{
        dealer,
        transactions,
        referral,
        calculatePointsForSale,
        simulateSale,
        redeemGift,
        inviteContractor,
        resetToBlueprintDefault,
      }}
    >
      {children}
    </RewardsContext.Provider>
  )
}

export function useRewards() {
  const ctx = useContext(RewardsContext)
  if (!ctx) throw new Error('useRewards must be used within RewardsProvider')
  return ctx
}
