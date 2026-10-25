// ============================================
// GET TOKEN FROM STORAGE
// ============================================

import type { UserTypes } from "../types";

export const getTokenFromStorage = (): string | null => {
  try {
    const token = localStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token from storage:", error);
    return null;
  }
};

// ============================================
// GET USER FROM STORAGE
// ============================================

export const getUserFromStorage = (): UserTypes | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;

    const user = JSON.parse(userStr);
    return user;
  } catch (error) {
    console.error("Error retrieving user from storage:", error);
    return null;
  }
};

// ============================================
// OPTIONAL: User type definition
// ============================================
