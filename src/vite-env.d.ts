interface ImportMetaEnv {
  VITE_ANNICT_API_KEY: string;
  VITE_TODAY_DATA_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
