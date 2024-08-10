"use client";
import { create } from "zustand";

interface authState {
    isAuthenticatad: Boolean,
    loading: Boolean,
    user: any,
    ToogleAuth: (by:Boolean) => void, // Void instead of Boolean
    ToogleLoading: (by:Boolean) => void, // Void instead of Boolean
}
  
export const useAuthenticateState = create<authState>()((set) => ({
    isAuthenticatad: false,
    loading: false,
    user: {},
    ToogleAuth: (by) => set((state) => ({ isAuthenticatad: by })), // Removed incorrect 'return'
    ToogleLoading: (by) => set((state) => ({ loading: by })), // Removed incorrect 'return'
}));
