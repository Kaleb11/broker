const { itemimage, Sequelize } = require("../../models");
const Op = Sequelize.Op;
const paginate = require("../../utils/pagination");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
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
    const { rows, count } = await itemimage.findAndCountAll({
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
    let data = await itemimage.findOne({
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
self.getImageByProductID = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await itemimage.findAll({
      where: {
        item_id: id,
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
    let data = await itemimage.findAll({
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
    const { product_id } = req.params;
    const reqimage = req.files.image || {};

    if (!product_id) {
      return res.status(400).send({ message: "product id is empty" });
    }

    if (!reqimage) {
      return res.status(400).send({ message: "file is empty" });
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
      "images/productimages",
      `${checkedNew}.${ext}`
    );
    const filePathh = filePath.split("public").pop();
    const pat = filePath;

    const imagee = { item_id: product_id, url: filePathh };
    const ll = await image.create(imagee);
    if (!ll) {
      return res.status(500).send({ message: "Failed to create image" });
    }

    const file = req.files.image;
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

self.update = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = await itemimage.update(body, {
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

self.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await itemimage.destroy({
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
