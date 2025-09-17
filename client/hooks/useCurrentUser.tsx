"use client";

import { setUserData } from '@/redux/userSlice';
import { getCurrentUser } from '@/lib/auth';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function useCurrentUser() {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await getCurrentUser();
            dispatch(setUserData(response));
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    }

    fetchUser();
  }, [])
}
