// Test file to check your implementation against sample inputs
import { validateLicensePlate } from './licensePlateValidator.js';

const testCases = [
    'CA-ABC123',
    'XYZ789',
    '12-AB34CD',
    'GH_1A2B3C',
    'AB-12.34.56',
    'TX ABC1'
];

console.log('Testing your implementation:\n');
testCases.forEach((plate, index) => {
    console.log(`Test ${index + 1}: ${plate}`);
    try {
        console.log(validateLicensePlate(1, plate));
    } catch (error) {
        console.log(`ERROR: ${error.message}`);
    }
    console.log('---');
});
