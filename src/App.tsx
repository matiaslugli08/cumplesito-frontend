import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Header } from '@/components/Header';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { CreateWishlistPage } from '@/pages/CreateWishlistPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { MyWishlistsPage } from '@/pages/MyWishlistsPage';

/**
 * Main App component with routing and providers
 */
function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <WishlistProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/create" element={<CreateWishlistPage />} />
                  <Route path="/wishlist/:id" element={<WishlistPage />} />
                  <Route path="/my-wishlists" element={<MyWishlistsPage />} />
                </Routes>
              </main>
            </div>
          </WishlistProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
