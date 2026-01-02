import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Gift, LogOut, User } from 'lucide-react';

/**
 * Header component with navigation and language selector
 */
export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
          >
            <img
              src="/cumplesito-logo.svg"
              alt="Cumplesito Logo"
              className="w-10 h-10 group-hover:scale-110 transition-transform"
            />
            <span className="font-bold text-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              Cumplesito
            </span>
          </button>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <LanguageSelector />

            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/my-wishlists')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive('/my-wishlists')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.myWishlists}
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-600 px-3 py-2 bg-gray-100 rounded-lg">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive('/login')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t.login}
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary"
                >
                  {t.register}
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
