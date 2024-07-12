import { format, parseISO, isSameDay } from 'date-fns'

// Function to generate hours array from "00" to "24"
function getHoursArray() {
  const hoursArray = Array.from({ length: 24 }, (_, i) => {
    // Create a date object representing the start of the day plus i hours
    const date = new Date(0, 0, 0, i)
    // Format the hours to a two-digit string
    return {time: format(date, 'hh:mm a'), bookingStatus: "free"}
  })
  return hoursArray
}

export function updateBookingStatus(timeSlots, bookings, selectedDate) {
    const updatedTimeSlots = timeSlots.map(slot => ({ ...slot, bookingStatus: 'free' }));

  bookings.forEach(booking => {
    const bookingDate = parseISO(booking.from_time);
    if (!isSameDay(bookingDate, selectedDate)) {
      return;
    }

    const bookingHour = format(bookingDate, 'hh:mm a');
    console.log("booking hour", bookingHour);

    // Find the index of the matching slot
    const slotIndex = updatedTimeSlots.findIndex(slot => slot.time === bookingHour);
    if (slotIndex !== -1) {
      updatedTimeSlots[slotIndex].bookingStatus = 'booked';
    }
  });

  console.log("updated time slots", updatedTimeSlots);
  return updatedTimeSlots;
  }


// Call the function and log the result
export const hoursArray = getHoursArray()

console.log(hoursArray)