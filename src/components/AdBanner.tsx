import React, { useEffect } from 'react';

/**
 * Ad Banner Component
 * Displays advertisements in a subtle, non-intrusive way
 */

interface AdBannerProps {
  /**
   * Size of the ad banner
   * - 'small': 320x100 (mobile-friendly)
   * - 'medium': 728x90 (leaderboard)
   * - 'large': 970x90 (super leaderboard)
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Optional custom class for styling
   */
  className?: string;

  /**
   * Slot ID for Google AdSense (example)
   * Replace with your actual ad network slot ID
   */
  slotId?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  size = 'small',
  className = '',
  slotId = 'demo-slot'
}) => {
  // Size configurations
  const sizeConfig = {
    small: { width: 320, height: 100 },
    medium: { width: 728, height: 90 },
    large: { width: 970, height: 90 },
  };

  const { width, height } = sizeConfig[size];

  useEffect(() => {
    // Here you would initialize your ad network (e.g., Google AdSense)
    // Example for Google AdSense:
    // (window.adsbygoogle = window.adsbygoogle || []).push({});

    // For now, this is a placeholder that shows where ads will appear
  }, [slotId]);

  // Demo/placeholder ad - replace with actual ad network code
  return (
    <div className={`ad-banner-container ${className}`}>
      <div className="flex flex-col items-center justify-center my-4">
        {/* Label to indicate it's an ad */}
        <div className="text-xs text-gray-400 mb-1">Advertisement</div>

        {/* Ad placeholder - Replace this with your actual ad code */}
        <div
          className="border border-gray-200 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden shadow-sm"
          style={{
            width: `min(${width}px, 100%)`,
            height: `${height}px`,
            maxWidth: '100%'
          }}
        >
          {/*
            REPLACE THIS SECTION WITH YOUR AD NETWORK CODE

            For Google AdSense:
            <ins className="adsbygoogle"
                 style={{ display: 'inline-block', width: `${width}px`, height: `${height}px` }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot={slotId}></ins>

            For other networks, follow their integration guidelines
          */}

          {/* Placeholder content - remove when adding real ads */}
          <div className="text-center p-4">
            <p className="text-sm text-gray-500 font-medium">Ad Space</p>
            <p className="text-xs text-gray-400 mt-1">{width}x{height}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Responsive Ad Banner
 * Automatically adjusts size based on screen width
 */
export const ResponsiveAdBanner: React.FC<{ className?: string; slotId?: string }> = ({
  className = '',
  slotId
}) => {
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

      {/* Show large on desktop */}
      <div className="hidden lg:block">
        <AdBanner size="medium" slotId={slotId} />
      </div>
    </div>
  );
};

/**
 * Inline Ad Banner
 * Small banner that fits inline with content
 */
export const InlineAdBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`inline-ad-banner ${className}`}>
      <AdBanner size="small" />
    </div>
  );
};
