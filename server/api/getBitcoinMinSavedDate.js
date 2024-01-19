import connection from "@/lib/db.js";
import AppUtils from '@/lib/AppUtils.js';

export default defineEventHandler(async (event) => {

    let sql = 'select bph_date_time ' +
              'from bitcoin_price_history ' +
              'order by bph_date_time ' +
              'limit 1';

    const [rows] = await connection.execute(sql);

    if (AppUtils.isEmpty(rows)) {
        return new Date('1990/01/01');
    }

    return rows[0].bph_date_time;
});
