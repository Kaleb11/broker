const { photo, Sequelize } = require("../../models");
const Op = Sequelize.Op;
const paginate = require("../../utils/pagination");
const dotenv = require("dotenv");
const usrData = require("../../utils/userDataFromToken");
dotenv.config();
let self = {};

self.getAll = async (req, res) => {
  const {
    page = process.env.page,
    size = process.env.size,
    order = process.env.order,
  } = req.query;

  const { limit, offset } = paginate.getPagination(page, size);

  try {
    const { rows, count } = await photo.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", order]],
    });

    const response = paginate.getPagingData(
      { rows, count },
      page,
      limit,
      count
    );

    res.send(response);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "An error occurred while retrieving data.",
    });
  }
};

self.get = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await photo.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      data: data ? data : {},
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

self.search = async (req, res) => {
  try {
    let text = req.query.text;
    let data = await photo.findAll({
      where: {
        name: {
          [Op.like]: "%" + text + "%",
        },
      },
    });
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

self.save = async (req, res) => {
  try {
    const body = req.body;
    const reqimage = req.files.photo || {};

    if (!reqimage) {
      return res.status(400).send({ message: "file is empty" });
    }
    if (!body.type) {
      return res.status(400).send({ message: "type is empty" });
    }
    let usr = await usrData.userData(req, res);
    if (!usr) {
      return;
    }
    const ext = reqimage.mimetype.split("/")[1];
    const rand = Math.floor(100000 + Math.random() * 900000);
    const { name } = reqimage;
    name = name.replace(/\s+/g, "");
    const parsedName = path.parse(name).name;
    const checkedNew = parsedName.concat(rand);
    const filePath = path.join(
      __dirname,
      "../../public",
      "images/photos",
      `${checkedNew}.${ext}`
    );
    const filePathh = filePath.split("public").pop();
    const pat = filePath;

    const photoData = { user_id: usr.usrID, url: filePathh, type: body.type };
    const ll = await photo.create(photoData);
    if (!ll) {
      return res.status(500).send({ message: "Failed to create photo" });
    }

    const file = req.files.photo;
    file.mv(pat, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });

    return res.status(200).json({ data: ll });
  } catch (error) {
    console.log("The error is", error);
    res.status(500).json({ message: error.message });
  }
};
self.servePhoto = async (req, res) => {
  try {
    let { type } = req.query;
    let usr = await usrData.userData(req, res);
    if (!usr) {
      return;
    }
    let data = await photo.findOne({
      where: {
        user_id: usr.usrID,
        type: type,
      },
    });
    return res.download(data.url);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
self.update = async (req, res) => {
  try {
    const { id, type } = req.query;
    const body = req.body;
    const reqimage = req.files.photo || {};

    if (!id) {
      return res.status(400).send({ message: "product id is empty" });
    }

    if (!reqimage) {
      return res.status(400).send({ message: "file is empty" });
    }
    let usr = await usrData.userData(req, res);
    if (!usr) {
      return;
    }
    const ext = reqimage.mimetype.split("/")[1];
    const rand = Math.floor(100000 + Math.random() * 900000);
    const { name } = reqimage;
    name = name.replace(/\s+/g, "");
    const parsedName = path.parse(name).name;
    const checkedNew = parsedName.concat(rand);
    const filePath = path.join(
      __dirname,
      "../../public",
      "images/photos",
      `${checkedNew}.${ext}`
    );
    const filePathh = filePath.split("public").pop();
    const pat = filePath;

    const photoData = { user_id: usr.usrID, url: filePathh, type: body.type };
    const ll = await photo.update(photoData, {
      where: {
        id: id,
        type: type,
      },
    });
    if (!ll) {
      return;
    }

    const file = req.files.photo;
    file.mv(pat, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });

    return res.status(200).json({ data: ll });
  } catch (error) {
    console.log("The error is", error);
    res.status(500).json({ message: error.message });
  }
};

self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await photo.destroy({
      where: {
        id: id,
      },
    });
    return res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = self;
