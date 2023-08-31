module.exports = {
  datastores: {
    default: {

    },
  },

  models: {
    migrate: 'safe',
  },

  blueprints: {
    shortcuts: false,
  },

  security: {
    cors: {

    },
  },

  session: {
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
    },
  },

  sockets: {
    onlyAllowOrigins: ["https://mydomainname.com"]
  },

  log: {
    level: 'debug'
  },

  http: {
    cache: 365.25 * 24 * 60 * 60 * 1000, // One year
  },

  custom: {

  },
};
