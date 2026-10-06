import pool from "@/lib/db";

export async function getAllUsers() {
    const result = await pool.query(`
        SELECT 
            id,
            first_name,
            middle_name,
            last_name,
            email,
            phone,
            bank,
            account_no,
            employment_date,
            gender,
            date_of_birth,
            photo,
            address,
            city,
            state_addr,
            last_login
         FROM users
         ORDER BY id ASC
    `);

    return result.rows;
};