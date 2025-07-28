# portless-webhook

**portless-webhook** is a developer-focused tool for securely receiving POST webhook requests on your local machine **without opening router ports**. It leverages secure tunnels (like [ngrok](https://ngrok.com/)) and robust payload authentication to ensure data integrity and security. Designed to be **generic and service-agnostic**, it works seamlessly with GitHub, GitLab, Stripe, and any other service that supports webhooks.

---

<p align="center">
  <img src="webhookLogo.png" alt="Portless Webhook Banner" width="80%" />
</p>

---

## 🚀 Key Features

- **No Port Forwarding Required:** Receive webhooks on your local machine without exposing ports—ideal for firewalled or NAT environments.
- **Payload Authentication:** HMAC signature verification with configurable algorithm and header.
- **Service Agnostic:** Works with any service that supports webhooks and HMAC signatures.
- **Plug & Play:** Minimal setup—get running in minutes.
- **Extensible:** Adapt payload handling and signature verification to your needs.

---

## 📦 Table of Contents

- [Getting Started](#getting-started)
- [Running the Server](#running-the-server)
- [Expose with ngrok (or Similar)](#expose-with-ngrok-or-similar)
- [Usage Examples](#usage-examples)
  - [GitHub](#github)
  - [Stripe](#stripe)
- [Customization](#customization)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)
- [Authors & Credits](#authors--credits)
- [Contact](#contact)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Biosbardos/portless-webhook.git
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create and Configure `.env`

Create a `.env` file in the root directory with the following variables:

```env
WEBHOOK_SECRET=your_webhook_secret_here
SIGNATURE_HEADER=x-hub-signature-256   # e.g. for GitHub; change for your provider
SIGNATURE_ALGORITHM=sha256             # e.g. sha256, sha1, sha512, etc.
PORT=3000                              # (Optional) Server port, default: 3000
```

**Variable details:**
- `WEBHOOK_SECRET`: The secret/token configured in your webhook provider.
- `SIGNATURE_HEADER`: HTTP header where the webhook provider sends the signature.
- `SIGNATURE_ALGORITHM`: Hash algorithm (e.g., `sha256`, `sha1`).
- `PORT`: Port for the local server.

---

## ▶️ Running the Server

```bash
node PortlessWebhook.js
```

Your server will listen on the configured `PORT` (default: 3000).

---

## 🌐 Expose with ngrok (or Similar)

To make your local server reachable from the internet, use [ngrok](https://ngrok.com/):

```bash
ngrok http 3000
```

Copy the HTTPS URL provided by ngrok (e.g., `https://abcd1234.ngrok.io/webhook`).  
Use this URL as the webhook endpoint in your external service.

---

## 💡 Usage Examples

### GitHub

1. In GitHub, set your webhook secret.
2. Set `.env`:
    - `WEBHOOK_SECRET`: Your secret.
    - `SIGNATURE_HEADER`: `x-hub-signature-256`
    - `SIGNATURE_ALGORITHM`: `sha256`
3. Use your ngrok HTTPS URL as the webhook endpoint.

### Stripe

1. In Stripe, set your webhook secret.
2. Set `.env` accordingly (see Stripe docs for header/algorithm).
3. Use your ngrok HTTPS URL as the webhook endpoint.

---

## ⚙️ Customization

### Payload Processing

Edit the `/webhook` route handler in `PortlessWebhook.js`  to process, store, or forward payloads as needed.

### Signature Verification

Signature verification logic is easily adjustable to match specific provider requirements (e.g., different header or signature formats).

---

## 🔒 Security Considerations

- Signature verification: Only requests with a valid HMAC signature (using your secret and algorithm) are accepted.
- Timing-attack proof: The server uses a constant-time comparison to mitigate timing attacks.
- No open router ports: Your local machine is never directly exposed in the internet.
- Customizable: Adapt signature verification to your provider’s requirements.
- **NEVER EXPOSE YOUR NGROK (or other secure tunnel provider) ENDPOINT PUBLICY.** Share it only with trusted sources.

---

## 🧑‍💻 Contributing

Contributions are warmly welcomed! If you'd like to enhance this project, feel free to fork the repository and submit a pull request — collaboration is always appreciated.

---

## 📄 License

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program in [`LICENSE`](LICENSE).  If not, see https://www.gnu.org/licenses/.

---

## 👥 Authors & Credits

- Developed by [Biosbardos](https://github.com/Biosbardos).

---

## 📫 Contact

Questions, ideas, or feedback? 
Open an issue, open a discussion or reach out via GitHub!

---

<p align="center">
  <b>Happy Payloads! 🚀</b>
</p>