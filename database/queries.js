const connection = require('./connection');

const queries = {
  insertUser: async (user) => {
    try {
      const result = await connection.query('INSERT INTO register SET ?', user);
      return result; 
    } catch (error) {
      throw error;
    }
  },
  getUserByEmail: async (email) => {
    try {
      const [rows] = await connection.query('SELECT * FROM register WHERE email = ?', [email]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  addEventVenue: async (eventVenue) => { 
    try {
      const result = await connection.query('INSERT INTO events SET ?', eventVenue); 
      throw error;
    }catch(error){
      throw error
    }
  }
};

module.exports = queries;
