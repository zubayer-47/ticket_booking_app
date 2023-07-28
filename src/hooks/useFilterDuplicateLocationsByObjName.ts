import { useCallback, useEffect, useState } from "react";
import { LocationsType } from "../components/Booking";

export default function useFilterDuplicateLocationsByObjName(
  locations: LocationsType[]
) {
  const [toLocations, setToLocations] = useState<LocationsType[]>([
    { fromID: "", id: "", name: "" },
  ]);
  const filterToLocations = useCallback(
    () => [...new Map(locations.map((loc) => [loc.name, loc])).values()],
    [locations]
  );

  useEffect(() => {
    const uniqueLocations = filterToLocations();

    setToLocations(uniqueLocations);
  }, [filterToLocations]);

  return { locations: toLocations };
}
