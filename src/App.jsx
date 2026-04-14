import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HomeGallery from './components/HomeGallery';
import Catalog from './components/Catalog';
import Features from './components/Features';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout component
const Layout = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="bg-white min-h-screen text-brand-dark font-sans selection:bg-brand-orange selection:text-white flex flex-col">
      <Header />
      <main className={`flex-grow ${isHome || location.pathname === '/contact' ? '' : 'pt-24'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Page Components
const HomePage = () => (
  <>
    <Hero />
    <HomeGallery />
    <Features />
  </>
);

const CatalogPage = () => (
  <Catalog />
);

const ServicesPage = () => (
  <Features />
);

const ContactPage = () => (
  <ContactForm />
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogue" element={<CatalogPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
