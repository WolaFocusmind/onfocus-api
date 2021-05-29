module.exports = {
  apps: [{
    name: "WOLA API",
    script: "./src/index.js",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
  }],

};
