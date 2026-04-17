import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sevqnvectouveoctwshb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldnFudmVjdG91dmVvY3R3c2hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzODMzNTgsImV4cCI6MjA5MTk1OTM1OH0._2NWxbE1qhtWEZDFeMMGuycOW7aebhMmrpmfZxYSDoQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
