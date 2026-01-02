import React, { useEffect, useRef } from 'react';
import { AdsConfig, areAdsEnabled } from '@/config/ads';

/**
 * Ad Banner Component
 * Displays Google AdSense advertisements or placeholder in demo mode
 */

interface AdBannerProps {
  /**
   * Size of the ad banner
   */
  size?: 'small' | 'medium' | 'large' | 'square' | 'sidebar';

  /**
   * Optional custom class for styling
   */
  className?: string;

  /**
   * Slot ID for Google AdSense
   * Use one of the predefined slots from AdsConfig.AD_SLOTS
   */
  slotId: string;
}

// Declaración global para TypeScript
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const AdBanner: React.FC<AdBannerProps> = ({
  size = 'small',
  className = '',
  slotId
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isAdsEnabled = areAdsEnabled();
  const { width, height } = AdsConfig.SIZES[size];

  useEffect(() => {
    // Solo cargar ads si están habilitados
    if (isAdsEnabled && adRef.current) {
      try {
        // Inicializar Google AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading AdSense:', error);
      }
    }
  }, [slotId, isAdsEnabled]);

  return (
    <div className={`ad-banner-container ${className}`}>
      <div className="flex flex-col items-center justify-center my-4">
        {/* Label de Advertisement */}
        {AdsConfig.STYLES.showLabel && (
          <div className="text-xs text-gray-400 mb-1">
            {AdsConfig.STYLES.labelText}
          </div>
        )}

        {/* Ad Container */}
        <div
          className={`${
            isAdsEnabled ? '' : 'border rounded-lg shadow-sm'
          } flex items-center justify-center overflow-hidden`}
          style={{
            width: `min(${width}px, 100%)`,
            height: `${height}px`,
            maxWidth: '100%',
            ...(isAdsEnabled ? {} : {
              borderColor: AdsConfig.STYLES.borderColor,
              backgroundColor: AdsConfig.STYLES.backgroundColor,
            })
          }}
        >
          {isAdsEnabled ? (
            // 🎯 GOOGLE ADSENSE AD (cuando está habilitado)
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{
                display: 'inline-block',
                width: `${width}px`,
                height: `${height}px`,
              }}
              data-ad-client={AdsConfig.ADSENSE_PUBLISHER_ID}
              data-ad-slot={slotId}
            />
          ) : (
            // 📦 PLACEHOLDER (modo demo)
            <div className="text-center p-4">
              <p className="text-sm text-gray-500 font-medium">💰 Ad Space</p>
              <p className="text-xs text-gray-400 mt-1">{width}x{height}</p>
              <p className="text-xs text-gray-300 mt-2">
                (Configura AdSense en src/config/ads.ts)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Responsive Ad Banner
 * Automatically adjusts size based on screen width
 */
export const ResponsiveAdBanner: React.FC<{
  className?: string;
  slotId: string;
}> = ({ className = '', slotId }) => {
  return (
    <div className={`responsive-ad-banner ${className}`}>
      {/* Show small on mobile */}
      <div className="block md:hidden">
        <AdBanner size="small" slotId={slotId} />
      </div>

      {/* Show medium on tablet */}
      <div className="hidden md:block lg:hidden">
        <AdBanner size="medium" slotId={slotId} />
      </div>

      {/* Show medium on desktop */}
      <div className="hidden lg:block">
        <AdBanner size="medium" slotId={slotId} />
      </div>
    </div>
  );
};

/**
 * Sidebar Ad Banner
 * Vertical banner for sidebars
 */
export const SidebarAdBanner: React.FC<{
  className?: string;
  slotId: string;
}> = ({ className = '', slotId }) => {
  return (
    <div className={`sidebar-ad-banner ${className}`}>
      <AdBanner size="sidebar" slotId={slotId} />
    </div>
  );
};

/**
 * Square Ad Banner
 * Medium rectangle ad (300x250)
 */
export const SquareAdBanner: React.FC<{
  className?: string;
  slotId: string;
}> = ({ className = '', slotId }) => {
  return (
    <div className={`square-ad-banner ${className}`}>
      <AdBanner size="square" slotId={slotId} />
    </div>
  );
};
