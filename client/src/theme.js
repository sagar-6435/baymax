const lightTheme = {
  primary: '#FFD600',
  primaryLight: '#FFEA00',
  black: '#000000',
  darkGray: '#171717',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  border: '#E5E5E5',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
};

const darkTheme = {
  primary: '#FACC15',
  primaryLight: '#FDE68A',
  black: '#FFFFFF',
  darkGray: '#F3F4F6',
  white: '#111827',
  lightGray: '#1F2937',
  border: '#374151',
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
};

export const colors = { ...lightTheme };

export const applyTheme = (isDarkMode) => {
  const nextTheme = isDarkMode ? darkTheme : lightTheme;

  Object.keys(colors).forEach((key) => {
    colors[key] = nextTheme[key];
  });
};

export const globalStyles = {
  cardRadius: 12,
  buttonRadius: 12,
};
