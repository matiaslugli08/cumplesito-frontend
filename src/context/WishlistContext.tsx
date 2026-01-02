import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Wishlist } from '@/types';

/**
 * Context interface for wishlist state management
 */
interface WishlistContextType {
  currentWishlist: Wishlist | null;
  setCurrentWishlist: (wishlist: Wishlist | null) => void;
  isOwner: boolean;
  setIsOwner: (isOwner: boolean) => void;
  refreshWishlist: () => void;
}

/**
 * Create the context with default values
 */
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

/**
 * Props for the WishlistProvider component
 */
interface WishlistProviderProps {
  children: ReactNode;
}

/**
 * Provider component for wishlist state management
 */
export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const [currentWishlist, setCurrentWishlist] = useState<Wishlist | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const refreshWishlist = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const value: WishlistContextType = {
    currentWishlist,
    setCurrentWishlist,
    isOwner,
    setIsOwner,
    refreshWishlist,
  };

  return (
    <WishlistContext.Provider value={value} key={refreshKey}>
      {children}
    </WishlistContext.Provider>
  );
};

/**
 * Custom hook to use the wishlist context
 */
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
