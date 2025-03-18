// Unlike toHex, this is slightly faster than anything I could come up with.
export const toBinary = (byte: number): string => byte.toString(2).padStart(8, '0');