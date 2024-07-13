import { format, parseISO, isSameDay, parse, isValid } from "date-fns";

// Function to generate hours array from "00" to "24"
function getHoursArray() {
  const hoursArray = Array.from({ length: 24 }, (_, i) => {
    // Create a date object representing the start of the day plus i hours
    const date = new Date(0, 0, 0, i);
    // Format the hours to a two-digit string
    return { time: format(date, "hh:mm a"), bookingStatus: "free" };
  });
  return hoursArray;
}

export function updateBookingStatus(
  timeSlots,
  service,
  bookings,
  selectedDate
) {
  // const updatedTimeSlots = timeSlots.map((slot) => ({
  //   ...slot,
  //   bookingStatus: "free",
  // }));

  // bookings.forEach((booking) => {
  //   const bookingDate = parseISO(booking.from_time);
  //   if (!isSameDay(bookingDate, selectedDate)) {
  //     return;
  //   }

  //   const bookingHour = format(bookingDate, "hh:mm a");
  //   console.log("booking hour", bookingHour);

  //   // Find the index of the matching slot
  //   const slotIndex = updatedTimeSlots.findIndex(
  //     (slot) => slot.time === bookingHour
  //   );
  //   if (slotIndex !== -1) {
  //     updatedTimeSlots[slotIndex].bookingStatus = "booked";
  //   }
  // });

  // console.log("updated time slots", updatedTimeSlots);
  // return updatedTimeSlots;
  console.log("service", service);
  if (!service.starttime || !service.endtime) {
    console.error("Service start or end time is missing:", service);
    return timeSlots.map((slot) => ({
      ...slot,
      bookingStatus: "unavailable", // Default to unavailable for all slots if times are missing
    }));
  }

  console.log("selected date", selectedDate);
  const selectedDateString = format(selectedDate, "yyyy-MM-dd");
  const startTimeString = `${selectedDateString}T${service.starttime}`;
  const endTimeString = `${selectedDateString}T${service.endtime}`;

  console.log(service.starttime);
  console.log(service.endtime);

  const startTime = parseISO(startTimeString);
  const endTime = parseISO(endTimeString);

  const updatedTimeSlots = timeSlots.map((slot) => {
    // Combine date and time into a single datetime string
    const dateTimeString = `${selectedDate} ${slot.time}`;

    // Define the format of the datetime string
    const formatString = "yyyy-MM-dd hh:mm a";

    // Parse the datetime string into a Date object
    const slotTime = parse(dateTimeString, formatString, new Date());
    console.log("slot time", selectedDate, startTime, endTime, slotTime);
    if (slotTime >= startTime && slotTime <= endTime) {
      return {
        ...slot,
        bookingStatus: "free", // Slots within service hours are initially free
      };
    } else {
      return {
        ...slot,
        bookingStatus: "unavailable", // Slots outside service hours are unavailable
      };
    }
  });

  if (!Array.isArray(bookings)) {
    console.error("Bookings is not an array:", bookings);
    return updatedTimeSlots;
  }

  bookings.forEach((booking) => {
    const bookingDate = parseISO(booking.from_time);
    if (!isSameDay(bookingDate, selectedDate)) {
      return;
    }

    const bookingHour = format(bookingDate, "hh:mm a");

    if (bookingDate >= startTime && bookingDate <= endTime) {
      const slotIndex = updatedTimeSlots.findIndex(
        (slot) => slot.time === bookingHour
      );
      if (slotIndex !== -1) {
        updatedTimeSlots[slotIndex].bookingStatus = "booked";
      }
    }
  });
  console.log("updated time slots", updatedTimeSlots);
  return updatedTimeSlots;
}

// Call the function and log the result
export const hoursArray = getHoursArray();

console.log(hoursArray);
