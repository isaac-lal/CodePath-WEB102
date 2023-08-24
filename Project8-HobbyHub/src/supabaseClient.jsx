import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://buqtgjprkywmpugnomdx.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1cXRnanBya3l3bXB1Z25vbWR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODIyOTA3OTUsImV4cCI6MTk5Nzg2Njc5NX0.MjcD7_Jrp-BCCt-OP4EM0e3Fon1y6w9t1dm6dJOYids'; // expired so you can't steal loser

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
