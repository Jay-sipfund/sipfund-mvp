# SIPFUND onboarding flow — signup-first interactive demo

The app opens on the signup form. It does not open on a dashboard.

## Run
1. Extract this ZIP.
2. Open PowerShell in the folder containing `package.json`.
3. Run `npm install`, then `npm run dev`.
4. Open http://localhost:3000.

## Flow
1. Signup: mobile, mobile ownership radio/select, email, email ownership, PAN.
2. Click Save & Continue to see the simulated KYC status decision.
3. Sample PAN `ABCDE1234F` shows KYC validated and allows direct NSE registration.
4. Sample PAN `PQRSX6789K` shows KYC not completed and offers Complete KYC or Skip for now.
5. Pending KYC goes to personal details, then NSE profile, nominee and bank details.
6. Field counts are behind the View field counts button, not the landing screen.

This is a presentation-only prototype. No API calls, OTP messages, account activation, or data persistence.
