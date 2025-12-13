export const generateTimeSlots = (start: string, end: string, step = 120) => {
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };
  
    const fromMinutes = (m: number) =>
      `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  
    const result = [];
    for (let m = toMinutes(start); m <= toMinutes(end); m += step) {
      result.push(fromMinutes(m));
    }
  
    return result;
  }