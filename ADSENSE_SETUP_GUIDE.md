# 🎯 Guía Completa para Configurar Google AdSense en Cumplesito

## 📋 Requisitos Previos

### ✅ Lo que necesitas:
1. **Dominio propio** (ej: cumplesito.com)
   - Google AdSense NO acepta localhost
   - Necesitas un dominio real y público
   - Puedes comprarlo en Namecheap, GoDaddy, etc. ($10-15/año)

2. **Hosting/Deployment**
   - Tu sitio debe estar online 24/7
   - Opciones recomendadas:
     - **Frontend**: Vercel, Netlify (GRATIS)
     - **Backend**: Render, Railway (GRATIS hasta cierto límite)

3. **Cuenta de Google**
   - Una cuenta de Gmail válida
   - Debes ser mayor de 18 años

4. **Contenido de calidad**
   - Mínimo 20-30 páginas de contenido
   - Tráfico real (aunque sea poco al inicio)
   - Contenido original (no copiado)

5. **Cumplir políticas de AdSense**
   - No contenido para adultos
   - No contenido ilegal
   - No contenido engañoso

## 🚀 PASO 1: Crear Cuenta de Google AdSense

### 1.1 Registrarse
1. Ve a: https://www.google.com/adsense
2. Haz clic en **"Comenzar"**
3. Inicia sesión con tu cuenta de Google
4. Completa el formulario:
   - **URL del sitio web**: Tu dominio (ej: cumplesito.com)
   - **País**: Uruguay
   - **Acepta términos y condiciones**

### 1.2 Información de pago
1. Ingresa tu información personal:
   - Nombre completo
   - Dirección
   - Número de teléfono
2. Elige método de pago:
   - Transferencia bancaria (recomendado)
   - Cheque (más lento)

### 1.3 Verificación
- Google te enviará un código por correo postal (tarda 2-4 semanas)
- También recibirás un PIN que debes ingresar en AdSense

## 🔧 PASO 2: Obtener Código de AdSense

### 2.1 Código del sitio (Auto Ads)
Después de crear tu cuenta:

1. Ve a **AdSense > Sitios**
2. Copia el código que se ve así:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

3. Reemplaza `ca-pub-XXXXXXXXXXXXXXXX` con tu ID real

### 2.2 Crear unidades de anuncios
1. Ve a **Anuncios > Por unidad de anuncio**
2. Haz clic en **"Nueva unidad de anuncio"**
3. Elige el tipo:
   - **Anuncio display**: Para banners rectangulares
   - **Anuncio In-feed**: Para listas de contenido
   - **Anuncio In-article**: Para dentro de artículos
   - **Anuncio multiplex**: Anuncios en cuadrícula

4. Configura el tamaño:
   - **Adaptable**: Se ajusta automáticamente (recomendado)
   - **Fijo**: 728x90, 300x250, 160x600, etc.

5. Copia el código que te da

## 🎨 PASO 3: Ubicaciones Recomendadas para Ads

### 3.1 Página Principal (Home)
- ✅ Banner superior (después del header)
- ✅ Banner lateral (sidebar)
- ✅ Banner inferior (antes del footer)

### 3.2 Página de Lista de Deseos
- ✅ Banner superior
- ✅ Entre productos (In-feed)
- ✅ Sidebar derecho

### 3.3 Página de Mis Listas
- ✅ Banner superior
- ✅ Entre las listas

### 🚨 IMPORTANTE: No pongas más de 3 anuncios por página

## 💰 PASO 4: Estrategia de Monetización

### Ubicaciones de Alto Rendimiento (Mejores CPM)
1. **Above the fold** (visible sin scroll):
   - Banner 728x90 o 970x250
   - CPM estimado: $2-5

2. **Sidebar derecho**:
   - Banner 300x250 o 300x600
   - CPM estimado: $1-3

3. **Entre contenido**:
   - In-feed o In-article
   - CPM estimado: $1.5-4

### Proyección de Ingresos

#### Escenario Conservador (primeros 3 meses)
- Visitas/mes: 1,000
- Páginas vistas: 3,000
- CTR promedio: 1%
- CPC promedio: $0.30
- **Ingreso mensual estimado: $9-15**

#### Escenario Moderado (6-12 meses)
- Visitas/mes: 10,000
- Páginas vistas: 30,000
- CTR promedio: 1.5%
- CPC promedio: $0.40
- **Ingreso mensual estimado: $180-250**

#### Escenario Optimista (1-2 años)
- Visitas/mes: 50,000
- Páginas vistas: 150,000
- CTR promedio: 2%
- CPC promedio: $0.50
- **Ingreso mensual estimado: $1,500-2,000**

## 🎯 PASO 5: Optimización para Máximos Ingresos

### 5.1 SEO (Tráfico Orgánico)
- ✅ Títulos optimizados
- ✅ Meta descripciones
- ✅ URLs amigables
- ✅ Sitemap.xml
- ✅ Contenido de calidad

### 5.2 Diseño UX
- ✅ Ads visibles pero no intrusivos
- ✅ Colores que contrasten con el contenido
- ✅ Espaciado adecuado
- ✅ Responsive (móvil y desktop)

### 5.3 Métricas a Monitorear
En Google AdSense Dashboard:
- **RPM** (Revenue Per Mille): Ingreso por 1000 impresiones
- **CTR** (Click Through Rate): % de clics
- **CPC** (Cost Per Click): Pago por clic
- **Impresiones**: Cuántas veces se mostraron los ads

### 5.4 A/B Testing
Prueba diferentes:
- Ubicaciones de ads
- Tamaños de ads
- Colores y estilos
- Número de ads por página

## 📊 PASO 6: Cumplir con las Políticas

### ❌ Nunca hagas esto:
- ❌ Hacer clic en tus propios ads
- ❌ Pedir a otros que hagan clic
- ❌ Usar bots o tráfico falso
- ❌ Poner ads cerca de contenido prohibido
- ❌ Modificar el código de AdSense

### ✅ Buenas prácticas:
- ✅ Tráfico orgánico real
- ✅ Contenido original y de calidad
- ✅ Diseño responsive
- ✅ Experiencia de usuario positiva
- ✅ Cumplir con GDPR/privacidad

## 🚀 PASO 7: Desplegar tu Sitio

### 7.1 Frontend (Recomendación: Vercel)
```bash
# 1. Instalar Vercel CLI
npm install -g vercel

# 2. Desde la carpeta frontend
cd frontend
vercel login
vercel

# 3. Sigue las instrucciones
# Tu sitio estará en: https://tu-proyecto.vercel.app
```

### 7.2 Backend (Recomendación: Render)
1. Ve a https://render.com
2. Conecta tu repositorio de GitHub
3. Crea un nuevo **Web Service**
4. Configura:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Variables de entorno (copia tu .env)

### 7.3 Dominio personalizado
1. Compra un dominio en Namecheap
2. En Vercel: Settings > Domains > Add
3. Configura DNS en Namecheap

## 🎉 PASO 8: Solicitar Revisión de AdSense

Una vez que tu sitio esté online:

1. Ve a Google AdSense
2. Click en **"Sitios"**
3. Click en **"Solicitar revisión"**
4. Google revisará tu sitio (tarda 1-2 semanas)
5. Te llegará un email con la aprobación o rechazo

### Si te rechazan:
- Lee bien el motivo
- Corrige los problemas
- Agrega más contenido de calidad
- Espera 2 semanas y vuelve a solicitar

## 💡 Alternativas a Google AdSense

Si no te aprueban en AdSense:

### 1. **Media.net** (Yahoo/Bing)
- Similar a AdSense
- Menos restrictivo
- https://www.media.net

### 2. **PropellerAds**
- Acepta sitios nuevos
- Menor pago que AdSense
- https://propellerads.com

### 3. **Ezoic**
- Requiere 10,000 visitas/mes
- Mejor CPM que AdSense
- https://ezoic.com

### 4. **Affiliate Marketing**
- Amazon Associates
- MercadoLibre Affiliate
- Comisiones por ventas

## 📞 Soporte

Si tienes problemas:
- **Google AdSense Help**: https://support.google.com/adsense
- **Comunidad de AdSense**: https://support.google.com/adsense/community

---

## ✅ Checklist Final

Antes de solicitar aprobación de AdSense:

- [ ] Sitio desplegado en dominio propio
- [ ] Mínimo 20 páginas de contenido
- [ ] Política de privacidad visible
- [ ] Términos y condiciones
- [ ] Contacto visible
- [ ] Diseño profesional y responsive
- [ ] Sin errores o links rotos
- [ ] Contenido original (no copiado)
- [ ] Tráfico real iniciando
- [ ] Cumple con todas las políticas de Google

---

**Tiempo estimado total:**
- Setup técnico: 1-2 días
- Aprobación de AdSense: 1-2 semanas
- Primer pago: 2-3 meses (mínimo $100)

¡Mucha suerte con tu monetización! 🎉💰
