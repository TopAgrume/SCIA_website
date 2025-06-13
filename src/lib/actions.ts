'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { prisma } from './prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { errorMessage: 'Invalid credentials.' };
        default:
          return { errorMessage: 'Something went wrong.' };
      }
    }
    throw error;
  }
}

export async function register(
  prevState: { errorMessage: string },
  formData: FormData,
): Promise<{ errorMessage: string, successMessage: string }> {
  try {
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const schema = z.object({
      username: z.string().min(2, 'Username must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
    });

    const validated = schema.safeParse({ username, email, password, confirmPassword });

    if (!validated.success) {
      return { errorMessage: validated.error.errors[0].message, successMessage: '' };
    }

    const existingUsername = await prisma.users.findFirst({
      where: { username },
    });

    if (existingUsername) {
      return { errorMessage: 'Username already exists.', successMessage: '' };
    }

    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { errorMessage: 'Email already exists.', successMessage: '' };
    }

    if (password !== confirmPassword) {
      return { errorMessage: 'Passwords do not match.', successMessage: '' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'VISITOR',
        is_scia: false
      },
    });

    return { errorMessage: '', successMessage: 'Account created successfully.' };
  } catch (error) {
    if (error instanceof AuthError) {
      return { errorMessage: 'Authentication failed after registration.', successMessage: '' };
    }

    console.error('Registration error:', error);
    return { errorMessage: 'Something went wrong during registration.', successMessage: '' };
  }
}