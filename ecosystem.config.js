module.exports = {
  apps: [
    {
      name: 'my-nest-app',
      script: 'dist/main.js',
      instances: 'max', // Ou use um número específico de instâncias
      exec_mode: 'cluster', // Modo de cluster para escalabilidade
      watch: false, // Se quiser reiniciar ao fazer alterações nos arquivos
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
