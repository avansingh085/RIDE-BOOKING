class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // Inherit the message property from Error

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // Helpful for frontend handling
        this.isOperational = true; // Distinguishes known errors vs programming bugs

        Error.captureStackTrace(this, this.constructor); // Cleans up the stack trace
    }
}
export default AppError;
