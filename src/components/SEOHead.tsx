import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * SEO Head Component
 * Dynamically updates meta tags for SEO optimization
 */
export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Cumplesito - Tu Lista de Regalos de Cumpleaños Online',
  description = 'Crea y comparte tu lista de regalos de cumpleaños con amigos y familia. La forma más fácil de organizar tus deseos y evitar regalos repetidos.',
  keywords = 'lista de regalos, cumpleaños, wishlist, regalos, lista de deseos, birthday wishlist, gift registry, lista cumpleaños',
  image = '/cumplesito-logo.svg',
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
}) => {
  const location = useLocation();
  const canonicalUrl = `https://cumplesito.com${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author || 'Cumplesito');

    // Open Graph tags
    updateMetaTag('og:title', title, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:site_name', 'Cumplesito', 'property');
    updateMetaTag('og:locale', 'es_ES', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Article specific tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime, 'property');
      }
      if (modifiedTime) {
        updateMetaTag('article:modified_time', modifiedTime, 'property');
      }
      if (author) {
        updateMetaTag('article:author', author, 'property');
      }
    }

    // Update canonical link
    updateCanonicalLink(canonicalUrl);
  }, [title, description, keywords, image, type, author, publishedTime, modifiedTime, canonicalUrl]);

  return null; // This component doesn't render anything
};

// Helper function to update or create meta tags
function updateMetaTag(name: string, content: string, attribute: 'name' | 'property' = 'name') {
  if (!content) return;

  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
}

// Helper function to update canonical link
function updateCanonicalLink(url: string) {
  let link = document.querySelector('link[rel="canonical"]');

  if (link) {
    link.setAttribute('href', url);
  } else {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }
}

// Structured Data Component for JSON-LD
interface StructuredDataProps {
  type: 'WebSite' | 'WebPage' | 'Article' | 'Organization';
  data: Record<string, any>;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type,
      ...data,
    });

    // Remove old structured data if exists
    const oldScript = document.querySelector('script[type="application/ld+json"]');
    if (oldScript) {
      oldScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [type, data]);

  return null;
};
