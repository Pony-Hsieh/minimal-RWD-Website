// 用以顯示 unix timestamp
// 將 unix timestamp 轉為 yyyy-mm-dd

export default function (unixTimeStamp) {
    const dates = new Date(unixTimeStamp * 1000);
    const year = dates.getFullYear();
    const month = dates.getMonth() + 1;
    const date = dates.getDate();
    const hours = dates.getHours();
    let minutes = dates.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    return `${year}/${month}/${date} ${hours}:${minutes}`;
}
