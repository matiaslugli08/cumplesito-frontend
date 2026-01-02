import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { loginUser } from '@/services/api';
import { LoginDTO } from '@/types';
import { LogIn, ArrowLeft } from 'lucide-react';

/**
 * Login page component
 */
export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginDTO>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginDTO>>({});
  const [loginError, setLoginError] = useState<string>('');

  /**
   * Validate form data
   */
  const validate = (): boolean => {
    const newErrors: Partial<LoginDTO> = {};

    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.password) {
      newErrors.password = t.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const user = await loginUser(formData);
      login(user);
      navigate('/my-wishlists');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(t.errorLogin);
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
    if (errors[name as keyof LoginDTO]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setLoginError('');
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
            <LogIn className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.loginTitle}</h1>
          <p className="text-gray-600">{t.loginSubtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card space-y-6">
          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">{loginError}</p>
            </div>
          )}

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
            {isLoading ? t.loggingIn : t.loginButton}
          </button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            {t.noAccount}{' '}
            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-semibold">
              {t.createAccount}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
