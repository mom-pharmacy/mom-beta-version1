export const isEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  
  export const isPhone = (value: string) =>
    /^[6-9]\d{9}$/.test(value);