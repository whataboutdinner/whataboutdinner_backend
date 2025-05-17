import React, { useState, useRef, useEffect } from 'react';

// Define color variables consistent with the rest of the application
const primaryColor = 'blue-500';
const primaryHoverColor = 'blue-600'; // Added missing variable
const textColor = 'gray-800';
const subtleTextColor = 'gray-600'; // Added missing variable
const focusRingColor = 'blue-400';
const accentColor = 'gray-200'; // For borders
const whiteColor = 'white';
const errorColor = 'yellow-700';
const errorBgColor = 'yellow-100';
const errorBorderColor = 'yellow-400';

interface OtpInputProps {
  onOtpSubmit: (otp: string) => void;
  isLoading: boolean;
  phoneNumber: string; // To display to the user
  resendOtp: () => void; // Function to resend OTP
}

const OtpInput: React.FC<OtpInputProps> = ({ onOtpSubmit, isLoading, phoneNumber, resendOtp }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false; // Only allow numbers

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      alert('Please enter a 6-digit OTP.');
      return;
    }
    onOtpSubmit(enteredOtp);
  };

  return (
    <div className={`bg-${whiteColor} p-6 rounded-lg shadow-md border border-${accentColor} max-w-md mx-auto mt-8`}>
      <h3 className={`text-xl font-semibold text-${textColor} mb-2 text-center`}>Enter Verification Code</h3>
      <p className={`text-sm text-${subtleTextColor} mb-6 text-center`}>
        A 6-digit code has been sent to your phone number ending in ...{phoneNumber.slice(-4)}.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center space-x-2 mb-6">
          {otp.map((data, index) => {
            return (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength={1}
                className={`w-12 h-12 text-center text-xl border border-${accentColor} rounded-md focus:outline-none focus:ring-2 focus:ring-${focusRingColor} focus:border-${focusRingColor}`}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
                ref={(el) => (inputRefs.current[index] = el)}
                disabled={isLoading}
              />
            );
          })}
        </div>
        <div className="mb-6 text-center">
            <p className={`text-sm text-${subtleTextColor}`}>
                Didn't receive the code?{' '}
                <button 
                    type="button" 
                    onClick={resendOtp} 
                    className={`font-medium text-${primaryColor} hover:text-${primaryHoverColor} disabled:opacity-50`}
                    disabled={isLoading}
                >
                    Resend OTP
                </button>
            </p>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-${whiteColor} bg-${primaryColor} hover:bg-${primaryHoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${focusRingColor} disabled:opacity-50`}
          >
            {isLoading ? 'Verifying...' : 'Verify & Proceed'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OtpInput;

