import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { registerUser } from '@/services/api';
import { RegisterDTO } from '@/types';
import { UserPlus, ArrowLeft } from 'lucide-react';

/**
 * Register page component
 */
export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterDTO>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<RegisterDTO>>({});
  const [registerError, setRegisterError] = useState<string>('');

  /**
   * Validate form data
   */
  const validate = (): boolean => {
    const newErrors: Partial<RegisterDTO> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.password) {
      newErrors.password = t.required;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const user = await registerUser(formData);
      login(user);
      navigate('/my-wishlists');
    } catch (error: any) {
      console.error('Register error:', error);
      setRegisterError(error.message || t.errorRegister);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof RegisterDTO]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setRegisterError('');
  };

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          {t.backToHome}
        </button>

        {/* Header */}
        <div className="card mb-8 text-center">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.registerTitle}</h1>
          <p className="text-gray-600">{t.registerSubtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-6">
          {registerError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{registerError}</p>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.name} *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder={t.namePlaceholder}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.email} *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              placeholder={t.emailPlaceholder}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.password} *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'border-red-500' : ''}`}
              placeholder={t.passwordPlaceholder}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 text-lg"
          >
            {isLoading ? t.registering : t.registerButton}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            {t.haveAccount}{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
              {t.loginLink}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
