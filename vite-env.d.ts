interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  // Add other environment variables used in your project here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
