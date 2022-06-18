export const getDaysBetweenDates = (d0, d1) => {
    const msPerDay = 8.64e7
    // Copy dates so don't mess them up
    const x0 = new Date(d0)
    const x1 = new Date(d1)
    // Set to noon - avoid DST errors
    x0.setHours(12,0,0)
    x1.setHours(12,0,0)
    // Round to remove daylight saving errors
    return Math.round( (x1 - x0) / msPerDay );
}