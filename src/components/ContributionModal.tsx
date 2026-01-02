import React, { useState } from 'react';
import { ContributeDTO } from '@/types';
import { X, DollarSign } from 'lucide-react';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContributeDTO) => void;
  itemTitle: string;
  targetAmount: number;
  currentAmount: number;
}

export const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  itemTitle,
  targetAmount,
  currentAmount,
}) => {
  const [formData, setFormData] = useState<ContributeDTO>({
    contributorName: '',
    amount: 0,
    message: '',
  });
  const [errors, setErrors] = useState<Partial<ContributeDTO>>({});

  const remainingAmount = targetAmount - currentAmount;
  const percentComplete = Math.min((currentAmount / targetAmount) * 100, 100);

  const validate = (): boolean => {
    const newErrors: Partial<ContributeDTO> = {};

    if (!formData.contributorName.trim()) {
      newErrors.contributorName = 'El nombre es requerido';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0' as any;
    }

    if (formData.amount > remainingAmount) {
      newErrors.amount = `El monto no puede ser mayor al restante ($${remainingAmount.toFixed(2)})` as any;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ contributorName: '', amount: 0, message: '' });
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value,
    }));
    if (errors[name as keyof ContributeDTO]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const quickAmounts = [10, 25, 50, 100, remainingAmount].filter(
    (amount) => amount > 0 && amount <= remainingAmount
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            💰 Contribuir a la Colecta
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Item Info */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">{itemTitle}</h3>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Recaudado: ${currentAmount.toFixed(2)}</span>
                <span>Meta: ${targetAmount.toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-purple-600">
                  {percentComplete.toFixed(0)}% completado
                </span>
                {remainingAmount > 0 && (
                  <p className="text-sm text-gray-600">
                    Faltan ${remainingAmount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tu Nombre *
              </label>
              <input
                type="text"
                name="contributorName"
                value={formData.contributorName}
                onChange={handleChange}
                className={`input-field ${
                  errors.contributorName ? 'border-red-500' : ''
                }`}
                placeholder="ej: Juan Pérez"
              />
              {errors.contributorName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contributorName}
                </p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monto a Contribuir ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount || ''}
                  onChange={handleChange}
                  min="0.01"
                  step="0.01"
                  max={remainingAmount}
                  className={`input-field pl-10 ${
                    errors.amount ? 'border-red-500' : ''
                  }`}
                  placeholder="0.00"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}

              {/* Quick amount buttons */}
              {quickAmounts.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, amount }))
                      }
                      className="px-3 py-1 text-sm bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-full transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mensaje (opcional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="input-field"
                placeholder="Deja un mensaje para el cumpleañero..."
                maxLength={500}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" className="flex-1 btn-primary">
                💝 Contribuir ${formData.amount.toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
