import { TicketType } from "../types/state.types";

export default function filterTwoArr(
  actualArr: TicketType[],
  seatsArr: TicketType[]
) {
  return actualArr.map((v) => {
    return seatsArr.some((v2) => v.seatName === v2.seatName)
      ? { ...v, selected: true }
      : { ...v, selected: false };
  });
}
