// ONERIDE PROJECT CONFIGURATION
// ?? DO NOT CHANGE THIS CONFIGURE FILE UNLESS YOU ARE AWARE OF WHAT IT DOES
// ! THINK BEFORE YOU CHANGE THIS FILE

export const base_api = process.env.NEXT_PUBLIC_API_BASE_URL;
export const base_server = process.env.NEXT_PUBLIC_SERVER;
const onDev = process.env.NEXT_PUBLIC_APP_ENV === "development";

// Example usage
export const apiConfig = {
  baseUrl: base_api,
  base:base_server,
  isDevelopment: onDev,
}; 