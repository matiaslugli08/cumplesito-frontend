# 🎂 Cumplesito - Frontend

> Aplicación web moderna para crear y gestionar listas de deseos de cumpleaños

## 🚀 Características

- ✨ **Interfaz Moderna**: Diseño responsive con Tailwind CSS y temática festiva
- 🌐 **Multiidioma**: Soporte para Español e Inglés
- 🎨 **Paleta de Cumpleaños**: Colores vibrantes y alegres (rosa, morado, amarillo)
- 📱 **100% Responsive**: Funciona perfectamente en móviles, tablets y desktop
- 🔐 **Autenticación Segura**: Sistema de login y registro con JWT
- 💝 **Gestión de Listas**: Crea y comparte listas de deseos
- 🎁 **Auto-detección**: Extrae información automáticamente de URLs de productos
- 📊 **Ads Integrados**: Google AdSense para monetización
- 🎯 **SEO Optimizado**: Meta tags, sitemap, robots.txt

## 🛠️ Tecnologías

- **React 18** con TypeScript
- **Vite** para build ultra-rápido
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Lucide React** para íconos
- **Context API** para estado global

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Configurar la URL del backend en .env
VITE_API_URL=http://localhost:8000
```

## 🏃 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🌍 Variables de Entorno

```env
VITE_API_URL=http://localhost:8000
```

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── context/        # Context API (Auth, Language)
├── pages/          # Páginas de la aplicación
├── services/       # Servicios API
├── i18n/           # Traducciones
├── types/          # TypeScript types
└── App.tsx         # Componente principal
```

## 🎨 Paleta de Colores

- **Rosa**: `#ec4899` - Principal
- **Morado**: `#a855f7` - Secundario
- **Amarillo**: `#fbbf24` - Acento
- **Naranja**: `#f97316` - Highlight

## 🚀 Deploy

### Netlify / Vercel

1. Conecta tu repositorio
2. Configura las variables de entorno
3. Deploy automático en cada push a `main`

### Build Manual

```bash
npm run build
# Los archivos están en /dist
```

## 📝 Licencia

MIT

## 👨‍💻 Autor

**Matias Lugli** - [GitHub](https://github.com/matiaslugli08)

---

Hecho con ❤️ para hacer los cumpleaños más especiales
