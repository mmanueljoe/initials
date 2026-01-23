function validateCredential(str){

    if(str.length === 0) return "Credential is required";

    // how to store validation errors?
    let isSecure = true;
    const errors = [];

    // must contain at exactly one ":"
    if(str.split(":").length !== 2 ){
        isSecure = false;
        errors.push("Credential must contain at exactly one \":\"");
    }

    // ===== username rules: before  the :=====
    // must be between 5 and 15 characters(inclusive)
    const username = str.split(":")[0];
    if(username.length < 5 || username.length > 15){
        isSecure = false;
        errors.push("Username must be between 5 and 15 characters(inclusive)");
    }



    // can only contain lowercase letters(a-z) and digits(0-9)
    if(!isValidUsername(username)){
        isSecure = false;
        errors.push("Username can only contain lowercase letters(a-z) and digits(0-9)");
    }


    // cannot start or end with a digit
    if(username[0] >= '0' && username[0] <= '9' || username[username.length - 1] >= '0' && username[username.length - 1] <= '9'){
        isSecure = false;
        errors.push("Username cannot start or end with a digit");
    }


    // ===== password rules: after the :=====
    // minimum length of 8 characters long
    const password = str.split(":")[1];
    if(password.length < 8){
        isSecure = false;
        errors.push("Password must be at least 8 characters long");
    }

    // must contain at least one uppercase letter(A-Z), one lowercase letter(a-z), and one digit(0-9)
    if(!hasRequiredCharacters(password)){
        isSecure = false;
        errors.push('Password must contain at least one uppercase letter(A-Z), lowercase letter(a-z) and one digit(0-9)');
    }

    // must contain at least one special character from this set: !, @, #, $
    if(!password.includes('!') && !password.includes('@') && !password.includes('#') && !password.includes('$')){
        isSecure = false;
        errors.push("Password must contain at least one special character from this set: !, @, #, $");
    }


    // output if an whether an entry is secure or insecure and output reasons
    if(isSecure){
        return "secure";
    }else {
        // return insecure and reasons why correctly formatted
        return 'Status: insecure' + '\n' + 'Reasons: ' +  '\n'  + errors.join('\n');
    }
}

function isValidUsername(str){
    return [...str].every(char => (char >= 'a' && char <= 'z') 
        || (char >= '0' && char <= '9')
    );
}

function  hasRequiredCharacters(str){
    let hasUppercase = false;
    let hasLowercase = false;
    let hasDigit = false;

    for(const char of str){
        if(char >= 'A' && char <= 'Z'){
            hasUppercase = true;
        } else if(char >= 'a' && char <= 'z'){
            hasLowercase = true;
        } else if(char >= '0' && char <= '9'){
            hasDigit = true;
        }
    }

    console.log(hasDigit);
    console.log(hasLowercase);

    
    return hasUppercase && hasLowercase && hasDigit;
}

// console.log(validateCredential("admin:noDigits@!"));


function validateSerialNumber(caseNumber, serialNumber){
    let category = '';
    const missingRequirements = [];
    const metRequirements = [];


    // must be exactly 10 characters long
    if(serialNumber.length === 10){
        metRequirements.push("Length");
    } else {
        missingRequirements.push("Length");
    }

    // must start with an uppercase letter (A-Z)
    if(serialNumber[0] < 'A' || serialNumber[0] > 'Z'){
        missingRequirements.push("Prefix");
    } else {
        metRequirements.push("Prefix");
    }

    // contains at least four digits (0-9)
    if(serialNumber.split('').filter(char => char >= '0' && char <= '9').length >= 4){
        metRequirements.push("Numeric");
    } else {
        missingRequirements.push("Numeric");
    }

    //  end with a special "region code" character: #, * , or &
    if(serialNumber[serialNumber.length - 1] !== '#' && serialNumber[serialNumber.length - 1] !== '*' && serialNumber[serialNumber.length - 1] !== '&'){
        missingRequirements.push("Suffix");
    } else {
        metRequirements.push("Suffix");
    }

    // contain no lowercase letters (a-z)
    if(serialNumber.split('').filter(char => char >= 'a' && char <= 'z').length === 0){
        metRequirements.push("Cleanliness");
    } else {
        missingRequirements.push("Cleanliness");
    }


    if(metRequirements.length === 5){
        category = 'Premium';
    } else if(serialNumber.length === 10 && metRequirements.length >= 2){
        category = 'Standard';
    } else if(serialNumber.length !== 10 && metRequirements.length < 3){
        category = 'Reject';
    }

    if(category === 'Premium'){
        return `Case: ${caseNumber} \n` + `Category: ${category} \n` + `Missing: none`;
    } else if(category === 'Standard'){
        return `Case: ${caseNumber} \n` + `Category: ${category} \n` + 'Missing: ' + missingRequirements.join('\n');
    } else if(category === 'Reject'){
        return `Case: ${caseNumber} \n` + `Category: ${category} \n` + 'Missing: ' + missingRequirements.join('\n');
    }


}

// console.log(validateSerialNumber("1", "ABCDEFGHIJ"));
// console.log(validateSerialNumber("2", "A12345678#"));


function validateLicensePlate(caseNumber,licensePlate){
    let status = '';
    const violations = [];

    // character count: must have exactly 6 alphanumeric characters(after region code)
        let plateArr = licensePlate.split('-');
        console.log(plateArr);
        console.log(plateArr.length);
        if(plateArr.length >= 2){
            let main = plateArr[1];

            console.log(main);
            if(main.length !== 6){
                status = 'invalid'; 
                violations.push('wrong character count');
            }
        }

        if(plateArr.length === 1){
            let main = plateArr[0];


            console.log(main.length)
            if(main.length !== 6){
                status = 'invalid'; 
                violations.push('wrong character count');
            }
        }


    // region code:if region code present, must be exactly 2 uppercase letters
    if(plateArr.length > 1){
        let regionCode = plateArr[0];
        if(regionCode.length !== 2 || regionCode.toLowerCase() === regionCode){
            status = 'invalid';
            violations.push('invalid region code');
        }
    }


    // separators: only spaces, hyphen, and underscores allowed
    if(licensePlate.includes('-') || licensePlate.includes('_')){
        status = 'valid';
    }else{
        status = 'invalid';
        violations.push('invalid characters')
    }

    // letter count: must have at least 2 letters in the main part
    if(plateArr.length === 2){
        let count = plateArr[1].filter(char => char >= 'a' && char <= 'z'  ||  char >= 'A' && char <= 'Z' ).length >= 2;
       if(!count){
        status = 'invalid'
        violations.push('insufficient letters');
       }
    } 

    // digit count: must have at least 2 digits in the main part
    if(plateArr.length === 2){
        let count = licensePlate.split('-')[1].filter(char => char >= '0' && char <= '9' ).length >= 2;
       if(!count){
        status = 'invalid'
        violations.push('insufficient letters');
       }
    }
    

    // case: letters can be any in input but must be uppercase in output


    if(status === 'valid'){
        return `Case: ${caseNumber}\n` + `Plate: ${licensePlate.toUpperCase()}\n` + `Status: ${status}`;
    } else if(status === 'invalid'){
        return `Case: ${caseNumber}\n` + `Plate: ${licensePlate.toUpperCase()}\n` + `Status: ${status}\n` + `Reasons: `;
    }


    return status;
}

console.log(validateLicensePlate(1,'CA-ABC'));