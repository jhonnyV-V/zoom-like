/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_PEER_HOST: string;
  readonly VITE_PEER_PORT: number;
  readonly VITE_PEER_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
