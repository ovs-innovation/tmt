import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { RewardsProvider } from './context/RewardsContext'
import { AppShell } from './components/AppShell'
import Splash from './pages/Splash'
import Welcome from './pages/Welcome'
import OtpLogin from './pages/OtpLogin'
import RoleSelect from './pages/RoleSelect'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import ProductDetail from './pages/ProductDetail'
import Quote from './pages/Quote'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Rewards from './pages/Rewards'
import Redeem from './pages/Redeem'
import Referral from './pages/Referral'
import Leaderboard from './pages/Leaderboard'
import DealerOrders from './pages/DealerOrders'
import DealerStock from './pages/DealerStock'
import Dealers from './pages/Dealers'
import ScanQr from './pages/ScanQr'
import Notifications from './pages/Notifications'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Support from './pages/Support'
import Calculator from './pages/Calculator'
import Wishlist from './pages/Wishlist'
import SavedQuotes from './pages/SavedQuotes'
import Training from './pages/Training'
import PriceDetail from './pages/PriceDetail'
import Admin from './pages/Admin'

export default function App() {
  return (
    <AppProvider>
      <RewardsProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<OtpLogin />} />
          <Route path="/role" element={<RoleSelect />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/app" element={<AppShell />}>
            <Route path="home" element={<Home />} />
            <Route path="catalogue" element={<Catalogue />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="quote" element={<Quote />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success" element={<OrderSuccess />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="rewards" element={<Rewards />} />
            <Route path="redeem" element={<Redeem />} />
            <Route path="referral" element={<Referral />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="dealer/orders" element={<DealerOrders />} />
            <Route path="dealer/stock" element={<DealerStock />} />
            <Route path="dealers" element={<Dealers />} />
            <Route path="scan" element={<ScanQr />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="saved-quotes" element={<SavedQuotes />} />
            <Route path="training" element={<Training />} />
            <Route path="price" element={<PriceDetail />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </RewardsProvider>
    </AppProvider>
  )
}
