import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { getUserWishlistsFull, deleteWishlist } from '@/services/api';
import { Wishlist } from '@/types';
import { Plus, Calendar, Eye, Trash2, Gift } from 'lucide-react';

/**
 * My Wishlists page component - shows all user's wishlists
 */
export const MyWishlistsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Load user's wishlists
   */
  useEffect(() => {
    const loadWishlists = async () => {
      if (!user) return;

      try {
        const data = await getUserWishlistsFull(user.id);
        setWishlists(data);
      } catch (error) {
        console.error('Error loading wishlists:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlists();
  }, [user]);

  /**
   * Handle delete wishlist
   */
  const handleDelete = async (wishlistId: string) => {
    if (!user) return;

    if (!confirm(t.deleteConfirm)) {
      return;
    }

    try {
      await deleteWishlist(wishlistId, user.id);
      setWishlists((prev) => prev.filter((w) => w.id !== wishlistId));
    } catch (error) {
      console.error('Error deleting wishlist:', error);
      alert(t.errorDeletingItem);
    }
  };

  /**
   * Handle view wishlist
   */
  const handleView = (wishlistId: string) => {
    navigate(`/wishlist/${wishlistId}?owner=true`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{t.myWishlistsTitle}</h1>
          <p className="text-gray-600">{t.myWishlistsSubtitle}</p>
        </div>

        {/* Create Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/create')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            {t.createWishlistButton}
          </button>
        </div>

        {/* Wishlists Grid */}
        {wishlists.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map((wishlist) => (
              <div key={wishlist.id} className="card card-hover">
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {wishlist.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(wishlist.eventDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {wishlist.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-2 text-sm">
                    <Gift className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-700 font-medium">
                      {wishlist.items.length} {t.items}
                    </span>
                    {wishlist.items.some((i) => i.isPurchased) && (
                      <span className="text-green-600 font-medium">
                        ({wishlist.items.filter((i) => i.isPurchased).length}{' '}
                        {t.markAsPurchased.toLowerCase()})
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200 flex gap-2">
                    <button
                      onClick={() => handleView(wishlist.id)}
                      className="flex-1 btn-primary text-sm flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {t.viewWishlist}
                    </button>
                    <button
                      onClick={() => handleDelete(wishlist.id)}
                      className="flex-1 btn-danger text-sm flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      {t.delete}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <div className="text-gray-400 mb-4">
              <Gift className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {t.noWishlistsYet}
            </h3>
            <p className="text-gray-500 mb-6">{t.createFirstWishlist}</p>
            <button onClick={() => navigate('/create')} className="btn-primary">
              <Plus className="w-5 h-5 inline mr-2" />
              {t.createWishlistButton}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
