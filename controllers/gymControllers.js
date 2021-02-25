const { Gym, Class } = require("../db/models");

// fetch is not a controller just a function
exports.fetchGym = async (gymId, next) => {
  try {
    const foundGym = await Gym.findByPk(gymId);
    return foundGym;
  } catch (error) {
    next(error);
  }
};

//Gym List

exports.gymList = async (req, res, next) => {
  try {
    const _gyms = await Gym.findAll({
      attributes: req.body,
      include: {
        model: Class,
        as: "classes",
        attributes: ["id"],
      },
    });
    res.status(200).json(_gyms);
  } catch (error) {
    next(error);
  }
};

//Gym Detail

exports.gymDetail = async (req, res, next) => {
  res.json(req.gym);
};

//Gym Create
exports.gymCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newGym = await Gym.create(req.body);
    res.status(201).json(newGym);
  } catch (error) {
    next(error);
  }
};
// exports.gymCreate = async (req, res, next) => {
//   try {
//     const foundGym = await Gym.findOne({ where: { userId: req.user.id } });

//     if (foundGym) {
//       next({
//         status: 400,
//         message: "You Can Not Create A Gym!!",
//       });
//     } else {
//       if (req.file) {
//         req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//       }
//       req.body.userId = req.user.id; // req.user is coming from jwt strategy
//       //no id in URL for post in gyms
//       const newGym = await Gym.create(req.body);
//       res.status(201).json(newGym);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// //Classe Creat from Product
// exports.classCreate = async (req, res, next) => {
//   try {
//     // passport vs model
//     if (req.user.id === req.gym.userId) {
//       if (req.file) {
//         // coming form route parmes middleare
//         req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//       }
//       req.body.gymId = req.gym.id;
//       const newClass = await Class.create(req.body);
//       res.status(201).json(newClass);
//     } else {
//       next({
//         status: 404,
//         message: "You Shall Not Pass!!",
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
//Classe Creat from Product
exports.classCreate = async (req, res, next) => {
  try {
    if (req.file) {
      // coming form route parmes middleare
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
};
//Gym Update
// exports.gymUpdate = async (req, res, next) => {
//   try {
//     const foundGym = await Gym.findByPk(req.gym.gymId);
//     if (req.user.id === foundGym.userId) {
//       if (req.file) {
//         req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//       }
//       await req.gym.update(req.body);
//       res.status(200).json(req.gym);
//       //send back the updated gym
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

//Gym Delete

// exports.gymDelete = async (req, res, next) => {
//   try {
//     const foundGym = await Gym.findByPk(req.gym.gymId);
//     if (req.user.id === foundGym.userId) {
//       await req.gym.destroy();
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
