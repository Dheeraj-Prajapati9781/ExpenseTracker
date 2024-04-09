
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://gjnlplrunmgtctnsvtnq.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqbmxwbHJ1bm1ndGN0bnN2dG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEzNzc2OTYsImV4cCI6MjAyNjk1MzY5Nn0.fua0CkqCGPMsuj6JvGYmhtItm5S3lEyI_6oEMeolkv4'
    )