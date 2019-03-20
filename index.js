const checksumIndex = 8
const transliterateMap = {
	//I, O, & Q are invalid
	A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
}

function makeValueMap(vin) {
	return vin.map((character, index) => {
		if (index === checksumIndex) {
			return 0
		} else {
			if (transliterateMap[character] === undefined) {
				throw `INVALID_CHARACTER`
			}

			return transliterateMap[character]
		}
	})
}

function makeValidationObject(code) {
	const returnCodes = {
		INVALID_CHARACTER: 'An invalid character was found in the VIN',
		INVALID_CHECKSUM: 'The checksum didn\'t match',
		SUCCESS: 'VIN decoded successfully',
	}

	return {
		isValid: code === 'SUCCESS',
		code,
		message: returnCodes[code],
	}
}

function checkChecksum(value, checksumCharacter) {
	const weight = [ 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 ]

	const sum = value
		.map((val, index) => val * weight[index])
		.reduce((sum, val) => sum + val, 0)

	let derivedChecksumCharacter = sum % 11

	if (derivedChecksumCharacter == 10) {
		derivedChecksumCharacter = 'X'
	}

	return derivedChecksumCharacter == checksumCharacter ? 'SUCCESS' : 'INVALID_CHECKSUM'
}

function validateSync(vin) {
	let code = 'SUCCESS'
	let value = []

	vin = vin.toUpperCase().split('')

	try {
		value = makeValueMap(vin)
	} catch (e) {
		code = e
	}

	if (code !== 'SUCCESS') {
		return makeValidationObject(code)
	}

	return makeValidationObject(checkChecksum(value, vin[checksumIndex]))
}

function validate(vin) {
	return new Promise((resolve, reject) => {
		const validation = validateSync(vin)

		validation.isValid ? resolve(validation) : reject(validation)
	})
}

module.exports = {
	validateSync,
	validate,
	makeValidationObject,
}