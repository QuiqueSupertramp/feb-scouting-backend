interface EnvConfig {
  NODE_ENV: "development" | "production"
  PORT: number
  SUPABASE_URL: string
  SUPABASE_SERVICE_ROLE_KEY: string
}

if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile?.(".env.local")
}

const required = (key: string) => {
  const value = process.env[key]
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`)
  }
  return value
}

export const ENV: EnvConfig = {
  NODE_ENV: (process.env.NODE_ENV ?? "development") as EnvConfig["NODE_ENV"],
  PORT: Number(process.env.PORT) ?? 3000,
  SUPABASE_URL: String(required("SUPABASE_URL")),
  SUPABASE_SERVICE_ROLE_KEY: String(required("SUPABASE_SERVICE_ROLE_KEY")),
}
