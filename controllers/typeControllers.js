const { Type, Class } = require("../db/models");

// fetch is not a controller just a function
exports.fetchType = async (typeId, next) => {
  try {
    const foundType = await Type.findByPk(typeId);
    return foundType;
  } catch (error) {
    next(error);
  }
};

//Type List
exports.typeList = async (req, res, next) => {
  try {
    const _types = await Type.findAll({
      attributes: req.body,
      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
      },
    });
    res.status(200).json(_types);
  } catch (error) {
    next(error);
  }
};

//Type Detail

exports.typeDetail = async (req, res, next) => {
  res.json(req.type);
};

//Type Create
exports.typeCreate = async (req, res, next) => {
  try {
    const newType = await Type.create(req.body);
    res.status(201).json(newType);
  } catch (error) {
    next(error);
  }
};

//Type Update
// exports.typeUpdate = async (req, res, next) => {
//   try {
//     const foundType = await Type.findByPk(req.type.typeId);
//     if (req.user.id === foundType.userId) {
//       if (req.file) {
//         req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//       }
//       await req.type.update(req.body);
//       res.status(200).json(req.type);
//       //send back the updated type
//     } else {
//       next({
//         status: 401,
//         message: "You Shall Not Pass!!",
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

//Type Delete

// exports.typeDelete = async (req, res, next) => {
//   try {
//     const foundType = await Type.findByPk(req.type.typeId);
//     if (req.user.id === foundType.userId) {
//       await req.type.destroy();
//       res.status(204).end();
//     } else {
//       next({
//         status: 401,
//         message: "You Shall Not Pass!!",
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
