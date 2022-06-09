export const envToNumber = (value: string): number => parseInt(value, 10);

export const envToBoolean = (value: string): boolean => value === 'true';
