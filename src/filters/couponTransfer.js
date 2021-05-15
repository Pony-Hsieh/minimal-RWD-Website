export default function (couponNum) {
    if (Number(couponNum) === 100) {
        return "無折扣";
    }
    else if (Number(couponNum) % 10 === 0) {
        return `${couponNum / 10} 折`;
    }
    else {
        return `${couponNum} 折`;
    }
}
