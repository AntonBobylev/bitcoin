import connection from '@/lib/db.js';
import AppUtils from '@/lib/AppUtils.js';

export default defineEventHandler(async (event) => 
{
    const { bitcoin_value: bitcoinValue } = getQuery(event);
    if (AppUtils.isEmpty(bitcoinValue)) {
        return;
    }

    let currentTimestamp = AppUtils.formatDateForDB(new Date());
    if (await isPriceAlreadySavedForTimestamp(currentTimestamp)) {
        // nothing to do
        return;
    }

    let sql = 'insert into bitcoin_price_history (id, bph_date_time, bph_value) values(?, ?, ?)'
    await connection.execute(sql, [null, currentTimestamp, bitcoinValue]);
});

/**
 * 
 * @param {string} timestamp 
 * @returns {boolean}
 */
async function isPriceAlreadySavedForTimestamp(timestamp)
{
    let sql = 'select 1 ' +
              'from bitcoin_price_history ' +
              'where bph_date_time = ?';

    const [rows] = await connection.execute(sql, [timestamp]);
    
    return !AppUtils.isEmpty(rows);
}
