import validationCodes from './validation-codes.js'
import { CODES } from './validation-codes.js'
const CHECKSUM_INDEX = 8
const weight = Object.freeze([ 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 ])
const transliterateMap: Record<string, number> = Object.freeze({
	//I, O, & Q are invalid
	A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9, 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
})

function makeValueMap(vin: string[]): number[] {
	if (vin.length !== 17) {
		throw CODES.INVALID_LENGTH
	}

	return vin.map((character, index) => {
		if (index === CHECKSUM_INDEX) {
			return 0
		} else {
			if (!transliterateMap.hasOwnProperty(character)) { //TODO switch to Object.hasOwn eventually
				throw CODES.INVALID_CHARACTER
			}

			return transliterateMap[character]
		}
	})
}

function checkChecksum(value: number[], checksumCharacter: string) {
	const sum = value.reduce((sum, val, index) => sum + val * weight[index], 0)

	let derivedChecksumCharacter: string = (sum % 11).toString()

	if (derivedChecksumCharacter === '10') {
		derivedChecksumCharacter = `X`
	}

	return (derivedChecksumCharacter === checksumCharacter) ? CODES.SUCCESS : CODES.INVALID_CHECKSUM
}

export function validate(vin: string) {
	let code = CODES.SUCCESS
	let value: number[] = []

	const vinParts = vin.trim().toUpperCase().split('')

	try {
		value = makeValueMap(vinParts)
	} catch (e: any) {
		code = e
	}

	if (code !== CODES.SUCCESS) {
		return validationCodes[code]
	}

	return validationCodes[checkChecksum(value, vinParts[CHECKSUM_INDEX])]
}

export function validateAndThrowOnInvalid(vin: string) {
	const validation = validate(vin)

	if (validation && validation.isValid) {
		return validation
	} else {
		throw new Error(validation.message)
	}
}
