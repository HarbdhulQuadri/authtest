const DbConnection = require("../../database/connection");
const moment = require("moment-timezone");
const Dbname = require("../../database/name")
const userCollection = Dbname.userCollection

const register = async (data) => {
    let myquery = { userID: data.userID };
    let newvalues = {
        $set: {
            userID: data.userID,
            emailAddress: data.emailAddress,
            phoneNumber: data.phoneNumber,
            role:data.role,
            password: data.password,
            status: "active", 
            emailverify: false,
            registerType: "password",
            firstName: data.firstName,
            lastName: data.lastName,
            country: data.country,
        }
    };
    let upsert = { upsert: true }
    try {
         await DbConnection.updateData(userCollection, myquery, newvalues, upsert);
        return ({ error: false, message: "successfully" });
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}




const getShortProfile = async (data) => {
    let query = { $or: [{ emailAddress: data.emailAddress }, { phoneNumber: data.phoneNumber }] };
    let select = {
        projection: {
          // to ask what the zeros and ones is for 
          _id: 0, userID: 1, userName:1,emailAddress: 1, phoneNumber: 1,  password: 1, status: 1, emailverify: 1,
            firstName: 1, lastName: 1, country: 1, role:1,
        }
    };
    try {
        const result = await DbConnection.findAndSelectData(userCollection, query, select);
        return ({ error: false, data: result.data })
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}

const updatePasswordLoginUser = async (data) => {
    let myquery = { userID: data.userID };
    let newvalues = { $set: { loginType: "password" } };
    let upsert = { upsert: true }
    try {
        const result = await DbConnection.updateData(userCollection, myquery, newvalues, upsert);
        return ({ error: false, message: result.message })
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}

module.exports = {
    register,
    getShortProfile,
    updatePasswordLoginUser,
}

