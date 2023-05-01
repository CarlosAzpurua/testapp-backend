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
  const rows = strToFormat.split('\n');

  const result = {
    file: [],
    text: [],
    number: [],
    hex: []
  };

  for(let i=1; i < rows.length; i++) {
    const row = rows[1]
    const values = row.split(',').map(_.trim)
    if(index === 0) return;

    // Check value or add a null
    result.file.push(_.isEmpty(values[0]) ? null : values[0]);
    result.text.push(_.isEmpty(values[1]) ? null : values[1]);
    result.number.push(_.isEmpty(values[2]) ? null : _.isNaN(Number(values[2])) ? null : values[2]);
    result.hex.push(_.isEmpty(values[3]) ? null : values[3]);

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
  }

  return result;
}

const file = async (fileId) => {

  const file = await axios.get(API_URL + `/file/${fileId}`, { headers })
    .then(response => {
        return response.data;
    })
    .catch(error => {
      return { message: strings.error, error, status: 404 }
  })
  
  if(file.error && file.message && file.status === 404) return file

  return formatFile(file)
}

module.exports = {
    allFiles,
    file,
    formatFile
}