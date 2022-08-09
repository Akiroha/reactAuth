import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://decjhfcqtfdtuahrmjqi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlY2poZmNxdGZkdHVhaHJtanFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTkxNTIzMzYsImV4cCI6MTk3NDcyODMzNn0.I0iWI5r0CsnlZueKuVRT6SwK5Xc6T7HqGwLMlEUhyPg'
);

export const signUp = async (email, password) => {
  const res = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return res;
};

export const signIn = async (email, password) => {
  const res = await supabase.auth.signIn({
    email: email,
    password: password,
  });

  return res;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  return error;
};

export const getSession = () => {
  const session = supabase.auth.session();

  return session;
};

export const getUser = () => {
  const user = supabase.auth.user();

  return user;
};

export const updatePassword = async (password) => {
  const res = await supabase.auth.update({ password: password });

  return res;
};
