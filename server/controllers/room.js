const { Room } = require("../models");

class RoomController {
  static async createRoom(req, res, next) {
    try {
      const { roomCode } = req.body;

      const room = await Room.create({
        roomCode,
      });

      res.status(201).json({
        message: "Room created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRoom(req, res, next) {
    try {
      const { roomCode } = req.body;

      const roomFound = await Room.findOne({
        where: {
          roomCode,
        },
      });

      if (!roomFound) {
        throw { statusCode: 404 };
      } else if (roomFound.totalUser > 1) {
        throw { statusCode: 403 };
      }

      const increaseTotalUser = await roomFound.increment("totalUser");

      res.status(200).json({
        message: "Room updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteRoom(req, res, next) {
    try {
      const { roomCode } = req.body;

      const deleteRoom = await Room.destroy({
        where: {
          roomCode,
        },
      });

      res.status(200).json({
        message: "Room deleted successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = RoomController;
