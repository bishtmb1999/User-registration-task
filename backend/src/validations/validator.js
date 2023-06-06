const mongoose = require('mongoose')
//request body validation
const isValidRequest = (value) => Object.keys(value).length > 0;
//value validation
const isValidValue = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "number") return false;
    return true;
  };
  const isValidEnum = function (value) {
    let Enum = ["male", "female", "lgbt"];
    if (Enum.includes(value)) {
      return true;
    }
    return false;
  };

  const isValidName = function(value){
    return /^\w[a-zA-Z]*$/.test(value)
  }
  
  const isValidEmail = function(value){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
  }
  module.exports={isValidValue ,isValidName, isValidEmail,isValidRequest,isValidEnum}