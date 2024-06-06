//  format số đến hàng ngàn (vdu: 300k)
const FormatNumberToThousands = (number: number): string => {
    if (number >= 1000) {
        return (number / 1000)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "k";
    }

    else {
        return number?.toString();
    }
}

const FormatOnlyNumberToThousands = (number: number): string => {
    if (number >= 1000) {
        return (number / 1000)?.toFixed(0)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    else {
        return number?.toString();
    }
}

// format 3 số là có dấu ","
const FormatNumberComma = (number: number): string => {
    return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

// format 3 số là có dấu "."
const FormatNumberDot = (number: number): string => {
    return Math.round(number)?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

// format đã có làm tròn (3 số -> .)
const FormatNumberToDecimal = (number: number, decimalPlaces: number): string => {
    const roundedNumber = parseFloat(number.toFixed(decimalPlaces));
    return roundedNumber?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// format số sao yêu thích
const FormatPointStar = (number: number, decimalPlaces: number): string => {
    const stringNumber = number.toString();
    const decimalIndex = stringNumber.indexOf('.');

    if (decimalIndex !== -1 && stringNumber.length - decimalIndex - 1 > decimalPlaces) {
        return stringNumber.slice(0, decimalIndex + decimalPlaces + 1);
    } else {
        return stringNumber;
    }
}

// format số vượt quá max là "+"
const FormatNumberHundred = (number: number, max_number: number): string => {
    if (number >= max_number) {
        return `${max_number}+`;
    } else {
        return number?.toString()
    }
}

// format số điện thoại 
const FormatPhoneNumber = (number: number | string, decimalPlaces?: number): string => {
    // Chuyển đổi số điện thoại thành chuỗi và loại bỏ tất cả các ký tự không phải là số
    const numberString = number.toString().replace(/\D/g, '');

    // Kiểm tra xem chuỗi số điện thoại có đủ độ dài không để áp dụng định dạng
    if (numberString.length < 10) {
        return numberString; // Trả về số điện thoại không định dạng nếu ngắn hơn 10 ký tự
    }

    // Tạo chuỗi số điện thoại với định dạng
    const formattedNumber = numberString.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");

    return formattedNumber;
}

// formart trang my trip
function FormatCurrency(amount: any) {
    // Chuyển số tiền sang chuỗi
    var amountString = amount.toString();

    // Chèn dấu phẩy sau mỗi 3 chữ số từ phải qua trái, trừ chữ số đầu tiên nếu số tiền có hơn 3 chữ số
    for (var i = amountString.length - 3; i > 0; i -= 3) {
        amountString = amountString.slice(0, i) + ' ' + amountString.slice(i);
    }

    // Thêm ký hiệu tiền tệ 'đ' vào cuối chuỗi
    amountString += 'đ';

    return amountString;
}

// format số km & số m
function FormatDistance(distance: number) {
    if (distance >= 1000) {
        // Nếu lớn hơn hoặc bằng 1000, chuyển đổi thành km
        return (distance / 1000).toFixed(1) + 'km';
    } else {
        // Nếu bé hơn 1000, giữ nguyên là m
        return Math.round(distance) + 'm';
    }
}

// format full km
function FormatDistanceFullKm(distance: number) {
    if (distance >= 1000) {
        // Nếu lớn hơn hoặc bằng 1000, chuyển đổi thành km và giữ 1 chữ số thập phân
        return (distance / 1000).toFixed(1) + 'km';
    } else {
        // Nếu bé hơn 1000, chuyển đổi thành km và giữ 3 chữ số thập phân
        return (distance / 1000).toFixed(3) + 'km';
    }
}

// format bỏ dấu "," trong chuỗi string
const FormatOriginalString = (value: string) => {
    return value.replace(/[.,]/g, "")
}

export {
    FormatNumberToThousands,
    FormatOnlyNumberToThousands,
    FormatOriginalString,
    FormatNumberDot,
    FormatNumberToDecimal,
    FormatPointStar,
    FormatNumberHundred,
    FormatPhoneNumber,
    FormatCurrency,
    FormatDistance,
    FormatDistanceFullKm,
    FormatNumberComma,
}