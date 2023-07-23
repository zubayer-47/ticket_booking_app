export const makeCoachName = (prodId: string, prodName?: string) => {
  prodName = prodName ? `-${prodName}` : "";
  return prodId.split("-")[0] + prodName;
};
