const DbConnection = require("../../database/connection");
const Dbname = require("../../database/name")
const AccessTokenCollection = Dbname.AccessTokenCollection

const addToken = async (data) => {
    let myquery = { userID: data.userID };
    let newvalues = {
        $set: {
            userID: data.userID, accessToken: data.accessToken, expire_at: data.expire_at
        }
    };
    let upsert = { upsert: true }
    try {
        const result = await DbConnection.updateData(AccessTokenCollection, myquery, newvalues, upsert);
        return ({ error: false, message: "sucessfully" })
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}

const getToken = async (data) => {
    let query = { userID: data.userID };
    let select = {
        projection: {
            _id: 0, userID: 1, accessToken: 1, expire_at: 1
        }
    };
    try {
        const result = await DbConnection.findAndSelectData(AccessTokenCollection, query, select);
        return ({ error: false, data: result.data })
    } catch (error) {
        return ({ error: true, message: error.message })
    }
}

module.exports = {
    addToken,
    getToken,
}