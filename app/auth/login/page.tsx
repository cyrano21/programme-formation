'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useRouter } from 'next/navigation';
import { Icons } from '../../../utils/icons';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '../../../components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login, signInWithGoogle, error, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error', err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      console.error('Google login error', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 animate-gradient-x">
      <div className="w-full max-w-md transform transition-all">
        <Card className="border-none shadow-xl backdrop-blur-sm bg-white/90">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center transform transition-all hover:scale-110">
                <Icons.LogIn className="h-7 w-7 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Sign in to access your account
            </CardDescription>
          </CardHeader>

          {error && (
            <div className="mx-6 mb-4 flex items-center p-3 text-sm rounded-lg bg-destructive/10 text-destructive animate-shake">
              <Icons.AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                      <Icons.Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      className="pl-10 transition-all border-gray-200 focus:border-primary/50 hover:border-gray-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Link
                      href="/auth/reset-password"
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-primary">
                      <Icons.Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary" />
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      placeholder="••••••••"
                      className="pl-10 transition-all border-gray-200 focus:border-primary/50 hover:border-gray-300"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full font-medium bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-all"
              >
                {isLoading ? (
                  <>
                    <Icons.Loader className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              disabled={isLoading}
              className="w-full hover:bg-gray-50 transition-colors border-gray-200"
            >
              <Icons.Google className="mr-2 h-5 w-5" />
              Google
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/auth"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Create one
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
