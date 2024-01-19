
class AppUtils {
    constructor() { }

    /**
     * 
     * @param {Date} date 
     * @returns {string} 'YYYY-MM-DD hh:mm:ss'
     */
    static formatDateForDB (date) 
    {
        let year = date.getFullYear(),
            month = ('0' + (date.getMonth() + 1)).slice(-2),
            day = date.getDate(),
            time = date.toTimeString().split(' ')[0];
    
        return `${year}-${month}-${day} ${time}`;
    }

    /**
     * 
     * @param {*} value 
     */
    static isEmpty(value)
    {
        return !value || value.length < 1;
    }
}



export default AppUtils;