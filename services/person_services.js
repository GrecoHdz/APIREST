const Person = require("../models/person_model");

exports.getAll = async () => await Person.findAll();
exports.getById = async (id) => await Person.findByPk(id);
exports.create = async (data) => await Person.create(data);
exports.update = async (id,data) => {
    const person = await Person.findByPk(id);
    if (!person) return null;
    return await person.update(data);
}
exports.remove = async (id) => {
    const person = await Person.findByPk(id);
    if (!person) return false;
    await person.deestroy();
    return true;
};