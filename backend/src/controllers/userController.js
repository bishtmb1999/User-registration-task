const userModel = require("../models/userModel");
const moment=require("moment");
const validator = require("../validations/validator")

const createUser= async function(req,res){
    try{

    let data = req.body;
    data.dob.Date=moment().format("dd-mm-yyyy");
    
    // VALIDATIONS STARTS
    if (!validator.isValidRequest(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Body can not be empty" });
    }
    let { firstName, lastName, email, country, gender, state, city, dob, age } = data;
    if (!validator.isValidValue(firstName)) {
        return res
          .status(400)
          .send({ status: false, message: "FirstName is required" });
      }
  
      if (!validator.isValidName(firstName)) {
        return res.status(400).send({
          status: false,
          message:
            "firstName may contain only letters. Digits & Spaces are not allowed ",
        });
      }
  
      if (!validator.isValidValue(lastName)) {
        return res
          .status(400)
          .send({ status: false, message: "lastName is required" });
      }
  
      if (!validator.isValidName(lastName)) {
        return res.status(400).send({
          status: false,
          message:
            "lastName may contain only letters. Digits & Spaces are not allowed",
        });
      }
  
      if (!validator.isValidValue(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Email is required" });
      }
  
      if (!validator.isValidEmail(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Entered email is invalid" });
      }
      if (!validator.isValidValue(country)) {
        return res
          .status(400)
          .send({ status: false, message: "country is required" });
      }
      if (!validator.isValidName(country)) {
        return res.status(400).send({
          status: false,
          message:
            "country may contain only letters. Digits & Spaces are not allowed",
        });
      }
      if (!validator.isValidValue(gender)) {
        return res
          .status(400)
          .send({ status: false, message: " gender is required",
         });
        }
          if (!validator.isValidEnum(gender)) {
             return res
             .status(400)
             .send({ status: false, message: " gender must be 'Male' /'female' /'LGBT'",
             });
             }
             if (!validator.isValidValue(state)) {
                return res
                  .status(400)
                  .send({ status: false, message: "state is required" });
              }
              if (!validator.isValidName(state)) {
                return res.status(400).send({
                  status: false,
                  message:
                    "state may contain only letters. Digits & Spaces are not allowed",
                });
              }
              if (!validator.isValidValue(city)) {
                return res
                  .status(400)
                  .send({ status: false, message: "city is required" });
              }
              if (!validator.isValidName(city)) {
                return res.status(400).send({
                  status: false,
                  message:
                    "city may contain only letters. Digits & Spaces are not allowed",
                });
              }
              if (!validator.isValidValue(dob)) {
                return res
                  .status(400)
                  .send({ status: false, message: "dob is required" });
              }
              if (!validator.isValidValue(age)) {
                return res
                  .status(400)
                  .send({ status: false, message: "age is required" });
                  
              }
      
  
    
        const savedData = await userModel.create(data);

    return res
      .status(201)
      .send({ status: true, message: "Data created", Data: savedData });
  } catch (err) {
      return res .status(500) .send({ status: false, message: "Error occcured : " + err });
    }
  }

 
   module.exports.createUser=createUser