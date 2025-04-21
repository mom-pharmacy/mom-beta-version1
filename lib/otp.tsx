let generatedOTP = '';
export const sendOtp = async (email: string): Promise<void> => {
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`📧 OTP for ${email}: ${generatedOTP}`);
};
export const sendSmsOtp = async (phone: string): Promise<void> => {
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`📱 OTP for ${phone}: ${generatedOTP}`);
};
export const verifyOtp = (inputOtp: string): boolean => {
  return inputOtp === generatedOTP;
};