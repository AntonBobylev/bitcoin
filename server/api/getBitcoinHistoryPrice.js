import connection from "@/lib/db.js";
import AppUtils from '@/lib/AppUtils.js';

const availableSortingValues = ['asc', 'desc'];

export default defineEventHandler(async (event) => {
    const { sorting, fromDate, toDate } = getQuery(event);

    let filters = constructFilters(fromDate, toDate),
        sortingValue = constructSorting(sorting);

    let sql = 'select id, bph_date_time, bph_value ' +
              'from bitcoin_price_history ' +
              'where ' + filters + ' ' +
              'order by bph_date_time ' + sortingValue;

    const [rows] = await connection.execute(sql);

    return rows;
});

/**
 * Transforms the value received from the Date.parse() function 
 * to the simple new Date(). Then resets hours.
 * Then converts the value to SQL format
 * 
 * @param {*} date 
 */
function parsedDateToSimpleDate(date)
{
    let value = Number(date);
    value = new Date(value);

    value.setHours(0, 0, 0);

    return AppUtils.formatDateForDB(value);
}

/**
 * 
 * @param {*} fromDate 
 * @param {*} toDate 
 * @returns {string} 
 */
function constructFilters(fromDate, toDate)
{
    let filters = [];

    if (fromDate !== undefined && toDate !== undefined) { // range selected
        let from = parsedDateToSimpleDate(fromDate),
            to = parsedDateToSimpleDate(toDate);

        filters.push(getDateFilterSql(from, to));
    } else {
        if (fromDate) {
            let from = parsedDateToSimpleDate(fromDate)
            filters.push(getDateFilterSql(from, from));
        }

        if (toDate) {
            let to = parsedDateToSimpleDate(toDate)
            filters.push(getDateFilterSql(to, to));
        }
    }
    
    filters = AppUtils.isEmpty(filters)
        ? 'true'
        : filters.join(' and ');

    return filters;
}

function getDateFilterSql(from, to)
{
    return 'date(bph_date_time) >= date(\'' + from + '\')' +
           'and date(bph_date_time) < date_add(\'' + to + '\', interval 1 day)';
}

/**
 * 
 * @param {string} sorting 
 * @returns 
 */
function constructSorting(sorting) 
{
    let result = 'desc'; // by default

    if (sorting && availableSortingValues.includes(sorting)) {
        result = sorting;
    }

    return result;
}
