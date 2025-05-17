import React, { useState } from 'react';
import { useAuth } from '../lib/auth-context';
import RegisterForm from '../components/RegisterForm';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [redirecting, setRedirecting] = useState(false);
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated() && !redirecting) {
    setRedirecting(true);
    router.push('/host/dashboard');
    return null;
  }
  
  const handleRegisterSuccess = () => {
    router.push('/host/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Create Your Account</h1>
          
          <RegisterForm onSuccess={handleRegisterSuccess} />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
