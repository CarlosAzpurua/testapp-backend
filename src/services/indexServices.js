const axios = require('axios');
const _  = require('lodash');
const strings = require('../shared/Constants')

const headers = {
    'Authorization': process.env.SECRET_KEY,
    'Content-Type': 'application/json'
};

const allFiles = async () => {

    const allFiles = await axios.get("https://echo-serv.tbxnet.com/v1/secret/files", { headers })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      throw new Error(strings.error, error);
    })
    
    return allFiles
}

const file = async (fileId) => {

  const file = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${fileId}`, { headers })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      console.error(error)
  })
  
  if(!file) return {message: strings.error};

  function formatFile(str) {
      const rows = str.split('\n');
    
      const result = {
        file: [],
        text: [],
        number: [],
        hex: []
      };
    
      rows.forEach((row, index) => {
        const values = row.split(',').map(_.trim);

        if(index === 0) return;

        // Check value or add a null
        result.file.push(values[0] || null);
        result.text.push(values[1] || null);
        result.number.push(_.isNaN(Number(values[2])) ? null : values[2]);
        result.hex.push(values[3] || null);
    
        // Add null if blank value
        while (result.file.length < result.text.length) {
          result.file.push(null);
        }
        while (result.file.length < result.number.length) {
          result.file.push(null);
        }
        while (result.file.length < result.hex.length) {
          result.file.push(null);
        }
      });
    
      return result;
  }

  return formatFile(file)
}

module.exports = {
    allFiles,
    file
}