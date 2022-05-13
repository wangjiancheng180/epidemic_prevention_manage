export function dateFormat(val: any): string {
    const date = new Date(val)
    const yy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mf = date.getMinutes();
    const ss = date.getSeconds();
    return `${yy}-${mm}-${dd} ${hh}:${mf}:${ss}`
}