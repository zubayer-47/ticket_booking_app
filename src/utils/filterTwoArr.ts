import { TicketType } from "../types/state.types";
const seat3: TicketType[][] = [
  [
    { id: "1", seatName: "A-1" },
    { id: "2", seatName: "A-2" },
    { id: "3", seatName: "A-3" },
    { id: "4", seatName: "A-4" },
  ],
  [
    { id: "1", seatName: "B-1" },
    { id: "2", seatName: "B-2" },
    { id: "3", seatName: "B-3" },
    { id: "4", seatName: "B-4" },
  ],
  [
    { id: "1", seatName: "C-1" },
    { id: "2", seatName: "C-2" },
    { id: "3", seatName: "C-3" },
    { id: "4", seatName: "C-4" },
  ],
  [
    { id: "1", seatName: "D-1" },
    { id: "2", seatName: "D-2" },
    { id: "3", seatName: "D-3" },
    { id: "4", seatName: "D-4" },
  ],
  [
    { id: "1", seatName: "E-1" },
    { id: "2", seatName: "E-2" },
    { id: "3", seatName: "E-3" },
    { id: "4", seatName: "E-4" },
  ],
  [
    { id: "1", seatName: "F-1" },
    { id: "2", seatName: "F-2" },
    { id: "3", seatName: "F-3" },
    { id: "4", seatName: "F-4" },
  ],
  [
    { id: "1", seatName: "G-1" },
    { id: "2", seatName: "G-2" },
    { id: "3", seatName: "G-3" },
    { id: "4", seatName: "G-4" },
  ],
  [
    { id: "1", seatName: "H-1" },
    { id: "2", seatName: "H-2" },
    { id: "3", seatName: "H-3" },
    { id: "4", seatName: "H-4" },
  ],
  [
    { id: "1", seatName: "I-1" },
    { id: "2", seatName: "I-2" },
    { id: "3", seatName: "I-3" },
    { id: "4", seatName: "I-4" },
  ],
];

const booked: TicketType[] = [
  {
    id: "",
    seatName: "B-1",
  },
  {
    id: "",
    seatName: "D-1",
  },
];

export default function filterTwoArr(
  actualArr?: TicketType[],
  seatsArr?: TicketType[]
) {
  return seat3.map((v, index) => {
    const arr = [...v, ...booked];

    const dd = [...new Map(arr.map((seat) => [seat.seatName, seat])).values()];

    return dd;

    // return v.map((v2) => {
    //   const isBooked = booked.every((v3) => v3.seatName === "D-1");

    //   console.log(isBooked);

    //   if (isBooked) {
    //     return {
    //       ...v2,
    //       selected: true,
    //     };
    //   }

    //   return v2;
    // });

    // const seatObj = booked.find((v2) => v2.seatName === v[index].seatName);

    // if (seatObj?.seatName) {
    //   return {
    //     ...v[index],
    //     selected: true,
    //   };
    // }

    // return v[index];

    // return booked.some((v2) => v.find((v, ind) => v))
    //   ? { ...v, selected: true }
    //   : { ...v, selected: false };
  });
}
