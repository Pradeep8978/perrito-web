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
const validateRoomNumber = (roomnumber) => {
    let errorMessage;
    if (!roomnumber) {
        errorMessage = "Please Enter Room Number"
    }
    return errorMessage
}

const validateDiscription =(value)=>{
    let errorMessage;
    if (!value) {
        errorMessage = "Please Enter Description";
    }
    return errorMessage;
}
const validateLabel =(value)=>{
    let errorMessage;
    if (!value) {
        errorMessage = "Please Enter Label";
    }
    return errorMessage;
}
const validateAddresss = (value) => {
    let errorMessage;
    if (!value) {
        errorMessage = "Please Enter Seller Address"
    }
    return errorMessage
}
const validateSellerName = (name) => {
    let errorMessage;
    if (!name) {
        errorMessage = "Please Enter Seller Name"
    }
    return errorMessage
}
const validateDimension = (value) => {
    let errorMessage;
    if (!value) {
        errorMessage = "Please Enter Dimension of Product or item"
    }
    return errorMessage
}
export const validationConfig = {
    name: validateName,
    discription:validateDiscription,
    // room_number: validateRoomNumber,
    discription:validateDiscription,
    label:validateLabel,
    dimesions:validateDimension,
    sellerAddress:validateAddresss,
    sellername:validateSellerName,
    sellerEmail: validateEmail,

}