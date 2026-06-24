/**
 * Traffic analytics — Supabase connection (project "lead scraper").
 *
 * These two values are SAFE to commit: the anon/publishable key only has
 * permission to call two SECURITY DEFINER functions (track + read aggregates)
 * on an RLS-locked table. It cannot read or write raw rows. This is the same
 * key class Supabase ships in public client bundles.
 */
export const SUPABASE_URL = "https://ykjeptnouijpvdzvpxjs.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_FqwOnne-j0BUO2d2Bu4Sxw_IJB0GpKf";

/** Unguessable dashboard slug. The client opens /<DASHBOARD_SLUG>. */
export const DASHBOARD_SLUG = "dashboard-7k29qmx3";
