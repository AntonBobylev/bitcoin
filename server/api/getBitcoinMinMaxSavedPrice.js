import connection from '@/lib/db.js';
import AppUtils from '@/lib/AppUtils.js';

export default defineEventHandler(async (event) => {

    let sql = 'select min(bph_value) as min_price, ' +
                     'max(bph_value) as max_price ' +
              'from bitcoin_price_history';

    const [rows] = await connection.execute(sql);

    if (AppUtils.isEmpty(rows)) {
        return null;
    }

    return rows[0];
});
