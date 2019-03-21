module.exports = {
	INVALID_CHARACTER: {
		isValid: false,
		code: 'INVALID_CHARACTER',
		message: 'An invalid character was found in the VIN',
	},
	INVALID_CHECKSUM: {
		isValid: false,
		code: 'INVALID_CHECKSUM',
		message: 'The checksum didn\'t match',
	},
	INVALID_LENGTH: {
		isValid: false,
		code: 'INVALID_LENGTH',
		message: 'Invalid VIN length. Should be 17 characters.',
	},
	SUCCESS: {
		isValid: true,
		code: 'SUCCESS',
		message: 'VIN is valid',
	},
}