"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getFormattedDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();
    let ss = today.getSeconds();
    const ms = today.getMilliseconds();
    const ddStr = dd < 10 ? '0' + dd : dd.toString();
    const mmStr = mm < 10 ? '0' + mm : mm.toString();
    const hhStr = hh < 10 ? '0' + hh : hh.toString();
    const minStr = min < 10 ? '0' + min : min.toString();
    const ssStr = ss < 10 ? '0' + ss : ss.toString();
    return `${ddStr}-${mmStr}-${yyyy}_${hhStr}:${minStr}:${ssStr}${ms}`;
};
exports.default = getFormattedDate;
