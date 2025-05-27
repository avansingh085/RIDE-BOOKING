const otpMap = new Map(); 
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function saveOTP(email, otp) {
  otpMap.set(email, otp);
}

function verifyOTP(email, otp) {
  return otpMap.get(email) === otp;
}

function removeOTP(email) {
  otpMap.delete(email);
}

export default  { generateOTP, saveOTP, verifyOTP, removeOTP };
