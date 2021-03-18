// 用以顯示 unix timestamp
// 將 unix timestamp 轉為 yyyy-mm-dd

export default function (unixTimeStamp) {
  const dates = new Date(unixTimeStamp);
  const year = dates.getFullYear();
  const month = dates.getMonth() + 1;
  const date = dates.getDate();

  return `${year}/${month}/${date}`;
}
