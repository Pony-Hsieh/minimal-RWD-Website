// 將傳入的數值加上 $ 符號
// 將傳入的數值加上千分號 (三位一撇)

export default function (num) {
    const n = Number(num);
    return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
        return currency;
    })}`;
}