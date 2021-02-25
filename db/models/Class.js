const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    numOfSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
      },
    },
    bookedSeats: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        min: 1,
        isGreater(value) {
          if (value > this.numOfSeats) {
            throw new Error(
              "Booked Steats must be less than the Number of Seats."
            );
          }
        },
      },
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      validate: {
        min: 1,
      },
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //will chnage later based on the borad demand
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: "2021-02-24",
      },
    },

    image: {
      type: DataTypes.STRING,
      // isUrl: true,
      allowNull: false,
      // validate: {
      //   isUrl: true,
      // },
    },
  });

  SequelizeSlugify.slugifyModel(Class, {
    source: ["name"],
  });

  return Class;
};
