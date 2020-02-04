export const validateName = (value) => {
    let errorMessage;
    if (!value) {
        errorMessage = "Please Enter Name"
    }
    return errorMessage;
}

const validateEmail = (value) => {
    let errorMessage;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!value) {
        errorMessage = "Please enter email"
    }
    else if (!emailRegex.test(value)) {
        errorMessage = "Plese Provide correct Email"
    }
    return errorMessage;
}
const validatePhoneNumber = (num) => {
    let errorMessage;
    const numRegex = /^\d{10}$/
    if (!num) {
        errorMessage = "Please enter Phone Number"
    }
    else if (!numRegex.test(num)) {
        errorMessage = "Enter Only 10 Digit Number"
    }
    return errorMessage;
}
const validateAlternatePhoneNumber = (num) => {
    let errorMessage;
    const numRegex = /^\d{10}$/
    if (!num) {
        errorMessage = "Please enter Phone Number"
    }
    else if (!numRegex.test(num)) {
        errorMessage = "Enter only 10 digit number"
    }
    return errorMessage;
}

const validateRoomNumber = (roomnumber) => {
    let errorMessage;
    if (!roomnumber) {
        errorMessage = "Please Enter Room Number"
    }
    return errorMessage
}
const validateAddressLine1 = (address) => {
    let errorMessage;
    if (!address) {
        errorMessage = "Please Provide Address"
    }
    return errorMessage
}
const validateAddressline2 = (address) => {
    let errorMessage;
    if (!address) {
        errorMessage = "Please Provide Address"
    }
    return errorMessage
}
const validateCity = (city) => {
    let errorMessage;
    if (!city) {
        errorMessage = "Please Provide City Name"
    }
    return errorMessage
}
const validatePincode = (pincode) => {
    let errorMessage;
    const numRegex = /^\d{6}$/
    if (!pincode) {
        errorMessage = "Please Enter Area Pincode"
    }
    else if (!numRegex.test(pincode)) {
        errorMessage = "Enter Enter Valid Pincode"
    }
    return errorMessage
}
const validateDateOfJoining = (date) => {
    let errorMessage;
    if (!date) {
        errorMessage = "Please Enter Date Of Joining"
    }
    return errorMessage
}

const validateState = state => {
    let errorMessage;
    if (!state) {
        errorMessage = "Please Select State";
    }
    return errorMessage;
}

export const validationConfig = {
    name: validateName,
    email: validateEmail,
    phone: validatePhoneNumber,
    alternate_phone: validateAlternatePhoneNumber,
    room_number: validateRoomNumber,
    address_line_1: validateAddressLine1,
    address_line_2: validateAddressline2,
    city: validateCity,
    pincode: validatePincode,
    date_of_joining: validateDateOfJoining,
    state: validateState
}