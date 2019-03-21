# vin-validator

```js
const { validate, validateAndThrowOnInvalid } = require('vin-validator')

validate('1HTMMAANX4H670946') // { isValid: true, code: 'SUCCESS', message: 'VIN decoded successfully' }

validateAndThrowOnInvalid('1m2k195c51m017395') // throws

```