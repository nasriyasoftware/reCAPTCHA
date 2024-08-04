<a href="https://package.nasriya.net/recaptcha"><img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/RecaptchaLogo.svg" height="100px" alt="Google reCAPTCHA Logo"></a>

# reCAPTCHA

[![Static Badge](https://img.shields.io/badge/license-personal_use-blue?labelColor=%23585858&color=%234ec920)](https://github.com/nasriyasoftware/reCAPTCHA?tab=License-1-ov-file) ![Repository Size](https://img.shields.io/github/repo-size/nasriyasoftware/reCAPTCHA.svg) ![Last Commit](https://img.shields.io/github/last-commit/nasriyasoftware/reCAPTCHA.svg) [![Status](https://img.shields.io/badge/Status-Stable-green.svg)](link-to-your-status-page)

##### Visit us at [www.nasriya.net](https://nasriya.net).

Nasriya reCAPTCHA is a backend package for integrating Google reCAPTCHA to protect against bots and automated abuse.

Made with ❤️ in **Palestine** 🇵🇸
___
## Overview
Secure your applications with our comprehensive Google reCAPTCHA backend package. Designed for seamless integration, this package enables robust protection against bots and automated abuse by verifying user interactions with Google's reCAPTCHA service. Effortlessly manage account creations, logins, and other critical operations with enhanced security, ensuring a safer user experience.

___
## Quick Start Guide
Quickly run a integrate Google reCAPTCHA with your server

#### 1. Installation
```shell
npm install @nasriya/reCAPTCHA
```

#### 2. Importing
Importing in **ESM** modules
```js
import reCAPTCHA from '@nasriya/reCAPTCHA';
```

Importing in **CommonJS** modules
```js
const reCAPTCHA = require('@nasriya/reCAPTCHA').default;
```
___
## Configurations
To configure the package, you must add two environment variables to your `.env` file:

```env
CAPTCHA_SITE_KEY=<siteKey>
CAPTCHA_SECRET_KEY=<siteSecret>
```
___
## Usage
To use the package, simply call the `authorize` method with the token.

```ts
const isAuthorized: boolean = await reCAPTCHA.authorize(token);
```

Here's an example:
```js
import hypercloud from '@nasriya/hypercloud';
import reCAPTCHA from '@nasriya/reCAPTCHA';

const server = hypercloud.server({ secure: true });
const router = server.Router();

router.post('/api/v1/auth', async (req, res, next) => {
    const body = req.body;

    try {
        const isAuthorized = await reCAPTCHA.authorize(body.token);

        if (isAuthorized !== true) {
            return res.pages.unauthorized();
        }

        // Continue processing the request
    } catch {
        res.pages.serverError();
    }
})
```
___
## License
Please read the license from [here](https://github.com/nasriyasoftware/reCAPTCHA?tab=License-1-ov-file).