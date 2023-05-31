// enumeration for roles
export enum StaticDetails_Roles {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

// enumeration for the possible order statuses
export enum StaticDetails_OrderStatus {
  STATUS_PENDING = 'Pendiente',
  STATUS_CONFIRMED = 'Confirmado',
  STATUS_COOKING = 'En preparación',
  STATUS_READY = 'Listo para llevar',
  STATUS_COMPLETED = 'Pedido entregado',
  STATUS_CANCELLED = 'Pedido cancelado'
}

// enumeration for the product categories
export enum StaticDetails_ProductCategory {
  CATEGORY_BREAKFAST = 'Desayuno',
  CATEGORY_LUNCH = 'Almuerzo',
  CATEGORY_DINNER = 'Cena',
  CATEGORY_DESSERT = 'Postre',
  CATEGORY_DRINK = 'Bebida'
}

// enumeration for product search criteria
export enum StaticDetails_ProductSortCriteria {
  SORT_PRODUCTS_BY_PRICE_LOW_TO_HIGH = 'Precio: Más barato - Más caro',
  SORT_PRODUCTS_BY_PRICE_HIGH_TO_LOW = 'Precio: Más caro - Más barato',
  SORT_PRODUCTS_BY_NAME_A_TO_Z = 'Nombre: A - Z',
  SORT_PRODUCTS_BY_NAME_Z_TO_A = 'Nombre: Z - A'
}

// enumeration for log levels
export enum StaticDetails_LogLevel {
  LOG_LEVEL_INFO = 'info',
  LOG_LEVEL_WARN = 'warn',
  LOG_LEVEL_ERROR = 'error',
  LOG_LEVEL_FATAL = 'fatal'
}