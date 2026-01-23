function validateLicensePlate(licensePlate,caseNumber = 1,){
    const violations = [];
    let status = 'valid';

    // step 1: parse - extract region code and main plate
    let normalizedPlate = removeSeparators(licensePlate);
    let regionCode = ''; 
    let mainPart = '';

    if(normalizedPlate.length > 8 || normalizedPlate.length < 6){
        status = 'invalid';
        violations.push('Wrong character count')
    } else if(normalizedPlate.length === 8){

        regionCode = normalizedPlate.slice(0,2);
        mainPart = normalizedPlate.slice(2,8);
    } else if(normalizedPlate.length === 6){
        mainPart = normalizedPlate;
    }


    // step 2: validate in order (collect violations)
    if(regionCode){
        if(regionCode !== regionCode.toUpperCase() || regionCode.length !== 2 || !isLetter(regionCode)){
            status = "invalid";
            violations.push('Invalid region code');
        }
    }

    if(mainPart.length !== 6){
        status = 'invalid'
        violations.push('Wrong character count')
    }

    if(countLetters(normalizedPlate) < 2){
        status = 'invalid'
        violations.push('Insufficient letters')
    }

    if(countDigits(normalizedPlate) < 2){
        status = 'invalid'
        violations.push('Insufficient digits')
    }

    // separators: only spaces, hyphen, and underscores allowed
    if(!isValidInput(licensePlate)){
        status = 'invalid'
        violations.push('Invalid characters')
    }

    if(countDigits(mainPart).length < 2){
        status = 'invalid';
        violations.push('Insufficient digits');
    }

    // step 3: format output based on validity
    if(status === 'valid'){
        return `Case: ${caseNumber}\n` + `Plate: ${chunkAndJoin(normalizedPlate)}\n` + `Status: ${status}`;
    } else if(status === 'invalid'){
        return `Case: ${caseNumber}\n` + `Plate: ${chunkAndJoin(normalizedPlate)}\n` + `Status: ${status}\n` + `Reasons: ${violations.join('')}`;
    }

}


function chunkAndJoin(str, size=3){
    const chunks = [];

    for (let i = 0; i < str.length; i += size){
        chunks.push(str.slice(i, i + size));
    }

    return chunks.join('-').toUpperCase();
}

function removeSeparators(str){
    return str.split(' ').join('').split('-').join('').split('_').join('');

}

function isLetter(char){
    return (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
}

function isDigit(char){
    return char >= '0' && char <= '9';
}

function isAlphanumeric(char){
    return char.split('').every(c => (c >= 'A' && c <= 'Z') 
    || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9'));

}

function countLetters(str){
    return str.split('').filter(char => char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z').length;
}

function countDigits(str){
    return str.split('').filter(char => char >= '0' && char <= '9').length;
}

function isValidInput(str){
    const allowedSpecialCharacters = new Set([' ', '-', '_']);
    return str.split('').every(char => char >= 'A' && char <= 'Z' || char >= 'a' && char <= 'z' || char >= '0' && char <= '9' || allowedSpecialCharacters.has(char));
}


console.log(validateLicensePlate('ABC-DC_QC ', 1));