const DbConnection = require("../../database/connection");
const moment = require("moment-timezone");
const Dbname = require("../../database/name")
const userCollection = Dbname.userCollection
let randomstring = require("randomstring");

const register = async (data) => {
    let myquery = { userID: data.userID };
    let newvalues = {
        $set: {
            userID: randomstring.generate(10),
            emailAddress: data.emailAddress,
            phoneNumber: data.phoneNumber,
            type: data.type,
            password: data.password,
            status: "active",
            registerType: "password",
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

const getLogin = async (data) => {
    let query = { $or: [{ emailAddress: data.emailAddress }, { phoneNumber: data.phoneNumber }] };
    let select = {
        projection: {
            _id: 0, userID: 1, emailAddress: 1, phoneNumber: 1, password: 1, status: 1, type: 1,
        }
    };
    try {
        const result = await DbConnection.findAndSelectData(userCollection, query, select);
        return ({ error: false, data: result.data })
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}

module.exports = {
    register,
    getLogin,
}