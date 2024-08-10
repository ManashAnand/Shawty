"use client";
import { create } from "zustand";

interface authState {
    isAuthenticatad: Boolean,
    loading: Boolean,
    user: any,
    ToogleAuth: (by:Boolean) => void, 
    ToogleLoading: (by:Boolean) => void, 
    ToogleUser: (userData: any) => void;
    
}
  
export const useAuthenticateState = create<authState>()((set) => ({
    isAuthenticatad: false,
    loading: false,
    user: {},
    ToogleUser: (userData) => set((state) => ({user : {...state.user,...userData}})),
    ToogleAuth: (by) => set((state) => ({ isAuthenticatad: by })), // Removed incorrect 'return'
    ToogleLoading: (by) => set((state) => ({ loading: by })), // Removed incorrect 'return'
}));
