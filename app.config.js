export default ({ config }) => ({
  ...config,
  extra: {
    EXPO_PUBLIC_GEMINI_API_KEY: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
  },
});