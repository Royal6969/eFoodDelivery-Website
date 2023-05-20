export enum StaticDetails_Roles {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

export enum StaticDetails_OrderStatus {
  STATUS_PENDING = 'Pendiente',
  STATUS_CONFIRMED = 'Confirmado',
  STATUS_COOKING = 'En preparación',
  STATUS_READY = 'Listo para llevar',
  STATUS_COMPLETED = 'Pedido entregado',
  STATUS_CANCELLED = 'Pedido cancelado'
}

export enum StaticDetails_ProductCategory {
  CATEGORY_BREAKFAST = 'Desayuno',
  CATEGORY_LUNCH = 'Almuerzo',
  CATEGORY_DINNER = 'Cena',
  CATEGORY_DESSERT = 'Postre',
  CATEGORY_DRINK = 'Bebida'
}

export enum StaticDetails_ProductSortCriteria {
  SORT_PRODUCTS_BY_PRICE_LOW_TO_HIGH = 'Precio: Más barato - Más caro',
  SORT_PRODUCTS_BY_PRICE_HIGH_TO_LOW = 'Precio: Más caro - Más barato',
  SORT_PRODUCTS_BY_NAME_A_TO_Z = 'Nombre: A - Z',
  SORT_PRODUCTS_BY_NAME_Z_TO_A = 'Nombre: Z - A'
}