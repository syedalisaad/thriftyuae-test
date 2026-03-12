export const RAMADAN_2026 = {
  START: new Date("2026-02-18"),
  END: new Date("2026-03-19"),
  WORK_START: 9, 
  WORK_END: 15, 
};

export function validateBooking(date: string, time: string) {
  const selectedDate = new Date(date);
  
  const isRamadan = selectedDate >= RAMADAN_2026.START && selectedDate <= RAMADAN_2026.END;

  if (isRamadan) {
  }
  
  return { valid: true };
}