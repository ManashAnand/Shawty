"use client";
import { useRedirectTo } from '@/hooks/useRediirectHook';
import React, { useEffect } from 'react'

const Dashboard = () => {
   
  useRedirectTo();
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard