const { Class, Gym, Type } = require("../db/models");

// fetch is not a controller just a function
exports.fetchClass = async (classId, next) => {
  try {
    const foundClass = await Class.findByPk(classId);
    return foundClass;
  } catch (error) {
    next(error);
  }
};

//Class List

exports.classList = async (req, res, next) => {
  try {
    const _classes = await Class.findAll({
      attributes: req.body,
      include: [
        {
          model: Gym,
          as: "gym",
          attributes: ["id"],
        },
        {
          model: Type,
          as: "type",
          attributes: ["id"],
        },
      ],
    });
    res.status(200).json(_classes);
  } catch (error) {
    next(error);
  }
};

//Class Detail

exports.classDetail = async (req, res, next) => {
  res.json(req.class);
};
