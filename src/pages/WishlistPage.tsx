import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Wishlist, WishlistItem, CreateWishlistItemDTO, ContributeDTO, ReserveItemDTO } from '@/types';
import {
  getWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
  markItemAsPurchased,
  unmarkItemAsPurchased,
  contributeToPooledGift,
  reserveItem,
  unreserveItem,
} from '@/services/api';
import { ItemCard } from '@/components/ItemCard';
import { ItemFormModal } from '@/components/ItemFormModal';
import { ContributionModal } from '@/components/ContributionModal';
import { ResponsiveAdBanner } from '@/components/AdBanner';
import BirthdayPersonProfile from '@/components/BirthdayPersonProfile';
import {
  Plus,
  Share2,
  Calendar,
  User,
  ArrowLeft,
  Check,
} from 'lucide-react';

/**
 * Format date string to local date display (avoids timezone issues)
 */
const formatEventDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('T')[0].split('-');
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString();
};

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
  const [contributionModalOpen, setContributionModalOpen] = useState(false);
  const [contributingToItem, setContributingToItem] = useState<WishlistItem | null>(null);

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
        setIsOwner(ownerParam === 'true' || Boolean(isUserOwner));
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
   * Handle contribution to pooled gift
   */
  const handleContribute = async (itemId: string, _data: ContributeDTO) => {
    if (!wishlist) return;

    // Find the item to get its details
    const item = wishlist.items.find(i => i.id === itemId);
    if (!item || item.itemType !== 'pooled_gift') return;

    setContributingToItem(item);
    setContributionModalOpen(true);
  };

  /**
   * Submit contribution
   */
  const handleSubmitContribution = async (data: ContributeDTO) => {
    if (!wishlist || !contributingToItem) return;

    try {
      const updatedItem = await contributeToPooledGift(
        wishlist.id,
        contributingToItem.id,
        data
      );

      // Update the wishlist with the updated item
      setWishlist({
        ...wishlist,
        items: wishlist.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      });

      alert(`¡Gracias ${data.contributorName}! Tu contribución de $${data.amount.toFixed(2)} fue agregada exitosamente.`);
    } catch (error: any) {
      console.error('Error contributing:', error);
      alert(error.message || 'Error al contribuir');
    }
  };

  /**
   * View contributions for an item
   */
  const handleViewContributions = (itemId: string) => {
    if (!wishlist) return;
    const item = wishlist.items.find(i => i.id === itemId);
    if (!item) return;

    const contributionsList = item.contributions
      ?.map(c => `• ${c.contributorName}: $${c.amount.toFixed(2)}${c.message ? ` - "${c.message}"` : ''}`)
      .join('\n') || 'No hay contribuciones aún';

    alert(`Contribuciones para "${item.title}":\n\n${contributionsList}`);
  };

  /**
   * Reserve an item
   */
  const handleReserve = async (itemId: string, data: ReserveItemDTO) => {
    if (!wishlist) return;

    try {
      const updatedItem = await reserveItem(wishlist.id, itemId, data);

      // Update the wishlist with the updated item
      setWishlist({
        ...wishlist,
        items: wishlist.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      });

      alert(`¡Item reservado por ${data.reservedBy}! Otros visitantes verán que está reservado.`);
    } catch (error: any) {
      console.error('Error reserving:', error);
      alert(error.message || 'Error al reservar');
    }
  };

  /**
   * Unreserve an item
   */
  const handleUnreserve = async (itemId: string) => {
    if (!wishlist) return;

    try {
      const updatedItem = await unreserveItem(wishlist.id, itemId);

      // Update the wishlist with the updated item
      setWishlist({
        ...wishlist,
        items: wishlist.items.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        ),
      });

      alert('Reserva liberada. El item está disponible nuevamente.');
    } catch (error: any) {
      console.error('Error unreserving:', error);
      alert(error.message || 'Error al liberar reserva');
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
                  <div className="p-2 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">{wishlist.ownerName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">
                    {formatEventDate(wishlist.eventDate)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {wishlist.items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isOwner={isOwner}
                  allowAnonymousPurchase={wishlist.allowAnonymousPurchase}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteItem}
                  onTogglePurchase={handleTogglePurchase}
                  onContribute={handleContribute}
                  onViewContributions={handleViewContributions}
                  onReserve={handleReserve}
                  onUnreserve={handleUnreserve}
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

        {/* Contribution Modal */}
        {contributingToItem && (
          <ContributionModal
            isOpen={contributionModalOpen}
            onClose={() => {
              setContributionModalOpen(false);
              setContributingToItem(null);
            }}
            onSubmit={handleSubmitContribution}
            itemTitle={contributingToItem.title}
            targetAmount={contributingToItem.targetAmount || 0}
            currentAmount={contributingToItem.currentAmount || 0}
          />
        )}
      </div>
    </div>
  );
};
