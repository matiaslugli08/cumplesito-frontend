import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { WishlistItem, CreateWishlistItemDTO } from '@/types';
import { X, Sparkles } from 'lucide-react';
import { api } from '@/services/api';

/**
 * Props for the ItemFormModal component
 */
interface ItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateWishlistItemDTO) => void;
  editItem?: WishlistItem | null;
}

/**
 * Modal component for creating or editing wishlist items
 */
export const ItemFormModal: React.FC<ItemFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editItem,
}) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<CreateWishlistItemDTO>({
    title: '',
    description: '',
    imageUrl: '',
    productUrl: '',
  });

  const [errors, setErrors] = useState<Partial<CreateWishlistItemDTO>>({});
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [metadataError, setMetadataError] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (editItem) {
      setFormData({
        title: editItem.title,
        description: editItem.description,
        imageUrl: editItem.imageUrl,
        productUrl: editItem.productUrl,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        productUrl: '',
      });
    }
    setErrors({});
  }, [editItem, isOpen]);

  /**
   * Extract metadata from product URL
   */
  const extractMetadata = async () => {
    if (!formData.productUrl || !isValidUrl(formData.productUrl)) {
      setMetadataError('Por favor ingresa una URL válida primero');
      return;
    }

    setIsLoadingMetadata(true);
    setMetadataError(null);

    try {
      const response = await api.post('/metadata/extract', {
        url: formData.productUrl
      });

      const metadata = await response.json();

      // Auto-fill fields with extracted metadata
      setFormData(prev => ({
        ...prev,
        title: metadata.title || prev.title,
        description: metadata.description || prev.description,
        imageUrl: metadata.image || prev.imageUrl,
      }));

      // Clear any previous errors
      setErrors({});
    } catch (error: any) {
      console.error('Error extracting metadata:', error);

      // Check if it's a MercadoLibre URL
      const isMercadoLibre = formData.productUrl.toLowerCase().includes('mercadolibre');

      if (isMercadoLibre) {
        setMetadataError(
          '⚠️ MercadoLibre bloquea la extracción automática. Por favor, copia manualmente el título y la URL de la imagen del producto.'
        );
      } else {
        setMetadataError(
          error.message ||
          'No se pudo extraer información de la URL. Intenta ingresar los datos manualmente.'
        );
      }
    } finally {
      setIsLoadingMetadata(false);
    }
  };

  /**
   * Validate form data
   */
  const validate = (): boolean => {
    const newErrors: Partial<CreateWishlistItemDTO> = {};

    if (!formData.title.trim()) {
      newErrors.title = t.required;
    }

    if (!formData.description.trim()) {
      newErrors.description = t.required;
    }

    // Image URL is optional
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = t.invalidUrl;
    }

    // Product URL is now optional - users can add items with just a description
    if (formData.productUrl && formData.productUrl.trim() && !isValidUrl(formData.productUrl)) {
      newErrors.productUrl = t.invalidUrl;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Check if a string is a valid URL
   */
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  /**
   * Handle input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof CreateWishlistItemDTO]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editItem ? t.editItem : t.addNewItem}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.itemTitle} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder={t.itemTitlePlaceholder}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Product URL - Optional */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.productUrl}
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                name="productUrl"
                value={formData.productUrl}
                onChange={handleChange}
                className={`input-field flex-1 ${
                  errors.productUrl ? 'border-red-500' : ''
                }`}
                placeholder={t.productUrlPlaceholder}
              />
              {formData.productUrl && (
                <button
                  type="button"
                  onClick={extractMetadata}
                  disabled={isLoadingMetadata || !formData.productUrl}
                  className="btn-primary px-6 flex items-center gap-2 whitespace-nowrap disabled:opacity-50"
                  title="Extraer información automáticamente"
                >
                  <Sparkles className="w-4 h-4" />
                  {isLoadingMetadata ? 'Cargando...' : 'Auto-llenar'}
                </button>
              )}
            </div>
            {errors.productUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.productUrl}</p>
            )}
            {metadataError && (
              <div className="text-yellow-700 text-sm mt-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="font-semibold mb-1">⚠️ {metadataError}</p>
                {formData.productUrl.toLowerCase().includes('mercadolibre') && (
                  <p className="text-xs mt-2 text-gray-600">
                    <strong>Cómo obtener la imagen:</strong><br/>
                    1. Abre el producto en MercadoLibre<br/>
                    2. Haz click derecho en la imagen principal<br/>
                    3. Selecciona "Copiar dirección de imagen"<br/>
                    4. Pégala en el campo "URL de Imagen" abajo
                  </p>
                )}
              </div>
            )}
            {!metadataError && formData.productUrl && (
              <p className="text-xs text-gray-500 mt-1">
                💡 Haz click en "Auto-llenar" para extraer la información automáticamente
              </p>
            )}
            {!formData.productUrl && (
              <p className="text-xs text-gray-500 mt-1">
                💡 Opcional: Agrega un link al producto o simplemente describe lo que quieres en el título y descripción
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.itemDescription} *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`input-field ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder={t.itemDescriptionPlaceholder}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image URL - Now optional */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.imageUrl} <span className="text-gray-500 text-xs font-normal">(opcional - se detecta automáticamente)</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className={`input-field ${
                errors.imageUrl ? 'border-red-500' : ''
              }`}
              placeholder="https://ejemplo.com/imagen.jpg (se detecta automáticamente)"
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm mt-1">{errors.imageUrl}</p>
            )}
            {formData.imageUrl && !errors.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="mt-2 rounded-lg w-full h-48 object-cover border-2 border-pink-200"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://via.placeholder.com/400x300?text=Imagen+no+disponible';
                }}
              />
            )}
            {!formData.imageUrl && (
              <p className="text-xs text-gray-500 mt-1">
                💡 Si no agregas una imagen, se mostrará un ícono de regalo predeterminado
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              {t.cancel}
            </button>
            <button type="submit" className="flex-1 btn-primary">
              {editItem ? t.updateItemButton : t.addItemButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
