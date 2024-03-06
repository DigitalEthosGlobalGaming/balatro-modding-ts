function initialiseData() {
    if (G.modData == undefined || G.modData == null) {
        G.modData = {};
    }
}
export function getData(key: string,defaultValue: any) {
    initialiseData();

    const value = G.modData[key];
    if (value == undefined) {
        return defaultValue;
    }
    return value;

}

export function setData(key:string ,value:any) {
    initialiseData();
    G.modData[key] = value;
}