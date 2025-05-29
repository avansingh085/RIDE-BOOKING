export const emailBookingFormate=(bookingId,trackingUrl)=>{ return (`
    <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 8px; padding: 24px; background-color: #f9f9f9;">
      <h2 style="color: #1e88e5; text-align: center;">🚗 Drivee Booking Confirmed</h2>
      <p style="font-size: 16px; color: #333;">Hi there,</p>
      <p style="font-size: 16px; color: #333;">
        Your ride has been <strong>successfully booked</strong> with Drivee!
      </p>
      <div style="background: #ffffff; padding: 16px; border-radius: 6px; border: 1px solid #ccc; margin: 16px 0;">
        <p style="margin: 0; font-size: 16px;">
          <strong>Booking ID:</strong> <span style="color: #1e88e5;">${bookingId}</span>
        </p>
      </div>
      <p style="font-size: 16px; color: #333;">You can track the status of your booking here:</p>
      <p style="text-align: center; margin: 20px 0;">
        <a href="${trackingUrl}" target="_blank" style="display: inline-block; background-color: #1e88e5; color: white; padding: 12px 24px; border-radius: 4px; text-decoration: none; font-weight: bold;">
          Track Your Ride
        </a>
      </p>
      <p style="font-size: 14px; color: #777;">If you did not make this booking, please contact our support team immediately.</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      <p style="font-size: 14px; color: #555; text-align: center;">Thank you for choosing Drivee!<br/>– The Drivee Team</p>
    </div>
  `)};

  export const  emailOtpVerificationFormate=()=>{
    return( `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Welcome to Drivee!</h2>
     
      <p>You have successfully registered.</p>
      <p>If you did not request this, please ignore this email.</p>
      <br/>
      <p>Thank you,<br/>The Drivee Team</p>
    </div>
  `)
  }
