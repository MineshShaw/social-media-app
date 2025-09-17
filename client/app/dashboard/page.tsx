"use client";

import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

export default function Dashboard() {

  const user = useSelector((state: RootState) => state.user.userData);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router])

  return (
    <div>Dashboard</div>
  )
}
