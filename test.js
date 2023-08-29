const test = require('tape-catch')
const { validate, validateAndThrowOnInvalid } = require('./index')
const validationCodes = require('./validation-codes')

const success = validationCodes.SUCCESS
const invalidCharacter = validationCodes.INVALID_CHARACTER
const invalidChecksum = validationCodes.INVALID_CHECKSUM
const invalidLength = validationCodes.INVALID_LENGTH

test('no invalid characters in vin', t => {
	t.deepEqual(validate('1mIag12cx7m055891'), invalidCharacter) //I is invalid
	t.deepEqual(validate('1mOag12cx7m055891'), invalidCharacter) //O is invalid
	t.deepEqual(validate('1mQag12cx7m055891'), invalidCharacter) //Q is invalid

	t.throws(() => validateAndThrowOnInvalid('1mQag12cx7m055891'))

	t.end()
})

test('invalid checksum', t => {
	t.deepEqual(validate('1fvhbxb592hj75909'), invalidChecksum)
	t.deepEqual(validate('1m2k195c51m017395'), invalidChecksum)

	t.throws(() => validateAndThrowOnInvalid('1m2k195c51m017395'))

	t.end()
})

test('invalid length', t => {
	t.deepEqual(validate('1fvhbnxb592hj75909'), invalidLength)
	t.deepEqual(validate('5vcd6jf38h207075'), invalidLength)

	t.throws(() => validateAndThrowOnInvalid('5vcd6jf38h207075'))

	t.end()
})

test('valid vins return success', t => {
	t.deepEqual(validate('1m2ag12cx7m055891'), success)
	t.deepEqual(validate('1HTMMAANX4H670946'), success)
	t.deepEqual(validate('1HSZDGFR5JH548838'), success)
	t.deepEqual(validate('2HSCUAPR59C081683'), success)
	t.deepEqual(validate('5VCACLLE6BH212929'), success)
	t.deepEqual(validate('1fvmbga823hk75033'), success)
	t.deepEqual(validate('1HTSDAAN3XH634866'), success)
	t.deepEqual(validate('JHBSG2213G1S10058'), success)
	t.deepEqual(validate('5vcdc6lf44h200420'), success)
	t.deepEqual(validate('5VCDC6MF07H205309'), success)
	t.deepEqual(validate('1fvhbxbs92hj75909'), success)
	t.deepEqual(validate('11111111111111111'), success)
	t.deepEqual(validate('11111111111111111 '), success) //should trim spaces

	t.doesNotThrow(() => validateAndThrowOnInvalid('11111111111111111'))

	t.end()
})

test('X checksum character is handled', t => {
	t.deepEqual(validate('1M8GDM9AXKP042788'), success)
	t.doesNotThrow(() => validateAndThrowOnInvalid('1M8GDM9AXKP042788'))

	t.end()
})
