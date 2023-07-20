export default function setLocalStorage(token: string) {
  const _token = localStorage.getItem("_token");
  // console.log(_token?.length);

  if (!_token?.length && !!token.length) {
    localStorage.setItem("_token", JSON.stringify(token));
  }
}
