const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Alumni, Answer, Major, Question, Role, Year } = require("../models");

class AlumniController {
  static alumniRegister(req, res) {
    try {
      const {
        fullname,
        password,
        bornDate,
        nik,
        nim,
        address,
        majorId,
        telephoneNumber,
        yearId,
      } = req.body;
      Alumni.create({
        fullname: fullname,
        password: password,
        born_date: bornDate,
        nik: nik,
        nim: nim,
        address: address,
        major_id: majorId,
        telephone_number: telephoneNumber,
        year_id: yearId,
        role_id: 2,
      });
      res
        .status(201)
        .json({ msg: `Successfully register ${fullname}. Please Log in` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async alumniLogin(req, res) {
    try {
      const { nim, password } = req.body;
      const alumniLogin = await Alumni.findOne({ where: { nim } });
      if (!alumniLogin) {
        throw { name: "INVALIDNIKORPASSWORD" };
      }
      if (!compareHash(password, alumniLogin.password)) {
        throw { name: "INVALIDNIKORPASSWORD" };
      }
      const payload = {
        id: alumniLogin.id,
      };
      const accessToken = createToken(payload);
      res.status(200).json({
        access_token: accessToken,
        userId: alumniLogin.id,
      });
    } catch (error) {
      if (error.name === "INVALIDNIKORPASSWORD") {
        res.status(401).json({ msg: "INVALID NIK OR PASSWORD" });
      } else {
        res.status(500).json(error);
      }
    }
  }
}

module.exports = AlumniController;
