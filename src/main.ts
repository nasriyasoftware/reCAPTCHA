class reCAPTCHA {
    readonly #supported_languages = ['ar', 'af', 'am', 'hy', 'az', 'eu', 'bn', 'bg', 'ca', 'hr', 'cs', 'da', 'nl', 'en', 'et', 'fil', 'fi', 'fr', 'gl', 'ka', 'de', 'el', 'gu', 'iw', 'hi', 'hu', 'is', 'id', 'it', 'ja', 'kn', 'ko', 'lo', 'lv', 'lt', 'ms', 'ml', 'mr', 'mn', 'no', 'fa', 'pl', 'pt', 'ro', 'ru', 'sr', 'si', 'sk', 'sl', 'es', 'sw', 'sv', 'ta', 'te', 'th', 'tr', 'uk', 'ur', 'vi', 'zu']
    readonly #keys = Object.freeze({
        site_key: process.env.CAPTCHA_SITE_KEY,
        secret_key: process.env.CAPTCHA_SECRET_KEY
    })

    get siteKey() { return this.#keys.site_key }

    /**
     * Get a reCAPTCHA supported language based on the request language
     * @param {string} lang Request language
    */
    getLanguage(lang: string) {
        return this.#supported_languages.includes(lang) ? lang : 'en'
    }

    /**
     * Authorize the captcha token
     * @param {string} token The reCAPTCHA token from the client-side
     * @returns {Promise<boolean>}
     */
    async authorize(token: string): Promise<boolean> {
        try {
            if (typeof token !== 'string' || token.length === 0) { throw 'Invalid reCaptcha token.' }
            const httpResponse = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${this.#keys.secret_key}&response=${token}`, {
                method: 'POST'
            })

            if (!httpResponse.ok) { throw new Error('Unexpected authorization response was received.') }

            const response = await httpResponse.json();

            if (response.success === false) {
                return false;
            }

            if (response.success === true) {
                if (response.score < 0.3) {
                    return false;
                }

                return true;
            }

            return false
        } catch (error) {
            if (error instanceof Error) { error.message = `reCAPTCHA Authorization Error: ${error.message}` }
            if (typeof error === 'string') { `reCAPTCHA Authorization Error: ${error}` }
            return Promise.reject(error);
        }
    }
}

const reCaptcha = new reCAPTCHA();
export default reCaptcha;