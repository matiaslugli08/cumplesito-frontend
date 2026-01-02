import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { WishlistItem, ContributeDTO, ReserveItemDTO } from '@/types';
import { Pencil, Trash2, ShoppingCart, Undo2, ExternalLink, Gift, DollarSign, Users, Clock } from 'lucide-react';

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
  onContribute?: (itemId: string, data: ContributeDTO) => void;
  onViewContributions?: (itemId: string) => void;
  onReserve?: (itemId: string, data: ReserveItemDTO) => void;
  onUnreserve?: (itemId: string) => void;
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
  onContribute,
  onViewContributions,
  onReserve,
  onUnreserve,
}) => {
  const { t } = useLanguage();
  const [buyerName, setBuyerName] = useState<string>('');
  const [showNameInput, setShowNameInput] = useState<boolean>(false);
  const [showReserveInput, setShowReserveInput] = useState<boolean>(false);
  const [reserverName, setReserverName] = useState<string>('');

  const isPooledGift = item.itemType === 'pooled_gift';
  const percentComplete = isPooledGift && item.targetAmount
    ? Math.min((item.currentAmount || 0) / item.targetAmount * 100, 100)
    : 0;
  const remainingAmount = isPooledGift && item.targetAmount
    ? item.targetAmount - (item.currentAmount || 0)
    : 0;

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

  const handleReserve = () => {
    if (!reserverName.trim() && !allowAnonymousPurchase) {
      setShowReserveInput(true);
      return;
    }
    onReserve?.(item.id, { reservedBy: reserverName || 'Anónimo' });
    setReserverName('');
    setShowReserveInput(false);
  };

  const handleUnreserve = () => {
    onUnreserve?.(item.id);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-3 ${
        item.isPurchased ? 'opacity-75 border-2 border-green-400' : 'border border-gray-200'
      }`}
    >
      {/* Item Image */}
      <div className="relative mb-3 rounded-md overflow-hidden bg-gray-100 h-40">
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
            <Gift className="w-12 h-12 text-pink-400" />
          </div>
        )}
        {item.isPurchased && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
            <div className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold shadow-lg text-xs">
              {allowAnonymousPurchase && item.purchasedBy === 'Anonymous'
                ? t.markAsPurchased
                : `${t.purchasedBy} ${item.purchasedBy}`}
            </div>
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">
            {item.title}
          </h3>
          <div className="flex flex-col gap-1">
            {isPooledGift && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full whitespace-nowrap">
                💰 Colecta
              </span>
            )}
            {item.isReserved && !item.isPurchased && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full whitespace-nowrap flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                Reservado
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 text-xs line-clamp-2">{item.description}</p>

        {/* Pooled Gift Progress */}
        {isPooledGift && item.targetAmount && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-md p-2 space-y-1">
            <div className="flex justify-between text-xs text-gray-700">
              <span className="font-semibold">${item.currentAmount?.toFixed(0) || 0}</span>
              <span className="text-gray-500">de ${item.targetAmount.toFixed(0)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-purple-600">
                {percentComplete.toFixed(0)}%
              </span>
              {item.contributions && item.contributions.length > 0 && (
                <button
                  onClick={() => onViewContributions?.(item.id)}
                  className="text-xs text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  <Users className="w-3 h-3" />
                  {item.contributions.length} {item.contributions.length === 1 ? 'persona' : 'personas'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Product Link (only if URL is provided) */}
        {item.productUrl && !isPooledGift && (
          <a
            href={item.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-xs"
          >
            {t.viewProduct} <ExternalLink className="ml-1 w-3 h-3" />
          </a>
        )}

        {/* Action Buttons */}
        <div className="pt-2 border-t border-gray-200 flex gap-2">
          {isOwner ? (
            // Owner actions: Edit and Delete
            <>
              <button
                onClick={() => onEdit?.(item)}
                className="flex-1 btn-secondary text-xs py-1.5 flex items-center justify-center gap-1"
              >
                <Pencil className="w-3 h-3" />
                {t.edit}
              </button>
              <button
                onClick={() => onDelete?.(item.id)}
                className="flex-1 btn-danger text-xs py-1.5 flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                {t.delete}
              </button>
            </>
          ) : (
            // Visitor actions
            <div className="w-full">
              {isPooledGift ? (
                // Pooled gift actions: Contribute
                item.isPurchased ? (
                  <div className="text-center py-2 bg-green-50 rounded-md">
                    <p className="text-xs font-semibold text-green-700">
                      🎉 Meta alcanzada!
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => onContribute?.(item.id, { contributorName: '', amount: 0 })}
                    className="w-full btn-primary text-xs py-1.5 flex items-center justify-center gap-1"
                  >
                    <DollarSign className="w-3 h-3" />
                    Contribuir (${remainingAmount.toFixed(0)} restantes)
                  </button>
                )
              ) : (
                // Normal gift actions: Reserve/Purchase
                !item.isPurchased ? (
                  item.isReserved ? (
                    // Item is reserved
                    <div className="space-y-1.5">
                      <div className="text-center py-2 bg-yellow-50 rounded-md">
                        <p className="text-xs font-semibold text-yellow-700">
                          ⏳ Reservado por {item.reservedBy}
                        </p>
                      </div>
                      <button
                        onClick={handleUnreserve}
                        className="w-full btn-secondary text-xs py-1.5 flex items-center justify-center gap-1"
                      >
                        <Undo2 className="w-3 h-3" />
                        Liberar Reserva
                      </button>
                    </div>
                  ) : (
                    // Item is available
                    <div className="space-y-1.5">
                      {(showNameInput || !allowAnonymousPurchase) && (
                        <input
                          type="text"
                          placeholder={allowAnonymousPurchase ? `${t.yourNameInput} (opcional)` : t.yourNameInput}
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 text-xs"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleMarkAsPurchased();
                            }
                          }}
                        />
                      )}
                      <button
                        onClick={() => {
                          if (!showNameInput && !allowAnonymousPurchase) {
                            setShowNameInput(true);
                          } else {
                            handleMarkAsPurchased();
                          }
                        }}
                        className="w-full btn-primary text-xs py-1.5 flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        {(showNameInput || !allowAnonymousPurchase) ? t.confirmPurchase : t.markAsPurchased}
                      </button>
                      <button
                        onClick={() => {
                          if (!showReserveInput && !allowAnonymousPurchase) {
                            setShowReserveInput(true);
                          } else {
                            handleReserve();
                          }
                        }}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-xs py-1.5 rounded-md flex items-center justify-center gap-1 transition-colors"
                      >
                        <Clock className="w-3 h-3" />
                        Reservar para después
                      </button>
                      {(showReserveInput || !allowAnonymousPurchase) && (
                        <input
                          type="text"
                          placeholder="Tu nombre para reservar"
                          value={reserverName}
                          onChange={(e) => setReserverName(e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 text-xs"
                        />
                      )}
                    </div>
                  )
                ) : (
                  <button
                    onClick={handleUnmarkAsPurchased}
                    className="w-full btn-secondary text-xs py-1.5 flex items-center justify-center gap-1"
                  >
                    <Undo2 className="w-3 h-3" />
                    {t.unmarkAsPurchased}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
