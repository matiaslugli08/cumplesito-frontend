import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Wishlist, WishlistItem, CreateWishlistItemDTO } from '@/types';
import {
  getWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
  markItemAsPurchased,
  unmarkItemAsPurchased,
} from '@/services/api';
import { ItemCard } from '@/components/ItemCard';
import { ItemFormModal } from '@/components/ItemFormModal';
import { ResponsiveAdBanner } from '@/components/AdBanner';
import BirthdayPersonProfile from '@/components/BirthdayPersonProfile';
import {
  Plus,
  Share2,
  Calendar,
  User,
  ArrowLeft,
  Copy,
  Check,
} from 'lucide-react';

/**
 * Main wishlist page component - displays and manages a wishlist
 */
export const WishlistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  const [wishlist, setWishlist] = useState<Wishlist | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WishlistItem | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  /**
   * Load wishlist data
   */
  useEffect(() => {
    const loadWishlist = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        const data = await getWishlist(id);
        if (!data) {
          alert(t.wishlistNotFound);
          navigate('/');
          return;
        }
        setWishlist(data);

        // Check if user is owner
        const ownerParam = searchParams.get('owner');
        const isUserOwner = user && data.ownerId === user.id;
        setIsOwner(ownerParam === 'true' || isUserOwner);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        alert(t.errorLoadingWishlist);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    loadWishlist();
  }, [id, navigate, searchParams, user, t]);

  /**
   * Handle adding a new item
   */
  const handleAddItem = async (data: CreateWishlistItemDTO) => {
    if (!id) return;

    try {
      await addWishlistItem(id, data);
      const updatedWishlist = await getWishlist(id);
      if (updatedWishlist) {
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert(t.errorAddingItem);
    }
  };

  /**
   * Handle editing an item
   */
  const handleEditItem = async (data: CreateWishlistItemDTO) => {
    if (!id || !editingItem) return;

    try {
      await updateWishlistItem(id, editingItem.id, data);
      const updatedWishlist = await getWishlist(id);
      if (updatedWishlist) {
        setWishlist(updatedWishlist);
      }
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating item:', error);
      alert(t.errorUpdatingItem);
    }
  };

  /**
   * Handle deleting an item
   */
  const handleDeleteItem = async (itemId: string) => {
    if (!id) return;

    if (!confirm(t.deleteConfirm)) {
      return;
    }

    try {
      await deleteWishlistItem(id, itemId);
      const updatedWishlist = await getWishlist(id);
      if (updatedWishlist) {
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(t.errorDeletingItem);
    }
  };

  /**
   * Handle toggling purchase status
   */
  const handleTogglePurchase = async (itemId: string, purchasedBy?: string) => {
    if (!id) return;

    try {
      if (purchasedBy) {
        await markItemAsPurchased(id, itemId, { purchasedBy });
      } else {
        await unmarkItemAsPurchased(id, itemId);
      }
      const updatedWishlist = await getWishlist(id);
      if (updatedWishlist) {
        setWishlist(updatedWishlist);
      }
    } catch (error) {
      console.error('Error toggling purchase:', error);
      alert(t.errorUpdatingItem);
    }
  };

  /**
   * Copy shareable link to clipboard
   */
  const handleCopyLink = async () => {
    if (!wishlist) return;

    try {
      await navigator.clipboard.writeText(wishlist.shareableLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      console.error('Error copying link:', error);
      alert(t.errorUpdatingItem);
    }
  };

  /**
   * Open modal for editing an item
   */
  const handleOpenEditModal = (item: WishlistItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  /**
   * Open modal for adding a new item
   */
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  /**
   * Close the modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
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

  if (!wishlist) {
    return null;
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.backToHome}
        </button>

        {/* Header */}
        <div className="card mb-8">
          <div className="space-y-4">
            {/* Title and Owner Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {wishlist.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{wishlist.ownerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {new Date(wishlist.eventDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700">{wishlist.description}</p>
          </div>
        </div>

        {/* AI-Generated Profile */}
        {wishlist.birthdayPersonProfile && (
          <BirthdayPersonProfile
            profile={wishlist.birthdayPersonProfile}
            ownerName={wishlist.ownerName}
          />
        )}

        {/* Actions Card */}
        <div className="card mb-8">
          <div className="flex flex-wrap gap-3">
              {isOwner && (
                <button
                  onClick={handleOpenAddModal}
                  className="btn-primary flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  {t.addItem}
                </button>
              )}
              <button
                onClick={handleCopyLink}
                className="btn-secondary flex items-center gap-2"
              >
                {linkCopied ? (
                  <>
                    <Check className="w-5 h-5" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" />
                    {isOwner ? t.copyShareLink : t.copyLink}
                  </>
                )}
              </button>
          </div>

          {/* Owner Notice */}
          {isOwner && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-primary-800">
                <strong>{t.ownerNotice}</strong>
              </p>
            </div>
          )}
        </div>

        {/* Items Grid */}
        {wishlist.items.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isOwner={isOwner}
                  allowAnonymousPurchase={wishlist.allowAnonymousPurchase}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteItem}
                  onTogglePurchase={handleTogglePurchase}
                />
              ))}
            </div>

            {/* Advertisement - Subtle placement after items */}
            <div className="mt-8">
              <ResponsiveAdBanner slotId="wishlist-bottom" />
            </div>
          </>
        ) : (
          <div className="card text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {t.noItemsYet}
            </h3>
            <p className="text-gray-500 mb-6">
              {isOwner ? t.noItemsOwner : t.noItemsVisitor}
            </p>
            {isOwner && (
              <button onClick={handleOpenAddModal} className="btn-primary">
                <Plus className="w-5 h-5 inline mr-2" />
                {t.addFirstItem}
              </button>
            )}
          </div>
        )}

        {/* Item Form Modal */}
        <ItemFormModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          editItem={editingItem}
        />
      </div>
    </div>
  );
};
