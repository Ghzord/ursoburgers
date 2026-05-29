import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hrrrqrfahwcorjfzmdb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhocnJxcmZhcmh3Y29yamZ6bWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5MTY3ODgsImV4cCI6MjA5NTQ5Mjc4OH0.9g88G5tFxC2hckBMltqU75-1G0H9EkGF5iPQmbVhkvE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
