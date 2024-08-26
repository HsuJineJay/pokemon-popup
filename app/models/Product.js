const db = require('../../config/database');

class Product {
  static async getAll(filters) {
    try {
      let query = `
        SELECT p.*, pi.imgid, pi.productimg 
        FROM product p 
        LEFT JOIN productimg pi ON p.productid = pi.imgproductid 
        WHERE 1=1
      `;
  
      const params = [];
      let paramIndex = 1;
  
      // 使用傳入的 filters 對象，判斷條件
      if (filters.productID) {
        query += ` AND p.productid = $${paramIndex++}`;
        params.push(filters.productID);
      }
      if (filters.productExist) {
        query += ` AND p.productexist = $${paramIndex++}`;
        params.push(filters.productExist);
      }
      if (filters.productName) {
        query += ` AND p.productname ILIKE $${paramIndex++}`;
        params.push(`%${filters.productName}%`);
      }
      if (filters.productType) {
        query += ` AND p.producttype = $${paramIndex++}`;
        params.push(filters.productType);
      }
      if (filters.productDescribe) {
        query += ` AND p.productdescribe ILIKE $${paramIndex++}`;
        params.push(`%${filters.productDescribe}%`);
      }
      if (filters.productPrice) {
        query += ` AND p.productprice = $${paramIndex++}`;
        params.push(filters.productPrice);
      }
      if (filters.productInStock) {
        query += ` AND p.productinStock = $${paramIndex++}`;
        params.push(filters.productInStock);
      }
      if (filters.storeOnly) {
        query += ` AND p.storeonly = $${paramIndex++}`;
        params.push(filters.storeOnly);
      }
      if (filters.productMain) {
        query += ` AND p.productmain = $${paramIndex++}`;
        params.push(filters.productMain);
      }
  
      // 移除了 conditions 數組的使用
  
      const { rows } = await db.query(query, params);
  
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
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  static async create(productData) {
    try {
      await db.query('BEGIN');

      const { productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain, productImg } = productData;

      const result = await db.query(
        'INSERT INTO product (productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING productID',
        [productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain]
      );

      const productID = result.rows[0].productid;

      for (const img of JSON.parse(productImg)) {
        await db.query(
          'INSERT INTO productImg (imgProductID, productImg) VALUES ($1, $2)',
          [productID, img.img]
        );
      }

      await db.query('COMMIT');
      return productID;
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('product create 錯誤：', error);
      throw error;
    } 
  }

  static async delete(productID) {
    try {
      await db.query('BEGIN');
      await db.query('DELETE FROM productImg WHERE imgProductID = $1', [productID]);
      await db.query('DELETE FROM product WHERE productID = $1', [productID]);
      await db.query('COMMIT');
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('product delete 錯誤：', error);
      throw error;
    } 
  }

  static async update(productData) {
    try {
      await db.query('BEGIN');
      const { productID, productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain, productImg } = productData;

      await db.query(
        'UPDATE product SET productExist = $1, productName = $2, productType = $3, productDescribe = $4, productPrice = $5, productInStock = $6, storeOnly = $7, productMain = $8 WHERE productID = $9',
        [productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain, productID]
      );

      await db.query('DELETE FROM productImg WHERE imgProductID = $1', [productID]);

      for (const img of productImg) {
        await db.query(
          'INSERT INTO productImg (imgProductID, productImg) VALUES ($1, $2)',
          [productID, img.img]
        );
      }

      await db.query('COMMIT');
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('product update 錯誤：', error);
      throw error;
    } 
  }

  static async partialUpdate(updateData) {
    try {
      await db.query('BEGIN');
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
        await db.query(`UPDATE product SET ${condition} WHERE productID = $2`, [param, productID]);
        await db.query('COMMIT');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('product partialUpdate 錯誤：', error);
      throw error;
    }
  }
}

module.exports = Product;