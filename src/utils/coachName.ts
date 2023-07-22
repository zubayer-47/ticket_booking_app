export const makeCoachName = (prodId: string, prodName: string) => {
  const coachName = prodId.split("-")[0] + `-${prodName}`;

  return coachName;
};
