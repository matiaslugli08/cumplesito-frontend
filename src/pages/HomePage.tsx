import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { SEOHead, StructuredData } from '@/components/SEOHead';
import { ResponsiveAdBanner } from '@/components/AdBanner';
import { Gift, Heart, Users, Sparkles, Share2, CheckCircle, Calendar, Star } from 'lucide-react';

/**
 * Home page component - Landing page for the application
 * Optimized for SEO and user engagement
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const handleCreateClick = () => {
    if (isAuthenticated) {
      navigate('/create');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead
        title="Cumplesito - Crea tu Lista de Regalos de Cumpleaños Gratis Online"
        description="Crea y comparte tu lista de regalos de cumpleaños gratis. Organiza tus deseos, evita regalos repetidos y comparte con amigos y familia. ¡Simple, rápido y 100% gratuito!"
        keywords="lista de regalos cumpleaños, wishlist cumpleaños gratis, lista deseos online, regalos cumpleaños, gift registry, birthday wishlist, organizar regalos, cumplesito"
        type="website"
      />

      {/* Structured Data for Search Engines */}
      <StructuredData
        type="WebSite"
        data={{
          name: 'Cumplesito',
          url: 'https://cumplesito.com',
          description: 'La mejor plataforma gratuita para crear y compartir listas de regalos de cumpleaños',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://cumplesito.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string',
          },
        }}
      />

      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-50 py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8">
              {/* Logo/Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-fuchsia-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-pink-500 via-purple-500 to-fuchsia-500 p-8 rounded-full shadow-2xl">
                    <img
                      src="/cumplesito-logo.svg"
                      alt="Cumplesito - Logo de lista de regalos de cumpleaños"
                      className="w-20 h-20"
                    />
                  </div>
                </div>
              </div>

              {/* Main Title - SEO Optimized */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  🎉 <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">Cumplesito</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
                  Tu Lista de Regalos de Cumpleaños Gratis
                </h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Crea y comparte tu lista de regalos de cumpleaños online.
                  Organiza tus deseos, evita regalos repetidos y comparte fácilmente
                  con amigos y familia. <strong>100% Gratis, Simple y Rápido.</strong>
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <button
                  onClick={handleCreateClick}
                  className="btn-primary text-lg px-10 py-5 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-semibold"
                >
                  🎁 {t.createWishlistButton}
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  ⚡ Sin registro necesario para empezar | 💯 Gratis para siempre
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-pink-500" />
                  <span>100% Gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                  <span>Fácil de Usar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-fuchsia-500" />
                  <span>Comparte al Instante</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features Section - SEO Rich Content */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir Cumplesito?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                La forma más simple y efectiva de organizar tu lista de regalos de cumpleaños
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="card text-center space-y-4 hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-pink-200">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-5 rounded-full">
                    <Sparkles className="w-10 h-10 text-pink-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Crea tu Lista en Minutos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Agrega regalos con fotos, descripciones y links a tiendas.
                  Tan fácil que cualquiera puede hacerlo, sin complicaciones.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="card text-center space-y-4 hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-purple-200">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-purple-100 to-fuchsia-100 p-5 rounded-full">
                    <Share2 className="w-10 h-10 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Comparte con un Click
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Obtén un enlace único para compartir por WhatsApp, email o redes sociales.
                  Tus amigos verán tu lista al instante.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="card text-center space-y-4 hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-fuchsia-200">
                <div className="flex justify-center">
                  <div className="bg-gradient-to-br from-fuchsia-100 to-pink-100 p-5 rounded-full">
                    <CheckCircle className="w-10 h-10 text-fuchsia-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Evita Regalos Repetidos
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Tus amigos marcan lo que van a regalarte.
                  ¡Nunca más dos personas te regalarán lo mismo!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - SEO Content */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo funciona Cumplesito?
              </h2>
              <p className="text-lg text-gray-600">
                En 3 simples pasos tendrás tu lista lista para compartir
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-pink-300">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-full text-xl font-bold mb-4 mx-auto">
                  1
                </div>
                <div className="text-center space-y-3">
                  <Calendar className="w-8 h-8 text-pink-600 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800">Crea tu Lista</h3>
                  <p className="text-gray-600">
                    Regístrate gratis y crea tu lista de cumpleaños con tu nombre y fecha
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-purple-300">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white rounded-full text-xl font-bold mb-4 mx-auto">
                  2
                </div>
                <div className="text-center space-y-3">
                  <Gift className="w-8 h-8 text-purple-600 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800">Agrega Regalos</h3>
                  <p className="text-gray-600">
                    Añade todos los regalos que deseas con fotos y links a las tiendas
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:border-2 hover:border-fuchsia-300">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white rounded-full text-xl font-bold mb-4 mx-auto">
                  3
                </div>
                <div className="text-center space-y-3">
                  <Users className="w-8 h-8 text-fuchsia-600 mx-auto" />
                  <h3 className="text-xl font-bold text-gray-800">Comparte</h3>
                  <p className="text-gray-600">
                    Envía el enlace a tus amigos y familia. ¡Ellos verán y reservarán regalos!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - More SEO Content */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Beneficios de usar Cumplesito
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Heart className="w-8 h-8 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Recibe lo que realmente quieres
                  </h3>
                  <p className="text-gray-600">
                    Dile a tus amigos exactamente qué regalos te gustaría recibir.
                    No más regalos que terminas guardando o devolviendo.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Sin duplicados
                  </h3>
                  <p className="text-gray-600">
                    El sistema marca automáticamente los regalos reservados.
                    Evita la incómoda situación de regalos repetidos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Fácil para todos
                  </h3>
                  <p className="text-gray-600">
                    Interfaz súper simple que hasta tu abuela puede usar.
                    No necesitas ser experto en tecnología.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Gift className="w-8 h-8 text-fuchsia-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    100% Gratis
                  </h3>
                  <p className="text-gray-600">
                    Sin costos ocultos, sin planes premium.
                    Todas las funciones gratis para siempre.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Preguntas Frecuentes
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  ¿Es realmente gratis?
                </h3>
                <p className="text-gray-600">
                  Sí, Cumplesito es 100% gratis. Puedes crear todas las listas que quieras,
                  agregar ilimitados regalos y compartir con todos tus amigos sin pagar nada.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  ¿Necesito registrarme?
                </h3>
                <p className="text-gray-600">
                  Sí, necesitas crear una cuenta gratuita para crear y administrar tus listas.
                  El registro toma menos de 1 minuto y puedes usar tu email.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  ¿Mis amigos pueden ver quién reservó qué regalo?
                </h3>
                <p className="text-gray-600">
                  Puedes configurar tu lista para permitir o no compras anónimas.
                  Así tienes control sobre la privacidad de tu lista.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  ¿Puedo usar Cumplesito para otras ocasiones?
                </h3>
                <p className="text-gray-600">
                  ¡Por supuesto! Aunque está optimizado para cumpleaños, puedes crear listas
                  para bodas, baby showers, navidad o cualquier ocasión especial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-pink-600 via-purple-600 to-fuchsia-600 text-white">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">
              ¿Listo para crear tu lista de regalos?
            </h2>
            <p className="text-xl opacity-90">
              Únete a miles de personas que ya usan Cumplesito para organizar sus cumpleaños
            </p>
            <button
              onClick={handleCreateClick}
              className="bg-white text-pink-600 hover:bg-pink-50 px-10 py-5 rounded-xl text-lg font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              🎉 Crear Mi Lista Gratis
            </button>
          </div>
        </section>

        {/* Advertisement - Subtle placement */}
        <div className="py-8 bg-gray-50">
          <ResponsiveAdBanner slotId="home-footer" />
        </div>

        {/* Footer with SEO Links */}
        <footer className="py-8 bg-gray-900 text-gray-300">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center space-y-4">
              <div className="flex justify-center items-center gap-2 mb-4">
                <img src="/cumplesito-logo.svg" alt="Cumplesito Logo" className="w-8 h-8" />
                <span className="text-xl font-bold text-white">Cumplesito</span>
              </div>
              <p className="text-sm">
                La mejor plataforma gratuita para crear y compartir listas de regalos de cumpleaños
              </p>
              <p className="text-sm">
                {t.footerText}
              </p>
              <div className="text-xs text-gray-400 pt-4">
                © 2026 Cumplesito. Todos los derechos reservados.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
