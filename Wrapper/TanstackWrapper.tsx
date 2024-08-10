"use client";

import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'
  
  const queryClient = new QueryClient()
  
  export default function TanstackWrapper({children}:any) {
    return (
      <QueryClientProvider client={queryClient}>
            {children}
      </QueryClientProvider>
    )
  }