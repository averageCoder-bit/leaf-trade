// --- Sanitization Utilities ---
export const sanitizeName = (value: string): string => {
  return value.replace(/[^A-Za-z\s.\-]/g, "");
};

export const sanitizeUsername = (value: string): string => {
  return value.replace(/[^A-Za-z0-9_]/g, "");
};

export const sanitizePhone = (value: string): string => {
  return value.replace(/[^0-9+]/g, "");
};

export const sanitizeEmail = (value: string): string => {
  return value.replace(/[^A-Za-z0-9@._\-+]/gu, "");
};

export const sanitizePassword = (value: string): string => {
  return value.replace(/[^A-Za-z0-9!@#$%^&*(),.?":{}|<>_\-+=]/g, "");
};

// --- Format Check Utilities ---
export const checkEmailValidity = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const checkPhoneValidity = (phone: string): boolean => {
  return /^(09\d{9}|\+639\d{9}|639\d{9})$/.test(phone);
};

export const checkUsernameValidity = (username: string): boolean => {
  return /^[A-Za-z0-9_]{3,30}$/.test(username);
};

export const evaluatePasswordStrength = (password: string) => {
  return {
    upper: /[A-Z]/.test(password),
    num: /[0-9]/.test(password),
    lower: /[a-z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password),
    len: /^.{15,}$/.test(password),
  };
};
