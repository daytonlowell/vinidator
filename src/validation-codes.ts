export enum CODES {
	INVALID_CHARACTER = 'INVALID_CHARACTER',
	INVALID_CHECKSUM = 'INVALID_CHECKSUM',
	INVALID_LENGTH = 'INVALID_LENGTH',
	SUCCESS = 'SUCCESS',
}

export type ValidationCode = {
	isValid: boolean
	code: CODES
	message: string
}

export type ValidationCodesMap = Record<string, ValidationCode>

export default <ValidationCodesMap> {
	INVALID_CHARACTER: {
		isValid: false,
		code: CODES.INVALID_CHARACTER,
		message: 'An invalid character was found in the VIN',
	},
	INVALID_CHECKSUM: {
		isValid: false,
		code: CODES.INVALID_CHECKSUM,
		message: 'The checksum didn\'t match',
	},
	INVALID_LENGTH: {
		isValid: false,
		code: CODES.INVALID_LENGTH,
		message: 'Invalid VIN length. Should be 17 characters.',
	},
	SUCCESS: {
		isValid: true,
		code: CODES.SUCCESS,
		message: 'VIN is valid',
	},
}