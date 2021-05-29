module.exports = Object.freeze({
  // JWT Token
  EXPIRATION_TOKEN: 31536000, // 1 year
  SALT_ENCRYPT: 10,

  SESSION_STATUS: {
    ONLINE: true,
    OFFLINE: false,
  },

  STATUS: {
    ACTIVE: true,
    INACTIVE: false,
    PUBLISHED: true,
    UNPUBLISHED: false,
  },

  ENTITY_TYPES: {
    COURSE: 0,
    TEACHER: 1,
    CATEGORY: 2,
    STUDENT: 3,
    TRASH: 4,
  },

  USER_TYPES: {
    ADMIN: 0,
    TEACHER: 1,
    STUDENT: 2,
    VISITOR: 4,
  },

  MODULE_PROGRESS: {
    COMPLETED: true,
    INCOMPLETED: false,
  },

  PAYMENTS_GATEWAY: {
    MERCADOPAGO: 0,
    STRIPE: 1,
    PAYPAL: 2,
  },

  PAYMENT_STATUS: {
    PENDING: 0,
    APPROVED: 1,
    DECLINE: 2,
  },

  // Validation
  MIN_USERNAME_LENGTH: 5,
  MAX_USERNAME_LENGTH: 50,
});
