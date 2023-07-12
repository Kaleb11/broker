const {
    category,
    Sequelize
} = require("../../models");
const Op = Sequelize.Op;
const paginate = require("../../utils/pagination");
const dotenv = require('dotenv');
const path = require("path");
const fs = require("fs");
dotenv.config();
let self = {};

self.getAll = async(req, res) => {
    const { page = process.env.page, size = process.env.size, order = "DESC" } = req.query;

    const { limit, offset } = paginate.getPagination(page, size);

    try {
        const { rows, count } = await category.findAndCountAll({
            limit,
            offset,
            order: [
                ['createdAt', order]
            ],
        });

        const response = paginate.getPagingData({ rows, count }, page, limit, count);

        res.send(response);
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message,
        });
    }
}

self.get = async(req, res) => {
    try {
        let id = req.params.id;
        let data = await category.findOne({
            where: {
                id: id
            }
        });
        return res.status(200).json({
            data: (data) ? data : {}
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


self.search = async(req, res) => {
    try {
        let text = req.query.text;
        let data = await category.findAll({
            where: {
                name: {
                    [Op.like]: "%" + text + "%"
                }
            }
        });
        return res.json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.save = async(req, res) => {
    try {
        let body = req.body;
        const reqimage = req.files.image;
    
        if (!reqimage) {
          return res.status(401).send({ message: "file is empty" });
        }
        const ext = reqimage.mimetype.split("/")[1];
        const rand = Math.floor(100000 + Math.random() * 900000);
        let { name } = reqimage;
        
        name = name.replace(/\s+/g, "");
     
        const parsedName = path.parse(name).name;
        const checkedNew = parsedName.concat(rand);
        const filePath = path.join(
          __dirname,
          "../../public",
          "images/categoryimages",
          `${checkedNew}.${ext}`
        );
        const filePathh = filePath.split("public").pop();
       
      
        const dat = { name:body.name,description:body.description, image: filePathh };
        const file = reqimage;
       
        let data = await category.create(dat);
        if (!data) {
            return res.status(500).send({ message: "Failed to create data" });
          }
   
          file.mv(filePath, (err) => {
            if (err) {
              return res.status(500).send(err);
            }
          });
    return res.status(200).json({ data: data });
     
       
    } catch (error) {
        console.log("The error is: ",error)
        res.status(500).json({
            message: error.message
        })
    }
}

self.update = async(req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let data = await category.update(body, {
            where: {
                id: id
            }
        });
        return res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

self.delete = async(req, res) => {
    try {
        let id = req.params.id;
        let data = await category.destroy({
            where: {
                id: id
            }
        });
        return res.json(data)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = self;