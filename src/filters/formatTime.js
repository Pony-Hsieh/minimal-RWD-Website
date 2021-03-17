// 用以顯示 unix timestamp
// 將 unix timestamp 轉為 yyyy-mm-dd

export default function (unixTimeStamp) {

    let dates = new Date(unixTimeStamp * 1000);
    let year = dates.getFullYear();
    let month = dates.getMonth() + 1;
    let date = dates.getDate() + 1;
    let hours = dates.getHours();
    let minutes = dates.getMinutes();

    return `${year}/${month}/${date} ${hours}:${minutes}`;
}