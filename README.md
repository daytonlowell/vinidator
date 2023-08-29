# vinidator
Validate a vehicle identification number(VIN)

# Install

```sh

npm i vinidator

```

# API

```js
import { validate, validateAndThrowOnInvalid } from 'vinidator'

validate('1HTMMAANX4H670946') // { isValid: true, code: 'SUCCESS', message: 'VIN is valid' }

validateAndThrowOnInvalid('1m2k195c51m017395') // throws

```
