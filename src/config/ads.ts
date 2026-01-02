/**
 * Configuración de Google AdSense
 *
 * INSTRUCCIONES:
 * 1. Crea tu cuenta en https://www.google.com/adsense
 * 2. Una vez aprobado, copia tu Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
 * 3. Reemplaza ADSENSE_PUBLISHER_ID con tu ID real
 * 4. Cambia ADSENSE_ENABLED a true
 * 5. Crea unidades de anuncios en AdSense y pega los Slot IDs
 */

export const AdsConfig = {
  // ✅ AdSense habilitado
  ADSENSE_ENABLED: true,

  // 🔑 TU PUBLISHER ID DE ADSENSE
  // Lo encuentras en: AdSense > Cuenta > Información de la cuenta
  // Formato: ca-pub-1234567890123456
  ADSENSE_PUBLISHER_ID: 'ca-pub-8864261242798498',

  // 📊 SLOT IDS DE TUS UNIDADES DE ANUNCIOS
  // Los obtienes al crear unidades de anuncios en AdSense > Anuncios > Por unidad de anuncio
  AD_SLOTS: {
    HOME_TOP: '1234567890',        // Banner superior en home
    HOME_SIDEBAR: '0987654321',    // Sidebar en home
    WISHLIST_TOP: '1122334455',    // Banner superior en página de lista
    WISHLIST_INLINE: '5544332211', // Banner entre productos
    MY_LISTS_TOP: '6677889900',    // Banner en "Mis listas"
  },

  // 🎨 CONFIGURACIÓN DE ESTILOS
  STYLES: {
    showLabel: true,              // Mostrar "Advertisement" arriba de los ads
    labelText: 'Advertisement',   // Texto del label
    borderColor: '#e5e7eb',      // Color del borde en modo demo
    backgroundColor: '#f9fafb',   // Color de fondo en modo demo
  },

  // 📏 TAMAÑOS DE ADS DISPONIBLES
  SIZES: {
    small: { width: 320, height: 100 },   // Mobile
    medium: { width: 728, height: 90 },   // Tablet/Desktop (Leaderboard)
    large: { width: 970, height: 90 },    // Desktop grande (Super Leaderboard)
    square: { width: 300, height: 250 },  // Medium Rectangle (muy común)
    sidebar: { width: 300, height: 600 }, // Half Page (sidebar)
  }
};

/**
 * Función helper para verificar si los ads están habilitados
 */
export const areAdsEnabled = (): boolean => {
  return (
    AdsConfig.ADSENSE_ENABLED &&
    AdsConfig.ADSENSE_PUBLISHER_ID !== 'ca-pub-XXXXXXXXXXXXXXXX'
  );
};

/**
 * Función para obtener la URL del script de AdSense
 */
export const getAdSenseScriptUrl = (): string => {
  return `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AdsConfig.ADSENSE_PUBLISHER_ID}`;
};
