import { createClient } from "@supabase/supabase-js"
import { ENV } from "../../env.js"
import type { Database } from "./supabase.js"

export const database = createClient<Database>(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY)
