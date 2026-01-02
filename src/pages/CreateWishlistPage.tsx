import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { CreateWishlistDTO } from '@/types';
import { createWishlist } from '@/services/api';
import { ArrowLeft, Gift } from 'lucide-react';

/**
 * Page component for creating a new wishlist
 */
export const CreateWishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateWishlistDTO>({
    title: '',
    ownerName: '',
    eventDate: '',
    description: '',
    allowAnonymousPurchase: false,
  });
  const [errors, setErrors] = useState<Partial<CreateWishlistDTO>>({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Validate form data
   */
  const validate = (): boolean => {
    const newErrors: Partial<CreateWishlistDTO> = {};

    if (!formData.title.trim()) {
      newErrors.title = t.required;
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = t.required;
    }

    if (!formData.eventDate) {
      newErrors.eventDate = t.required;
    }

    if (!formData.description.trim()) {
      newErrors.description = t.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !user) {
      return;
    }

    setIsLoading(true);
    try {
      const newWishlist = await createWishlist(formData, user.id);
      // Navigate to the wishlist page with owner flag
      navigate(`/wishlist/${newWishlist.id}?owner=true`);
    } catch (error) {
      console.error('Error creating wishlist:', error);
      alert(t.errorCreatingWishlist);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input changes
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field
    if (errors[name as keyof CreateWishlistDTO]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto">
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
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Gift className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {t.createWishlistTitle}
              </h1>
              <p className="text-gray-600">
                {t.createWishlistSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.wishlistTitle} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder={t.wishlistTitlePlaceholder}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Owner Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.yourName} *
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className={`input-field ${
                errors.ownerName ? 'border-red-500' : ''
              }`}
              placeholder={t.yourNamePlaceholder}
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
            )}
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.birthdayDate} *
            </label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className={`input-field ${
                errors.eventDate ? 'border-red-500' : ''
              }`}
            />
            {errors.eventDate && (
              <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.description} *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`input-field ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder={t.descriptionPlaceholder}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Allow Anonymous Purchase */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="allowAnonymousPurchase"
                checked={formData.allowAnonymousPurchase}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <div>
                <div className="font-semibold text-gray-800">
                  {t.allowAnonymousPurchase}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {t.allowAnonymousPurchaseHelp}
                </div>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 text-lg"
          >
            {isLoading ? t.creating : t.createWishlistSubmit}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Note:</strong> {t.createWishlistNote}
          </p>
        </div>
      </div>
    </div>
  );
};
