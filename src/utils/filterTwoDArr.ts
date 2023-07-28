import { TicketType } from "../types/state.types";

export default function filterTwoDArr(
  actualArr: TicketType[][],
  seatsArr: TicketType[]
) {
  return actualArr.map((v) => {
    const arr = [...v];

    // const dd = [
    //   ...new Map(
    const filteredSeats = arr.map((seat) => {
      const selected = seatsArr.find(
        (bookedSeat) => bookedSeat.seatName === seat.seatName
      );

      if (!selected?.seatName) {
        return seat;
      }

      return { ...seat, selected: true };
    });

    return filteredSeats;
  });
}
