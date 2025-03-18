
// Define the theme for the application

// Colors
export const colors = {
  primary: '#6366f1', // Indigo
  primaryDark: '#4f46e5',
  primaryLight: '#a5b4fc',
  secondary: '#f59e0b', // Amber
  secondaryDark: '#d97706',
  secondaryLight: '#fcd34d',
  success: '#10b981', // Emerald
  danger: '#ef4444', // Red
  warning: '#f59e0b', // Amber
  info: '#3b82f6', // Blue
  
  white: '#ffffff',
  black: '#000000',
  grey: '#9ca3af',
  lightGrey: '#e5e7eb',
  
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  
  background: '#f9fafb',
  border: '#e5e7eb',
  
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

// Font sizes
export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

// Shadows
export const shadows = {
  small: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Border radius
export const borderRadius = {
  small: 4,
  medium: 8,
  large: 12,
  round: 9999,
};
