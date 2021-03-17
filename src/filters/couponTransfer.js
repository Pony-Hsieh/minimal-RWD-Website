export default function (couponNum) {
    if (couponNum === 100) {

        return `無折扣`;
    }
    return `${couponNum / 10}折`;
}