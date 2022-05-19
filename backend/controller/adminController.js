const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const {
  Admin,
  Alumni,
  Answer,
  Major,
  Question,
  Role,
  Year,
} = require("../models");

class UserController {
  static async getYear(req, res) {
    try {
      const yearList = await Year.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(yearList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async postYear(req, res) {
    try {
      const { year } = req.body;
      await Year.create({ year });
      res.status(201).json({ msg: "Successfully added year" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getMajor(req, res) {
    try {
      const majorList = await Major.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt", "major_id"],
        },
      });
      res.status(200).json(majorList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async postMajor(req, res) {
    try {
      const { major } = req.body;
      await Major.create({ majorName: major });
      res.status(201).json({ msg: "Successfully added new major" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getRole(req, res) {
    try {
      const roleList = await Role.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      res.status(200).json(roleList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async postRole(req, res) {
    try {
      const { role } = req.body;
      await Role.create({ roleName: role });
      res.status(201).json({ msg: "Successfully added new role" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async getAdmin(req, res) {
    try {
      const adminList = await Admin.findAll({
        attributes: {
          exclude: ["password", "updatedAt", "createdAt"],
        },
      });
      res.status(200).json(adminList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async adminRegister(req, res) {
    try {
      const { adminName, adminPassword } = req.body;
      if (adminName === '' || adminPassword === ''){
        throw {msg: 'Name and password is required'}
      }
      const newAdmin = await Admin.create({
        name: adminName,
        password: adminPassword,
        role_id: 1,
      });
      res
        .status(201)
        .json({ msg: `Successfully create ${newAdmin.name} as an admin` });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async adminLogin(req, res) {
    try {
      const { adminName, adminPassword } = req.body;
      const adminLogin = await Admin.findOne({ where: { name: adminName } });
      if (!adminLogin) {
        throw { name: "INVALIDADMINNAMEORADMINPASSWORD" };
      }
      if (!compareHash(adminPassword, adminLogin.password)) {
        throw { name: "INVALIDADMINNAMEORADMINPASSWORD" };
      }
      const payload = {
        adminId: adminLogin.id,
      };
      const accessToken = createToken(payload);
      res.status(200).json({
        access_token: accessToken,
        adminId: adminLogin.id,
      });
    } catch (error) {
      if (error.name === "INVALIDADMINNAMEORADMINPASSWORD") {
        res.status(401).json({ msg: "INVALID ADMIN NAME OR ADMIN PASSWORD" });
      } else {
        res.status(500).json(error);
      }
    }
  }
  static async getAlumni(req, res) {
    try {
      const alumniList = await Alumni.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      res.status(201).json(alumniList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
