// 用以顯示 unix timestamp
// 將 unix timestamp 轉為 yyyy-mm-dd

export default function (unixTimeStamp) {

    let dates = new Date(unixTimeStamp);
    let year = dates.getFullYear();
    let month = dates.getMonth() + 1;
    let date = dates.getDate();

    return `${year}/${month}/${date}`;
}