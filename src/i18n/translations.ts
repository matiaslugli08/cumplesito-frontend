/**
 * Translation definitions for the application
 */

export interface Translations {
  // Common
  loading: string;
  cancel: string;
  save: string;
  edit: string;
  delete: string;
  create: string;
  update: string;
  confirm: string;
  backToHome: string;
  copied: string;

  // Navigation
  home: string;
  myWishlists: string;
  login: string;
  logout: string;
  register: string;

  // Home Page
  homeTitle: string;
  homeSubtitle: string;
  createWishlistButton: string;
  easyToCreateTitle: string;
  easyToCreateDesc: string;
  shareWithFriendsTitle: string;
  shareWithFriendsDesc: string;
  trackPurchasesTitle: string;
  trackPurchasesDesc: string;
  footerText: string;

  // Create Wishlist
  createWishlistTitle: string;
  createWishlistSubtitle: string;
  wishlistTitle: string;
  wishlistTitlePlaceholder: string;
  yourName: string;
  yourNamePlaceholder: string;
  birthdayDate: string;
  description: string;
  descriptionPlaceholder: string;
  allowAnonymousPurchase: string;
  allowAnonymousPurchaseHelp: string;
  createWishlistSubmit: string;
  creating: string;
  createWishlistNote: string;

  // Wishlist Page
  addItem: string;
  copyShareLink: string;
  copyLink: string;
  ownerNotice: string;
  noItemsYet: string;
  noItemsOwner: string;
  noItemsVisitor: string;
  addFirstItem: string;

  // Item Card
  viewProduct: string;
  markAsPurchased: string;
  unmarkAsPurchased: string;
  purchasedBy: string;
  yourNameInput: string;
  confirmPurchase: string;

  // Item Form
  addNewItem: string;
  editItem: string;
  itemTitle: string;
  itemTitlePlaceholder: string;
  itemDescription: string;
  itemDescriptionPlaceholder: string;
  imageUrl: string;
  imageUrlPlaceholder: string;
  imageUrlOptional: string;
  productUrl: string;
  productUrlPlaceholder: string;
  addItemButton: string;
  updateItemButton: string;

  // Login Page
  loginTitle: string;
  loginSubtitle: string;
  email: string;
  emailPlaceholder: string;
  password: string;
  passwordPlaceholder: string;
  loginButton: string;
  loggingIn: string;
  noAccount: string;
  createAccount: string;

  // Register Page
  registerTitle: string;
  registerSubtitle: string;
  name: string;
  namePlaceholder: string;
  registerButton: string;
  registering: string;
  haveAccount: string;
  loginLink: string;

  // My Wishlists Page
  myWishlistsTitle: string;
  myWishlistsSubtitle: string;
  noWishlistsYet: string;
  createFirstWishlist: string;
  items: string;
  viewWishlist: string;
  deleteWishlist: string;
  deleteConfirm: string;

  // Validation
  required: string;
  invalidUrl: string;
  invalidEmail: string;

  // Errors
  errorLoadingWishlist: string;
  errorCreatingWishlist: string;
  errorAddingItem: string;
  errorUpdatingItem: string;
  errorDeletingItem: string;
  errorLogin: string;
  errorRegister: string;
  wishlistNotFound: string;
}

export const translations: Record<'en' | 'es', Translations> = {
  en: {
    // Common
    loading: 'Loading...',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    create: 'Create',
    update: 'Update',
    confirm: 'Confirm',
    backToHome: 'Back to Home',
    copied: 'Copied!',

    // Navigation
    home: 'Home',
    myWishlists: 'My Wishlists',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',

    // Home Page
    homeTitle: 'Cumplesito - Your Birthday Wishlist',
    homeSubtitle: 'Create and share your perfect birthday wishlist with friends and family. The easiest way to organize your wishes and avoid duplicate gifts!',
    createWishlistButton: 'Create Your Wishlist',
    easyToCreateTitle: 'Easy to Create',
    easyToCreateDesc: 'Add items with images, descriptions, and links in seconds',
    shareWithFriendsTitle: 'Share with Friends',
    shareWithFriendsDesc: 'Get a unique link to share with your friends and family',
    trackPurchasesTitle: 'Track Purchases',
    trackPurchasesDesc: 'Friends can mark items as purchased to avoid duplicates',
    footerText: 'Made with ❤️ for special celebrations',

    // Create Wishlist
    createWishlistTitle: 'Create Your Wishlist',
    createWishlistSubtitle: 'Share your birthday wishes with friends and family',
    wishlistTitle: 'Wishlist Title',
    wishlistTitlePlaceholder: 'e.g., My 30th Birthday Wishlist',
    yourName: 'Your Name',
    yourNamePlaceholder: 'e.g., John Doe',
    birthdayDate: 'Birthday Date',
    description: 'Description',
    descriptionPlaceholder: 'Tell your friends what this wishlist is about...',
    allowAnonymousPurchase: 'Allow anonymous purchases',
    allowAnonymousPurchaseHelp: 'If enabled, people can purchase items without entering their name',
    createWishlistSubmit: 'Create Wishlist',
    creating: 'Creating...',
    createWishlistNote: 'After creating your wishlist, you\'ll be able to add items and get a shareable link to send to your friends!',

    // Wishlist Page
    addItem: 'Add Item',
    copyShareLink: 'Copy Share Link',
    copyLink: 'Copy Link',
    ownerNotice: 'You are the owner of this wishlist. You can add, edit, and delete items. Share the link above with your friends!',
    noItemsYet: 'No items yet',
    noItemsOwner: 'Start adding items to your wishlist!',
    noItemsVisitor: 'The wishlist owner hasn\'t added any items yet.',
    addFirstItem: 'Add Your First Item',

    // Item Card
    viewProduct: 'View Product',
    markAsPurchased: 'Mark as Purchased',
    unmarkAsPurchased: 'Unmark as Purchased',
    purchasedBy: 'Purchased by',
    yourNameInput: 'Your name',
    confirmPurchase: 'Confirm Purchase',

    // Item Form
    addNewItem: 'Add New Item',
    editItem: 'Edit Item',
    itemTitle: 'Title',
    itemTitlePlaceholder: 'e.g., Wireless Headphones',
    itemDescription: 'Description',
    itemDescriptionPlaceholder: 'Describe what you want...',
    imageUrl: 'Image URL',
    imageUrlPlaceholder: 'https://example.com/image.jpg',
    imageUrlOptional: 'Image URL (optional - auto-detected)',
    productUrl: 'Product URL',
    productUrlPlaceholder: 'https://example.com/product',
    addItemButton: 'Add Item',
    updateItemButton: 'Update Item',

    // Login Page
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Login to manage your wishlists',
    email: 'Email',
    emailPlaceholder: 'your.email@example.com',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    loginButton: 'Login',
    loggingIn: 'Logging in...',
    noAccount: 'Don\'t have an account?',
    createAccount: 'Create one',

    // Register Page
    registerTitle: 'Create Account',
    registerSubtitle: 'Join us to create and manage your wishlists',
    name: 'Name',
    namePlaceholder: 'Your full name',
    registerButton: 'Register',
    registering: 'Creating account...',
    haveAccount: 'Already have an account?',
    loginLink: 'Login here',

    // My Wishlists Page
    myWishlistsTitle: 'My Wishlists',
    myWishlistsSubtitle: 'View and manage all your wishlists',
    noWishlistsYet: 'No wishlists yet',
    createFirstWishlist: 'Create your first wishlist to get started!',
    items: 'items',
    viewWishlist: 'View Wishlist',
    deleteWishlist: 'Delete Wishlist',
    deleteConfirm: 'Are you sure you want to delete this wishlist?',

    // Validation
    required: 'This field is required',
    invalidUrl: 'Please enter a valid URL',
    invalidEmail: 'Please enter a valid email',

    // Errors
    errorLoadingWishlist: 'Failed to load wishlist',
    errorCreatingWishlist: 'Failed to create wishlist. Please try again.',
    errorAddingItem: 'Failed to add item',
    errorUpdatingItem: 'Failed to update item',
    errorDeletingItem: 'Failed to delete item',
    errorLogin: 'Invalid email or password',
    errorRegister: 'Failed to create account. Please try again.',
    wishlistNotFound: 'Wishlist not found',
  },
  es: {
    // Common
    loading: 'Cargando...',
    cancel: 'Cancelar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    create: 'Crear',
    update: 'Actualizar',
    confirm: 'Confirmar',
    backToHome: 'Volver al Inicio',
    copied: '¡Copiado!',

    // Navigation
    home: 'Inicio',
    myWishlists: 'Mis Listas',
    login: 'Iniciar Sesión',
    logout: 'Cerrar Sesión',
    register: 'Registrarse',

    // Home Page
    homeTitle: 'Cumplesito - Tu Lista de Regalos',
    homeSubtitle: 'Crea y comparte tu lista de regalos de cumpleaños con amigos y familia. ¡La forma más fácil de organizar tus deseos y evitar regalos repetidos!',
    createWishlistButton: 'Crear Tu Lista',
    easyToCreateTitle: 'Fácil de Crear',
    easyToCreateDesc: 'Agrega artículos con imágenes, descripciones y enlaces en segundos',
    shareWithFriendsTitle: 'Compartir con Amigos',
    shareWithFriendsDesc: 'Obtén un enlace único para compartir con tus amigos y familia',
    trackPurchasesTitle: 'Seguir Compras',
    trackPurchasesDesc: 'Los amigos pueden marcar artículos como comprados para evitar duplicados',
    footerText: 'Hecho con ❤️ para celebraciones especiales',

    // Create Wishlist
    createWishlistTitle: 'Crea Tu Lista de Deseos',
    createWishlistSubtitle: 'Comparte tus deseos de cumpleaños con amigos y familia',
    wishlistTitle: 'Título de la Lista',
    wishlistTitlePlaceholder: 'ej., Mi Cumpleaños #30',
    yourName: 'Tu Nombre',
    yourNamePlaceholder: 'ej., Juan Pérez',
    birthdayDate: 'Fecha de Cumpleaños',
    description: 'Descripción',
    descriptionPlaceholder: 'Cuéntale a tus amigos sobre esta lista de deseos...',
    allowAnonymousPurchase: 'Permitir compras anónimas',
    allowAnonymousPurchaseHelp: 'Si se activa, las personas pueden comprar artículos sin ingresar su nombre',
    createWishlistSubmit: 'Crear Lista',
    creating: 'Creando...',
    createWishlistNote: '¡Después de crear tu lista, podrás agregar artículos y obtener un enlace para compartir con tus amigos!',

    // Wishlist Page
    addItem: 'Agregar Artículo',
    copyShareLink: 'Copiar Enlace',
    copyLink: 'Copiar Enlace',
    ownerNotice: 'Eres el propietario de esta lista. Puedes agregar, editar y eliminar artículos. ¡Comparte el enlace con tus amigos!',
    noItemsYet: 'No hay artículos aún',
    noItemsOwner: '¡Comienza agregando artículos a tu lista!',
    noItemsVisitor: 'El propietario aún no ha agregado artículos.',
    addFirstItem: 'Agregar Tu Primer Artículo',

    // Item Card
    viewProduct: 'Ver Producto',
    markAsPurchased: 'Marcar como Comprado',
    unmarkAsPurchased: 'Desmarcar Comprado',
    purchasedBy: 'Comprado por',
    yourNameInput: 'Tu nombre',
    confirmPurchase: 'Confirmar Compra',

    // Item Form
    addNewItem: 'Agregar Nuevo Artículo',
    editItem: 'Editar Artículo',
    itemTitle: 'Título',
    itemTitlePlaceholder: 'ej., Auriculares Inalámbricos',
    itemDescription: 'Descripción',
    itemDescriptionPlaceholder: 'Describe lo que quieres...',
    imageUrl: 'URL de Imagen',
    imageUrlPlaceholder: 'https://ejemplo.com/imagen.jpg',
    imageUrlOptional: 'URL de Imagen (opcional - se detecta automáticamente)',
    productUrl: 'URL del Producto',
    productUrlPlaceholder: 'https://ejemplo.com/producto',
    addItemButton: 'Agregar Artículo',
    updateItemButton: 'Actualizar Artículo',

    // Login Page
    loginTitle: 'Bienvenido de Nuevo',
    loginSubtitle: 'Inicia sesión para gestionar tus listas',
    email: 'Email',
    emailPlaceholder: 'tu.email@ejemplo.com',
    password: 'Contraseña',
    passwordPlaceholder: 'Ingresa tu contraseña',
    loginButton: 'Iniciar Sesión',
    loggingIn: 'Iniciando sesión...',
    noAccount: '¿No tienes cuenta?',
    createAccount: 'Crear una',

    // Register Page
    registerTitle: 'Crear Cuenta',
    registerSubtitle: 'Únete para crear y gestionar tus listas',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre completo',
    registerButton: 'Registrarse',
    registering: 'Creando cuenta...',
    haveAccount: '¿Ya tienes cuenta?',
    loginLink: 'Inicia sesión aquí',

    // My Wishlists Page
    myWishlistsTitle: 'Mis Listas de Deseos',
    myWishlistsSubtitle: 'Ver y gestionar todas tus listas',
    noWishlistsYet: 'No hay listas aún',
    createFirstWishlist: '¡Crea tu primera lista para comenzar!',
    items: 'artículos',
    viewWishlist: 'Ver Lista',
    deleteWishlist: 'Eliminar Lista',
    deleteConfirm: '¿Estás seguro de que quieres eliminar esta lista?',

    // Validation
    required: 'Este campo es obligatorio',
    invalidUrl: 'Por favor ingresa una URL válida',
    invalidEmail: 'Por favor ingresa un email válido',

    // Errors
    errorLoadingWishlist: 'Error al cargar la lista',
    errorCreatingWishlist: 'Error al crear la lista. Por favor intenta de nuevo.',
    errorAddingItem: 'Error al agregar artículo',
    errorUpdatingItem: 'Error al actualizar artículo',
    errorDeletingItem: 'Error al eliminar artículo',
    errorLogin: 'Email o contraseña incorrectos',
    errorRegister: 'Error al crear cuenta. Por favor intenta de nuevo.',
    wishlistNotFound: 'Lista no encontrada',
  },
};
