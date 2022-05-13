import geoCoordMap from "../map/province";
export default function (data: any) {
    const res = [];
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].name)
        const geoCoord = (geoCoordMap as any)[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
}
