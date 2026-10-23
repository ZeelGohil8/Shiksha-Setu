# Automated Parent Calls

## Run locally

1. Install Node.js 18 or newer.
2. In `backend/`, run `npm install`.
3. Copy `backend/.env.example` to `backend/.env`, then enter your Twilio credentials and a long random `API_KEY`. Never commit `.env`.
4. Set `ALLOWED_ORIGIN` to the exact origin serving the website. Serve the project root with a local static server, then set `PUBLIC_BASE_URL` as described below.
5. Set `window.SHIKSHASETU_CONFIG` before `script.js` loads. Configure `endpoint` as `https://your-api-host/api/notify-absent`, `statusEndpoint` as `https://your-api-host/api/call-status`, and `apiKey` to the same value as backend `API_KEY`. Do not put Twilio credentials in this object. For example, insert this before the existing `script.js` tag in `index.html`:

	 ```html
	 <script>
		 window.SHIKSHASETU_CONFIG = {
			 endpoint: "https://your-api-host/api/notify-absent",
			 statusEndpoint: "https://your-api-host/api/call-status",
			 apiKey: "same-value-as-backend-API_KEY",
			 schoolName: "Government Primary School",
			 language: "gu"
		 };
	 </script>
	 ```
6. Start the API with `cd backend && npm start`. Run the mocked backend tests with `npm test` from `backend/`.

## Webhook URL for local testing

Twilio must reach the status callback over public HTTPS. Start the local API on port 3000, then expose it with a tunnel such as `ngrok http 3000`. Set `PUBLIC_BASE_URL` to the tunnel origin (for example, `https://example.ngrok-free.app`) and restart the backend. The callback path is `/api/call-status`. Keep the tunnel URL stable while testing and configure the exact public website origin in `ALLOWED_ORIGIN`.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `TWILIO_ACCOUNT_SID` | Twilio account SID, backend only |
| `TWILIO_AUTH_TOKEN` | Twilio auth token, backend only; validates callbacks |
| `TWILIO_PHONE_NUMBER` | Voice-capable Twilio number in E.164 format |
| `PUBLIC_BASE_URL` | Public HTTPS base URL used for signed callbacks |
| `ALLOWED_ORIGIN` | Exact browser origin allowed by CORS |
| `API_KEY` | Shared frontend-to-backend secret sent as `X-API-Key` |
| `PORT` | API listen port; defaults to `3000` |
| `SCHOOL_NAME` | Fallback school name for call templates |
| `RETRY_DELAY_MIN` | Minutes to wait before one retry after busy/no-answer |

The browser config may contain only `endpoint`, optional `statusEndpoint`, `apiKey`, `schoolName`, and default `language`. The `apiKey` is a shared client secret and is visible to website users; protect the API with HTTPS, rate limits, and an origin-restricted deployment. Twilio credentials remain on the server.

## Trial mode

Twilio trial accounts can call only verified destination numbers and play a trial announcement before the generated message. A not-verified destination is shown as a clear failure in Parent Alerts. The status store is in-memory, so call status history is lost when the backend restarts.

## Go-live checklist

- Upgrade the Twilio account and confirm India outbound voice permissions, caller ID, and billing.
- Obtain and record parent consent for automated calls before enabling them.
- Set school-approved calling hours and an operational retry policy; `RETRY_DELAY_MIN` controls the single retry for busy/no-answer calls.
- Confirm parent numbers, language preferences, and school/class/date pronunciation with real recipients before broad rollout.
- Keep `.env`, Twilio credentials, and deployment logs private; do not log full phone numbers.
- DLT registration in India applies to SMS, not these voice calls. This project does not send SMS.
