const getFormattedDate = () => {
    const today : Date  = new Date();
    let dd: number = today.getDate();
    let mm: number = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    let hh: number = today.getHours();
    let min: number = today.getMinutes();
    let ss: number = today.getSeconds();
    const ms = today.getMilliseconds();

    const ddStr = dd < 10 ? '0' + dd : dd.toString();
    const mmStr = mm < 10 ? '0' + mm : mm.toString();
    const hhStr = hh < 10 ? '0' + hh : hh.toString();
    const minStr = min < 10 ? '0' + min : min.toString();
    const ssStr = ss < 10 ? '0' + ss : ss.toString();

    return `${ddStr}-${mmStr}-${yyyy}_${hhStr}:${minStr}:${ssStr}${ms}`;
};

export default getFormattedDate;
