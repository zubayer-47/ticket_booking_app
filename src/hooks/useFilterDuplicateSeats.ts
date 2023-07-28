import { useCallback, useEffect, useState } from "react";
import { TicketType } from "../types/state.types";

export default function useFilterDuplicateSeats(tickets: TicketType[]) {
  const [uniqueTickets, setUniqueTickets] = useState<TicketType[]>([
    { id: "", seatName: "" },
  ]);
  const filteredTicketsFunc = useCallback(
    () => [
      ...new Map(tickets.map((ticket) => [ticket.seatName, ticket])).values(),
    ],
    [tickets]
  );

  useEffect(() => {
    const filteredTickets = filteredTicketsFunc();

    setUniqueTickets(filteredTickets);
  }, [filteredTicketsFunc]);

  return { seats: uniqueTickets };
}
