export const DEFAULT_LIMIT = 5;
export const APP_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined; // TODO: change variable if deployed outside vercel
