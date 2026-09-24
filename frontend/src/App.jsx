import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Tours from './pages/Tours'
import TourDetail from './pages/TourDetail'
import Destinations from './pages/Destinations'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import InquiriesAdmin from './admin/InquiriesAdmin'
import ToursAdmin from './admin/ToursAdmin'
import DestinationsAdmin from './admin/DestinationsAdmin'
import GalleryAdmin from './admin/GalleryAdmin'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tours" element={<Tours />} />
        <Route path="tours/:id" element={<TourDetail />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="admin" element={<AdminDashboard />}>
        <Route index element={<InquiriesAdmin />} />
        <Route path="tours" element={<ToursAdmin />} />
        <Route path="destinations" element={<DestinationsAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
      </Route>
    </Routes>
  )
}
