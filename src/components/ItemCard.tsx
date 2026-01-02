import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { WishlistItem } from '@/types';
import { Pencil, Trash2, ShoppingCart, Undo2, ExternalLink, Gift } from 'lucide-react';

/**
 * Props for the ItemCard component
 */
interface ItemCardProps {
  item: WishlistItem;
  isOwner: boolean;
  allowAnonymousPurchase: boolean;
  onEdit?: (item: WishlistItem) => void;
  onDelete?: (itemId: string) => void;
  onTogglePurchase?: (itemId: string, purchasedBy?: string) => void;
}

/**
 * Card component to display a wishlist item
 */
export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  isOwner,
  allowAnonymousPurchase,
  onEdit,
  onDelete,
  onTogglePurchase,
}) => {
  const { t } = useLanguage();
  const [buyerName, setBuyerName] = useState<string>('');
  const [showNameInput, setShowNameInput] = useState<boolean>(false);

  const handleMarkAsPurchased = () => {
    if (allowAnonymousPurchase) {
      // Allow anonymous purchase
      onTogglePurchase?.(item.id, buyerName || 'Anonymous');
      setBuyerName('');
      setShowNameInput(false);
    } else {
      // Require name
      if (!buyerName.trim()) {
        setShowNameInput(true);
        return;
      }
      onTogglePurchase?.(item.id, buyerName);
      setBuyerName('');
      setShowNameInput(false);
    }
  };

  const handleUnmarkAsPurchased = () => {
    onTogglePurchase?.(item.id);
  };

  return (
    <div
      className={`card card-hover ${
        item.isPurchased ? 'opacity-75 border-2 border-green-400' : ''
      }`}
    >
      {/* Item Image */}
      <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100 h-48">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
            <Gift className="w-16 h-16 text-pink-400" />
          </div>
        )}
        {item.isPurchased && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              {allowAnonymousPurchase && item.purchasedBy === 'Anonymous'
                ? t.markAsPurchased
                : `${t.purchasedBy} ${item.purchasedBy}`}
            </div>
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>

        {/* Product Link */}
        <a
          href={item.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
        >
          {t.viewProduct} <ExternalLink className="ml-1 w-4 h-4" />
        </a>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-gray-200 flex gap-2">
          {isOwner ? (
            // Owner actions: Edit and Delete
            <>
              <button
                onClick={() => onEdit?.(item)}
                className="flex-1 btn-secondary text-sm flex items-center justify-center gap-2"
              >
                <Pencil className="w-4 h-4" />
                {t.edit}
              </button>
              <button
                onClick={() => onDelete?.(item.id)}
                className="flex-1 btn-danger text-sm flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                {t.delete}
              </button>
            </>
          ) : (
            // Visitor actions: Mark as Purchased
              <div className="w-full">
              {!item.isPurchased ? (
                <div className="space-y-2">
                  {(showNameInput || !allowAnonymousPurchase) && (
                    <input
                      type="text"
                      placeholder={allowAnonymousPurchase ? `${t.yourNameInput} (${t.cancel.toLowerCase()})` : t.yourNameInput}
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="input-field text-sm"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleMarkAsPurchased();
                        }
                      }}
                    />
                  )}
                  <button
                    onClick={handleMarkAsPurchased}
                    className="w-full btn-primary text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {(showNameInput || !allowAnonymousPurchase) ? t.confirmPurchase : t.markAsPurchased}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleUnmarkAsPurchased}
                  className="w-full btn-secondary text-sm flex items-center justify-center gap-2"
                >
                  <Undo2 className="w-4 h-4" />
                  {t.unmarkAsPurchased}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
