import fs from 'fs';
import { join } from 'path';

interface IWebConfig {
  VITE_API_BASE_URL: string;
}

const repositoryRoot = join(__dirname, '../../../');
const backendEnvPath = join(repositoryRoot, 'apps/web/.env');

const geWebConfig = async (): Promise<IWebConfig> => {
  return {
    VITE_API_BASE_URL: "http://localhost:3000",
  };
}

const generateFrontendEnvFiles = async () => {
  const apiConfig = await geWebConfig();
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
  const envFiles = await generateFrontendEnvFiles();
}

run();