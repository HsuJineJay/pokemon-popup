const db = require('../../config/database');

class MenuItem {
  static async getAll(filters) {
    let sql = 'SELECT * FROM menuItem WHERE 1 = 1';
    const params = [];

    // 添加過濾條件邏輯...

    if (itemID) {
      sql += ' AND itemID = $' + (params.length + 1);
      params.push(itemID);
    }
    if (menuExist) {
      sql += ' AND menuExist = $' + (params.length + 1);
      params.push(menuExist);
    }
    if (itemName) {
      sql += ' AND itemName LIKE $' + (params.length + 1);
      params.push(`%${itemName}%`);
    }
    if (itemType) {
      sql += ' AND itemType LIKE $' + (params.length + 1);
      params.push(`%${itemType}%`);
    }
    if (itemDescribe) {
      sql += ' AND itemDescribe LIKE $' + (params.length + 1);
      params.push(`%${itemDescribe}%`);
    }
    if (itemMain) {
      sql += ' AND itemMain = $' + (params.length + 1);
      params.push(itemMain);
    }
    if (itemPrice) {
      sql += ' AND itemPrice = $' + (params.length + 1);
      params.push(itemPrice);
    }
    if (itemImg) {
      sql += ' AND itemImg LIKE $' + (params.length + 1);
      params.push(`%${itemImg}%`);
    }


    const result = await db.query(sql, params);
    return result.rows;
  }

  static async create(menuItemData) {
    const { menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg } = menuItemData;
    const sql = `
            INSERT INTO menuItem (menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING itemID
        `;
    const params = [menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg];
    const result = await db.query(sql, params);
    return result.rows[0].itemid;
  }

  static async delete(itemID) {
    const sql = 'DELETE FROM menuItem WHERE itemID = $1';
    await db.query(sql, [itemID]);
  }

  static async update(menuItemData) {
    const { itemID, menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg } = menuItemData;
    const sql = `
            UPDATE menuItem
            SET menuExist = $1, itemName = $2, itemType = $3, itemDescribe = $4, itemMain = $5, itemPrice = $6, itemImg = $7
            WHERE itemID = $8
        `;
    const params = [menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg, itemID];
    await db.query(sql, params);
  }

  static async updateStatus({ itemID, menuExist }) {
    const sql = 'UPDATE menuItem SET menuExist = $1 WHERE itemID = $2';
    await db.query(sql, [menuExist, itemID]);
  }
}

module.exports = MenuItem;