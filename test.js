const test = require('tape-catch')
const { validate, validateSync, makeValidationObject } = require('./index.js')

const success = makeValidationObject('SUCCESS')
const invalidCharacter = makeValidationObject('INVALID_CHARACTER')
const invalidChecksum = makeValidationObject('INVALID_CHECKSUM')

test('no invalid characters in vin', t => {
	t.deepEqual(validateSync('1mIag12cx7m055891'), invalidCharacter) //I is invalid
	t.deepEqual(validateSync('1mOag12cx7m055891'), invalidCharacter) //O is invalid
	t.deepEqual(validateSync('1mQag12cx7m055891'), invalidCharacter) //Q is invalid

	t.end()
})

test('invalid checksum', t => {
	t.deepEqual(validateSync('1fvhbxb592hj75909'), invalidChecksum)
	t.deepEqual(validateSync('1fvhbnxb592hj75909'), invalidChecksum)
	t.deepEqual(validateSync('5vcd6jf38h207075'), invalidChecksum)
	t.deepEqual(validateSync('1m2k195c51m017395'), invalidChecksum)

	t.end()
})

test('valid vins return success', t => {
	t.deepEqual(validateSync('1m2ag12cx7m055891'), success)
	t.deepEqual(validateSync('1HTMMAANX4H670946'), success)
	t.deepEqual(validateSync('1HSZDGFR5JH548838'), success)
	t.deepEqual(validateSync('2HSCUAPR59C081683'), success)
	t.deepEqual(validateSync('5VCACLLE6BH212929'), success)
	t.deepEqual(validateSync('5VCACLLE6BH212929'), success)
	t.deepEqual(validateSync('5VCACLLE6BH212929'), success)
	t.deepEqual(validateSync('1fvmbga823hk75033'), success)
	t.deepEqual(validateSync('1HTSDAAN3XH634866'), success)
	t.deepEqual(validateSync('JHBSG2213G1S10058'), success)
	t.deepEqual(validateSync('5vcdc6lf44h200420'), success)
	t.deepEqual(validateSync('5VCDC6MF07H205309'), success)
	t.deepEqual(validateSync('1fvhbxbs92hj75909'), success)
	t.deepEqual(validateSync('11111111111111111'), success)

	t.end()
})

test('X checksum character is handled', t => {
	t.deepEqual(validateSync('1M8GDM9AXKP042788'), success)

	t.end()
})