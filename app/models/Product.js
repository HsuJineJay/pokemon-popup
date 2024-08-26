const db = require('../../config/database');

class Product {
  static async getAll(filters) {
    const client = await db.connect();
    try {
      let query = `
                SELECT p.*, pi.imgid, pi.productimg 
                FROM product p 
                LEFT JOIN productimg pi ON p.productid = pi.imgproductid 
                WHERE 1=1
            `;
      const params = [];
      let paramIndex = 1;

      // 添加篩選條件邏輯...
      if (req.query.productID) {
        query += ` AND productid = $${paramIndex++}`;
        params.push(req.query.productID);
      }
      if (req.query.productExist) {
        query += ` AND productexist = $${paramIndex++}`;
        params.push(req.query.productExist);
      }
      if (req.query.productName) {
        query += ` AND productname = $${paramIndex++}`;
        params.push(req.query.productName);
      }
      if (req.query.productType) {
        query += ` AND producttype = $${paramIndex++}`;
        params.push(req.query.productType);
      }
      if (req.query.productDescribe) {
        query += ` AND productdescribe = $${paramIndex++}`;
        params.push(req.query.productDescribe);
      }
      if (req.query.productPrice) {
        query += ` AND productprice = $${paramIndex++}`;
        params.push(req.query.productPrice);
      }
      if (req.query.productInStock) {
        query += ` AND productinStock = $${paramIndex++}`;
        params.push(req.query.productInStock);
      }
      if (req.query.storeOnly) {
        query += ` AND storeonly = $${paramIndex++}`;
        params.push(req.query.storeOnly);
      }
      if (req.query.productMain) {
        query += ` AND productmain = $${paramIndex++}`;
        params.push(req.query.productMain);
      }

      if (conditions.length > 0) {
        query += " AND " + conditions.join(" AND ");
      }

      const { rows } = await client.query(query, params);

      // 處理結果邏輯...
      const data = {};
      rows.forEach(row => {
        if (!data[row.productid]) {
          data[row.productid] = {
            productID: row.productid,
            productExist: row.productexist,
            productName: row.productname,
            productType: row.producttype,
            productDescribe: row.productdescribe,
            productPrice: row.productprice,
            productInStock: row.productinstock,
            storeOnly: row.storeonly,
            productMain: row.productmain,
            productImg: []
          };
        }
        if (row.imgid) {
          data[row.productid].productImg.push({
            imgId: row.imgid,
            productImg: row.productimg
          });
        }
      });

      return Object.values(data);
    } finally {
      client.release();
    }
  }

  static async create(productData) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');

      const { productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain, productImg } = productData;

      const result = await client.query(
        'INSERT INTO product (productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING productID',
        [productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain]
      );

      const productID = result.rows[0].productid;

      for (const img of JSON.parse(productImg)) {
        await client.query(
          'INSERT INTO productImg (imgProductID, productImg) VALUES ($1, $2)',
          [productID, img.img]
        );
      }

      await client.query('COMMIT');
      return productID;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async delete(productID) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM productImg WHERE imgProductID = $1', [productID]);
      await client.query('DELETE FROM product WHERE productID = $1', [productID]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async update(productData) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      const { productID, productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain, productImg } = productData;

      await client.query(
        'UPDATE product SET productExist = $1, productName = $2, productType = $3, productDescribe = $4, productPrice = $5, productInStock = $6, storeOnly = $7, productMain = $8 WHERE productID = $9',
        [productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain, productID]
      );

      await client.query('DELETE FROM productImg WHERE imgProductID = $1', [productID]);

      for (const img of productImg) {
        await client.query(
          'INSERT INTO productImg (imgProductID, productImg) VALUES ($1, $2)',
          [productID, img.img]
        );
      }

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async partialUpdate(updateData) {
    const client = await db.connect();
    try {
      await client.query('BEGIN');
      const { productID, productExist, productInStock, storeOnly, productMain } = updateData;

      let condition = '';
      let param = null;

      if (productExist !== undefined) {
        condition = 'productExist = $1';
        param = productExist;
      } else if (productInStock !== undefined) {
        condition = 'productInStock = $1';
        param = productInStock;
      } else if (storeOnly !== undefined) {
        condition = 'storeOnly = $1';
        param = storeOnly;
      } else if (productMain !== undefined) {
        condition = 'productMain = $1';
        param = productMain;
      }

      if (condition && param !== null) {
        await client.query(`UPDATE product SET ${condition} WHERE productID = $2`, [param, productID]);
        await client.query('COMMIT');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = Product;