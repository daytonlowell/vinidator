const validationCodes = require('./validation-codes')
const CHECKSUM_INDEX = 8
const SUCCESS_CODE = 'SUCCESS'
const weight = Object.freeze([ 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 ])
const transliterateMap = Object.freeze({
	//I, O, & Q are invalid
	A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
})

function makeValueMap(vin) {
	return vin.map((character, index) => {
		if (index === CHECKSUM_INDEX) {
			return 0
		} else {
			if (transliterateMap[character] === undefined) {
				throw `INVALID_CHARACTER`
			}

			return transliterateMap[character]
		}
	})
}

function checkChecksum(value, checksumCharacter) {
	const sum = value
		.map((val, index) => val * weight[index])
		.reduce((sum, val) => sum + val, 0)

	let derivedChecksumCharacter = sum % 11

	if (derivedChecksumCharacter == 10) {
		derivedChecksumCharacter = 'X'
	}

	return derivedChecksumCharacter == checksumCharacter ? SUCCESS_CODE : 'INVALID_CHECKSUM'
}

function validate(vin) {
	let code = SUCCESS_CODE
	let value = []

	vin = vin.toUpperCase().split('')

	try {
		value = makeValueMap(vin)
	} catch (e) {
		code = e
	}

	if (code !== SUCCESS_CODE) {
		return validationCodes[code]
	}

	return validationCodes[checkChecksum(value, vin[CHECKSUM_INDEX])]
}

function validateAndThrowOnInvalid(vin) {
	const validation = validate(vin)

	if (validation && validation.isValid) {
		return validation
	} else {
		throw new Error(validation)
	}
}

module.exports = {
	validate,
	validateAndThrowOnInvalid,
}