const axios = require('axios');
const _  = require('lodash');
const strings = require('../shared/Constants')

const API_URL = "https://echo-serv.tbxnet.com/v1/secret";

const headers = {
  'Authorization': process.env.SECRET_KEY,
  'Content-Type': 'application/json'
};

const allFiles = async () => {
  try {
    return await axios.get(API_URL + "/files", { headers }).then(response => response.data);
  } catch (error) {
    if(error.response){
      return {message: strings.errorResponse, error, status: error.response.status}
    } else if (error.request) {
      return {message: strings.errorRequest, error, status: 500}
    } else {
      return {message: strings.error, error, status: 500}
    }
  }
}

const formatFile = (strToFormat) => {
  const result = {
    file: [],
    text: [],
    number: [],
    hex: []
  };

  if(_.isEmpty(strToFormat)) return result

  const rows = strToFormat.split('\n');

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const [file, text, number, hex] = row.split(',').map(_.trim);
     // Check value or add a null
     result.file.push(_.isEmpty(file) ? null : file);
     result.text.push(_.isEmpty(text) ? null : text);
     result.number.push(_.isEmpty(number) ? null : _.isNaN(Number(number)) ? null : number);
     result.hex.push(_.isEmpty(hex) ? null : hex);
 
     // Add null if blank value
     const addNulls = (arr1, arr2) => {
       while (arr1.length < arr2.length) {
         arr1.push(null);
       }
     };
     addNulls(result.file, result.text);
     addNulls(result.file, result.number);
     addNulls(result.file, result.hex);
  }

  return result;
}

const file = async (fileId) => {
  try{
    const file = await axios.get(`${API_URL}/file/${fileId}`, { headers })
    return formatFile(file.data)
  } catch (error) {
    return { message: strings.error, error, status: 404 }
  }
}

module.exports = {
    allFiles,
    file,
    formatFile
}