export default function formateDate(dateString: string) {
  const sp = dateString.split("-");

  const yy = +sp[2],
    mm = +sp[1],
    ss = +sp[0];

  const date = new Date(yy, mm, ss);

  return date;
}
