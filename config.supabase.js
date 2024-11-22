const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = 'https://szeziurpdwafnzkdrztb.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZXppdXJwZHdhZm56a2RyenRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMDQyOTMsImV4cCI6MjA0Nzc4MDI5M30.XWS5yElk7L8OKLlpe-VKl21Pz1CkYPPkbCLyZ_XFD_w'
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

module.exports = supabase
