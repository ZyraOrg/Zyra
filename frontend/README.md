# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Google OAuth via Supabase

This app supports "Continue with Google" using Supabase Auth.

1. Install deps (already in package.json):
	- `@supabase/supabase-js`
2. Create a Supabase project and enable the Google provider in Authentication > Providers.
3. Add redirect URLs:
	- Development: `http://localhost:5173/auth/callback`
	- Production: `https://<your-domain>/auth/callback`
4. Create a `.env` file in `frontend/` based on `.env.example` and set:
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_ANON_KEY`
5. Start the app and click the Google button on Login/Signup.

If `VITE_SUPABASE_*` is not set, the Google button will show a configuration error.
