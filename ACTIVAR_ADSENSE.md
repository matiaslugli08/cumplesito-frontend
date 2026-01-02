# ✅ Cómo Activar Google AdSense en 5 Pasos

Una vez que tu cuenta de Google AdSense esté **APROBADA**, sigue estos pasos:

## 📝 PASO 1: Obtén tu Publisher ID

1. Ve a tu cuenta de AdSense: https://www.google.com/adsense
2. Ve a **Cuenta > Información de la cuenta**
3. Copia tu **Publisher ID** (formato: `ca-pub-1234567890123456`)

## 🎯 PASO 2: Crea Unidades de Anuncios

1. En AdSense, ve a **Anuncios > Por unidad de anuncio**
2. Crea las siguientes unidades:

   **a) Banner Home Top** (728x90 o Adaptable)
   - Nombre: "Home - Banner Superior"
   - Tipo: Anuncio display adaptable
   - Copia el **Slot ID** (números como `1234567890`)

   **b) Banner Wishlist Top** (728x90 o Adaptable)
   - Nombre: "Lista - Banner Superior"
   - Tipo: Anuncio display adaptable
   - Copia el **Slot ID**

   **c) Banner Wishlist Inline** (300x250)
   - Nombre: "Lista - Entre Productos"
   - Tipo: Anuncio display 300x250
   - Copia el **Slot ID**

   **d) Sidebar** (300x600)
   - Nombre: "Sidebar"
   - Tipo: Anuncio display 300x600
   - Copia el **Slot ID**

   **e) My Lists Top** (728x90)
   - Nombre: "Mis Listas - Banner Superior"
   - Tipo: Anuncio display adaptable
   - Copia el **Slot ID**

## ⚙️ PASO 3: Configurar el Código

### 3.1 Actualizar `frontend/src/config/ads.ts`

Abre el archivo y modifica:

```typescript
export const AdsConfig = {
  // ✅ CAMBIAR A TRUE
  ADSENSE_ENABLED: true,  // ⬅️ CAMBIAR ESTO

  // ✅ PEGAR TU PUBLISHER ID
  ADSENSE_PUBLISHER_ID: 'ca-pub-1234567890123456',  // ⬅️ PEGAR AQUÍ

  // ✅ PEGAR TUS SLOT IDS
  AD_SLOTS: {
    HOME_TOP: '1234567890',        // ⬅️ Slot ID del banner home top
    HOME_SIDEBAR: '0987654321',    // ⬅️ Slot ID del sidebar
    WISHLIST_TOP: '1122334455',    // ⬅️ Slot ID del banner wishlist top
    WISHLIST_INLINE: '5544332211', // ⬅️ Slot ID del banner inline
    MY_LISTS_TOP: '6677889900',    // ⬅️ Slot ID del banner my lists
  },

  // ... resto de la configuración
};
```

### 3.2 Actualizar `frontend/index.html`

Encuentra estas líneas (alrededor de la línea 50):

```html
<!-- Google AdSense -->
<!-- ⚠️ DESCOMENTAR CUANDO TENGAS TU CUENTA DE ADSENSE APROBADA -->
<!-- Reemplaza ca-pub-XXXXXXXXXXXXXXXX con tu Publisher ID real -->
<!--
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
-->
```

**Descomenta y reemplaza:**

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456"
     crossorigin="anonymous"></script>
```

## 🚀 PASO 4: Probar Localmente

```bash
cd frontend
npm run dev
```

Abre http://localhost:5173

- Deberías ver anuncios reales (o espacios en blanco mientras se cargan)
- Abre la consola del navegador para verificar que no haya errores
- **NO HAGAS CLIC** en tus propios anuncios (Google te puede banear)

## 📤 PASO 5: Desplegar a Producción

```bash
# Si usas Vercel
cd frontend
vercel --prod

# O si usas otro servicio, sigue sus instrucciones
```

## 🎯 Ubicaciones de los Ads

Los ads ya están configurados en estos lugares:

### 📍 HomePage (`frontend/src/pages/HomePage.tsx`)
```tsx
import { ResponsiveAdBanner } from '@/components/AdBanner';
import { AdsConfig } from '@/config/ads';

// En el componente, agrega:
<ResponsiveAdBanner
  slotId={AdsConfig.AD_SLOTS.HOME_TOP}
  className="my-8"
/>
```

### 📍 WishlistPage (Entre productos)
```tsx
import { SquareAdBanner } from '@/components/AdBanner';
import { AdsConfig } from '@/config/ads';

// Después de cada 3-4 productos:
<SquareAdBanner
  slotId={AdsConfig.AD_SLOTS.WISHLIST_INLINE}
  className="my-6"
/>
```

### 📍 MyListsPage
```tsx
import { ResponsiveAdBanner } from '@/components/AdBanner';
import { AdsConfig } from '@/config/ads';

<ResponsiveAdBanner
  slotId={AdsConfig.AD_SLOTS.MY_LISTS_TOP}
  className="mb-6"
/>
```

## ✅ Verificación

Después de desplegar:

1. **Verifica en AdSense**:
   - Ve a AdSense > Sitios
   - Tu sitio debe aparecer como "Listo"
   - Espera 24-48 horas para ver las primeras impresiones

2. **Verifica en tu sitio**:
   - Abre en modo incógnito
   - Los ads deben aparecer (pueden tardar unos minutos)
   - No hagas clic en ellos

3. **Monitorea estadísticas**:
   - Ve a AdSense > Informes
   - Revisa: Impresiones, CTR, CPC, Ingresos

## 🚨 Problemas Comunes

### Los ads no aparecen
- ✅ Verifica que `ADSENSE_ENABLED: true`
- ✅ Verifica que el Publisher ID sea correcto
- ✅ Espera 30 minutos (AdSense tarda en activarse)
- ✅ Abre en modo incógnito (sin ad-blockers)

### Error en consola: "Ad request failed"
- ✅ Verifica los Slot IDs
- ✅ Asegúrate de que las unidades estén activas en AdSense

### "This site is not authorized"
- ✅ Agrega tu dominio en AdSense > Sitios
- ✅ Espera a que Google verifique tu sitio

### Cuenta suspendida
- ❌ **NUNCA** hagas clic en tus propios ads
- ❌ **NUNCA** pidas a amigos/familia que hagan clic
- ❌ **NUNCA** uses bots o tráfico falso

## 💰 Optimización (Después de 1 mes)

Una vez que tengas datos:

1. **Analiza el rendimiento**:
   - ¿Qué ubicaciones tienen mejor CTR?
   - ¿Qué tamaños de ads funcionan mejor?

2. **Experimenta**:
   - Cambia ubicaciones
   - Prueba diferentes tamaños
   - Ajusta colores (si Google lo permite)

3. **Enfócate en tráfico**:
   - Más tráfico = Más ingresos
   - Trabaja en SEO
   - Comparte en redes sociales
   - Crea contenido de calidad

## 📞 Soporte

- **Google AdSense Help**: https://support.google.com/adsense
- **Comunidad AdSense**: https://support.google.com/adsense/community

---

## 🎉 ¡Listo!

Una vez configurado, solo debes:
1. ✅ Crear contenido de calidad
2. ✅ Atraer tráfico real
3. ✅ Esperar que los ingresos crezcan

**Primer pago:** Cuando llegues a $100 (puede tardar meses)

¡Mucho éxito con tu monetización! 💰🚀
