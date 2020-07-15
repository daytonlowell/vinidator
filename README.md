# vinidator
Validate a vehicle VIN

# Install

```sh

npm i vinidator

```

# API

```js
const { validate, validateAndThrowOnInvalid } = require('vinidator')

validate('1HTMMAANX4H670946') // { isValid: true, code: 'SUCCESS', message: 'VIN is valid' }

validateAndThrowOnInvalid('1m2k195c51m017395') // throws

```
