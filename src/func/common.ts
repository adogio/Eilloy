export const imapStrToDisplay: (dateStr: string) => string = (dateStr: string): string => {
    let re: string = dateToDisplay(imapStrToDate(dateStr));
    if (typeof re === 'undefined') {
        return '没有日期';
    } else {
        return re || dateStr.toString();
    }
};

export const dateToDisplay: (date: Date) => string = (date: Date) => {
    if (!Boolean(date)) {
        return void 0;
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}年${month}月${day}日, ${hour}:${minute}:${second}`;
};

export const imapStrToDate: (dateStr: string) => Date = (dateStr: string): Date => {
    if (typeof dateStr === 'undefined') {
        return void 0;
    }
    if (!Boolean(dateStr.split) || !Boolean(dateStr)) {
        return void 0;
    }
    const splited = dateStr.split(/T|Z|-|:|\./).map((value, index) => {
        return parseInt(value, 10);
    });
    let a = new Date();
    a.setUTCFullYear(splited[0]);
    a.setUTCMonth(splited[1]);
    a.setUTCDate(splited[2]);
    a.setUTCHours(splited[3]);
    a.setUTCMinutes(splited[4]);
    a.setUTCSeconds(splited[5]);
    a.setUTCMilliseconds(splited[6]);
    return a;
};
