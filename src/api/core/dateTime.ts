class DateTime {
  date: Date;

  constructor(initialDate: Date = new Date()) {
    this.date = new Date(initialDate); // Initialize with the provided date or current date
  }

  // Static method to return a new DateTime instance for the current date
  static now(): DateTime {
    return new DateTime();
  }

  // Method to add minutes
  addMinutes(minutes: number): this {
    this.date.setMinutes(this.date.getMinutes() + minutes);
    return this; // Return the instance for chaining
  }

  // Method to add seconds
  addSeconds(seconds: number): this {
    this.date.setSeconds(this.date.getSeconds() + seconds);
    return this; // Return the instance for chaining
  }

  // Method to add month
  addMonth(month: number): this {
    this.date.setMonth(this.date.getMonth() + month);
    return this; // Return the instance for chaining
  }

  // Method to add years
  addYears(years: number): this {
    this.date.setFullYear(this.date.getFullYear() + years);
    return this; // Return the instance for chaining
  }

  // Method to add milliseconds
  addMilliseconds(milliseconds: number): this {
    this.date.setTime(this.date.getTime() + milliseconds);
    return this; // Return the instance for chaining
  }

  // Get the current date as a formatted string
  toString(): string {
    return this.date.toISOString();
  }

  // Get the raw Date object
  getDate(): Date {
    return this.date;
  }

  // Get the milliseconds since epoch
  get millisecondsSinceEpoch(): number {
    return this.date.getTime();
  }

  // Method to get current time in IST (UTC +5:30) in milliseconds
  getIstTimeMilliseconds(): number {
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istTimeInMillis = this.date.getTime() + istOffset;
    return istTimeInMillis;
  }

  readable_ts(): string {
    const now = this.date;

    // Get month names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract date components
    const month = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();

    // Add suffix for the day
    const dateSuffix = (date: number): string => {
      if (date % 10 === 1 && date !== 11) return `${date}st`;
      if (date % 10 === 2 && date !== 12) return `${date}nd`;
      if (date % 10 === 3 && date !== 13) return `${date}rd`;
      return `${date}th`;
    };

    const formattedDate = `${month} ${dateSuffix(date)}, ${year}`;

    // Format time
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${amPm}`;

    return `${formattedDate} at ${formattedTime}`;
  }

  isAdult(): boolean {
    const birthDate = this.date;
    const today = new Date(); // Get current date

    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate age

    // Check if birthday has passed this year
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--; // Adjust age if birthday hasn't occurred yet this year
    }

    return age >= 18; // Return true if 18 or older, false otherwise
  }

  static formatDateRange(start: string, end: string): string {
    const parseDate = (dateStr: string): Date => new Date(dateStr);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const startDate = parseDate(start);
    const endDate = parseDate(end);

    const sDay = startDate.getDate();
    const sMonth = months[startDate.getMonth()];
    const sYear = startDate.getFullYear();

    const eDay = endDate.getDate();
    const eMonth = months[endDate.getMonth()];
    const eYear = endDate.getFullYear();

    // Check same year
    if (sYear === eYear) {
      if (sMonth === eMonth) {
        return `${sMonth} ${sDay} to ${eDay}, ${sYear}`;
      } else {
        return `${sMonth} ${sDay} to ${eMonth} ${eDay}, ${sYear}`;
      }
    } else {
      return `${sMonth} ${sDay}, ${sYear} to ${eMonth} ${eDay}, ${eYear}`;
    }
  }
}

export default DateTime;
