/**
 * Represents a single gift item in a wishlist
 */
export interface WishlistItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string; // Optional - may be null if not detected
  productUrl: string;
  isPurchased: boolean;
  purchasedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a wishlist created by a user
 */
export interface Wishlist {
  id: string;
  title: string;
  ownerName: string;
  ownerId: string;
  eventDate: string;
  description: string;
  birthdayPersonProfile?: string; // AI-generated profile
  items: WishlistItem[];
  allowAnonymousPurchase: boolean;
  createdAt: Date;
  updatedAt: Date;
  shareableLink: string;
}

/**
 * Represents a user in the system
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

/**
 * Data required to create a new wishlist
 */
export interface CreateWishlistDTO {
  title: string;
  ownerName: string;
  eventDate: string;
  description: string;
  allowAnonymousPurchase: boolean;
}

/**
 * Data required to create a new wishlist item
 */
export interface CreateWishlistItemDTO {
  title: string;
  description: string;
  imageUrl?: string; // Optional - will be auto-detected from productUrl
  productUrl: string;
}

/**
 * Data required to update an existing wishlist item
 */
export interface UpdateWishlistItemDTO {
  title?: string;
  description?: string;
  imageUrl?: string;
  productUrl?: string;
}

/**
 * Data required to mark an item as purchased
 */
export interface MarkAsPurchasedDTO {
  purchasedBy: string;
}

/**
 * Data required for user login
 */
export interface LoginDTO {
  email: string;
  password: string;
}

/**
 * Data required for user registration
 */
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}
