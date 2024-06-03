import fs from 'fs';
import { join } from 'path';

interface IApiConfig {
  ACCESS_TOKEN_SECRET: string;
}

const repositoryRoot = join(__dirname, '../../../');
const backendEnvPath = join(repositoryRoot, 'apps/api/.env');

const getApiConfig = async (): Promise<IApiConfig> => {
  return {
    ACCESS_TOKEN_SECRET: "my-secret-key",
  };
}

const generateBackendEnvFiles = async () => {
  const apiConfig = await getApiConfig();
  const envFiles = {
    [backendEnvPath]: apiConfig,
  };

  for (const [path, config] of Object.entries(envFiles)) {
    const envContent = Object.entries(config)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    fs.writeFileSync(path, envContent);
  }

  return envFiles;
}

const run = async () => {
  const envFiles = await generateBackendEnvFiles();
}

run();