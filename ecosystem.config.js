module.exports = {
  apps: [
    {
      name: 'PROD',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: 'index.js',
      autorestart: true,
      watch: 'index.js',
      out_file: 'logs/out.log',
      node_args: '--trace-warnings',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
