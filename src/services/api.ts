import {
  Wishlist,
  CreateWishlistDTO,
  CreateWishlistItemDTO,
  UpdateWishlistItemDTO,
  MarkAsPurchasedDTO,
  WishlistItem,
  User,
  LoginDTO,
  RegisterDTO,
} from '@/types';

/**
 * Real API service for wishlist operations
 * Connects to FastAPI backend
 */

// API Configuration
const API_BASE_URL = 'http://localhost:8000/api';
const FRONTEND_BASE_URL = 'http://localhost:3000';

// Token storage key
const TOKEN_KEY = 'auth_token';

/**
 * Get authentication headers with JWT token
 */
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem(TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

/**
 * Handle API errors
 */
const handleApiError = async (response: Response): Promise<never> => {
  let errorMessage = 'An error occurred';

  try {
    const errorData = await response.json();
    errorMessage = errorData.detail || errorMessage;
  } catch {
    errorMessage = response.statusText || errorMessage;
  }

  throw new Error(errorMessage);
};

/**
 * Convert backend response (snake_case) to frontend format (camelCase)
 */
const convertWishlistFromBackend = (data: any): Wishlist => {
  return {
    id: data.id,
    title: data.title,
    ownerName: data.owner_name,
    ownerId: data.owner_id,
    eventDate: data.event_date,
    description: data.description,
    allowAnonymousPurchase: data.allow_anonymous_purchase,
    items: (data.items || []).map(convertItemFromBackend),
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
    shareableLink: data.shareable_link,
  };
};

/**
 * Convert backend item response to frontend format
 */
const convertItemFromBackend = (data: any): WishlistItem => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    imageUrl: data.image_url,
    productUrl: data.product_url,
    isPurchased: data.is_purchased,
    purchasedBy: data.purchased_by,
    createdAt: new Date(data.created_at),
    updatedAt: new Date(data.updated_at),
  };
};

/**
 * Convert frontend DTO to backend format (camelCase to snake_case)
 */
const convertWishlistToBackend = (data: CreateWishlistDTO) => {
  return {
    title: data.title,
    owner_name: data.ownerName,
    event_date: data.eventDate,
    description: data.description,
    allow_anonymous_purchase: data.allowAnonymousPurchase,
  };
};

/**
 * Convert frontend item DTO to backend format
 */
const convertItemToBackend = (data: CreateWishlistItemDTO | UpdateWishlistItemDTO) => {
  const result: any = {};
  if ('title' in data && data.title !== undefined) result.title = data.title;
  if ('description' in data && data.description !== undefined) result.description = data.description;
  if ('imageUrl' in data && data.imageUrl !== undefined) result.image_url = data.imageUrl;
  if ('productUrl' in data && data.productUrl !== undefined) result.product_url = data.productUrl;
  return result;
};

// ============================================================================
// Authentication API
// ============================================================================

/**
 * Register a new user
 */
export const registerUser = async (data: RegisterDTO): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  const userData = await response.json();
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    createdAt: new Date(userData.created_at),
  };
};

/**
 * Login a user and store JWT token
 */
export const loginUser = async (data: LoginDTO): Promise<User> => {
  // First, get the token
  const loginResponse = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!loginResponse.ok) {
    await handleApiError(loginResponse);
  }

  const tokenData = await loginResponse.json();

  // Store the JWT token
  localStorage.setItem(TOKEN_KEY, tokenData.access_token);

  // Now get user information
  const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });

  if (!userResponse.ok) {
    localStorage.removeItem(TOKEN_KEY);
    await handleApiError(userResponse);
  }

  const userData = await userResponse.json();
  return {
    id: userData.id,
    name: userData.name,
    email: userData.email,
    createdAt: new Date(userData.created_at),
  };
};

/**
 * Logout user (clear token)
 */
export const logoutUser = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};

// ============================================================================
// Wishlist API
// ============================================================================

/**
 * Create a new wishlist
 */
export const createWishlist = async (
  data: CreateWishlistDTO,
  ownerId: string // Not used, backend gets from JWT
): Promise<Wishlist> => {
  const response = await fetch(`${API_BASE_URL}/wishlists`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(convertWishlistToBackend(data)),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  const wishlistData = await response.json();
  return convertWishlistFromBackend(wishlistData);
};

/**
 * Get a wishlist by ID (public access)
 */
export const getWishlist = async (id: string): Promise<Wishlist | null> => {
  const response = await fetch(`${API_BASE_URL}/wishlists/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    await handleApiError(response);
  }

  const wishlistData = await response.json();
  return convertWishlistFromBackend(wishlistData);
};

/**
 * Get all wishlists for the authenticated user
 */
export const getUserWishlistsFull = async (userId: string): Promise<Wishlist[]> => {
  const response = await fetch(`${API_BASE_URL}/wishlists`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  const wishlistsData = await response.json();
  return wishlistsData.map(convertWishlistFromBackend);
};

/**
 * Delete a wishlist
 */
export const deleteWishlist = async (wishlistId: string, userId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/wishlists/${wishlistId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    await handleApiError(response);
  }
};

// ============================================================================
// Wishlist Items API
// ============================================================================

/**
 * Add an item to a wishlist
 */
export const addWishlistItem = async (
  wishlistId: string,
  data: CreateWishlistItemDTO
): Promise<WishlistItem> => {
  const response = await fetch(`${API_BASE_URL}/wishlists/${wishlistId}/items`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(convertItemToBackend(data)),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  const itemData = await response.json();
  return convertItemFromBackend(itemData);
};

/**
 * Update a wishlist item
 */
export const updateWishlistItem = async (
  wishlistId: string,
  itemId: string,
  data: UpdateWishlistItemDTO
): Promise<WishlistItem> => {
  const response = await fetch(`${API_BASE_URL}/wishlists/${wishlistId}/items/${itemId}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(convertItemToBackend(data)),
  });

  if (!response.ok) {
    await handleApiError(response);
  }

  const itemData = await response.json();
  return convertItemFromBackend(itemData);
};

/**
 * Delete a wishlist item
 */
export const deleteWishlistItem = async (
  wishlistId: string,
  itemId: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/wishlists/${wishlistId}/items/${itemId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    await handleApiError(response);
  }
};

/**
 * Mark an item as purchased (public access)
 */
export const markItemAsPurchased = async (
  wishlistId: string,
  itemId: string,
  data: MarkAsPurchasedDTO
): Promise<WishlistItem> => {
  const response = await fetch(
    `${API_BASE_URL}/wishlists/${wishlistId}/items/${itemId}/purchase`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ purchased_by: data.purchasedBy }),
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  const itemData = await response.json();
  return convertItemFromBackend(itemData);
};

/**
 * Unmark an item as purchased (public access)
 */
export const unmarkItemAsPurchased = async (
  wishlistId: string,
  itemId: string
): Promise<WishlistItem> => {
  const response = await fetch(
    `${API_BASE_URL}/wishlists/${wishlistId}/items/${itemId}/purchase`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  );

  if (!response.ok) {
    await handleApiError(response);
  }

  const itemData = await response.json();
  return convertItemFromBackend(itemData);
};

// ============================================================================
// Generic API Object (for flexibility)
// ============================================================================

/**
 * Generic API object with common HTTP methods
 */
export const api = {
  /**
   * Generic POST request
   */
  post: async (endpoint: string, data?: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response;
  },

  /**
   * Generic GET request
   */
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response;
  },
};
