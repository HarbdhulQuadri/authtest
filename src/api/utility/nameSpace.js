const createNameSpace = (io, namespace) => {
    let newNameSpace = io.of(`/${namespace}`);
    return newNameSpace;
}



module.exports = {
    createNameSpace
}