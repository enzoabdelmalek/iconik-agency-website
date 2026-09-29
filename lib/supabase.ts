import { createClient } from '@supabase/supabase-js'

/**
 * Client Supabase **serveur uniquement**.
 *
 * Il était importé par `app/talents/page.tsx`, un composant « use client » :
 * la clé partait donc dans le paquet servi à chaque visiteur. Avec elle, on
 * pouvait lire tout ce que le rôle anon peut lire dans le projet — y compris
 * les réservations des autres clients de l'agence.
 *
 * Les variables sans préfixe sont préférées, celles avec `NEXT_PUBLIC_`
 * acceptées en repli pour ne pas dépendre d'une manipulation dans Vercel.
 * Ça n'affaiblit rien : une variable `NEXT_PUBLIC_` n'est incluse dans le
 * paquet du navigateur que là où elle est RÉFÉRENCÉE, et ce fichier n'est
 * plus importé que par des composants serveur.
 */
const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) throw new Error("Supabase n'est pas configuré (URL ou clé manquante)")

export const supabase = createClient(url, key)

const businessId = process.env.BUSINESS_ID ?? process.env.NEXT_PUBLIC_BUSINESS_ID
if (!businessId) throw new Error("BUSINESS_ID n'est pas défini")
export const BUSINESS_ID = businessId
