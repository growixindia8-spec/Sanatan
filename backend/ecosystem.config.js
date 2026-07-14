module.exports = {
  apps: [
    {
      name: "sanatan-backend",
      script: "server.js",
      cwd: __dirname,
      watch: false,                  // Don't auto-restart on file changes (use nodemon for dev)
      autorestart: true,             // Restart if it crashes
      max_restarts: 10,              // Max restart attempts
      restart_delay: 3000,           // Wait 3s between restarts
      env: {
        NODE_ENV: "development",
        PORT: 5000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000
      },
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true
    }
  ]
};
