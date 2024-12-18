require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const { authenticateToken } = require("./utilities");

const User = require("./models/user.model");
const Plants = require("./models/plantsModel");
const upload = require("./multer");
const { error } = require("console");
const { title } = require("process");

mongoose.connect(config.connectionSting);

const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: "*" }));


//create account
app.post("/create-account",async (req,res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res
          .status(400)
          .json({error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({email });
    if (isUser) {
        return res
          .status(400)
          .json({error: true, message: "User already exists"});

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.status(201).json({
        error: false,
        user: { fullName: user.fullName, email: user.email},
        accessToken,
        message: "Registration Successful",
    });
});

//login
app.post("/login",async (req,res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required"});   
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "72h",
        }
    );

    return res.json({
        error: false,
        message: "Login Successful",
        user: { fullName: user.fullName, email: user.email },
        accessToken,
    });

});

//get user
app.get("/get-user",authenticateToken, async (req,res) => {
    const { userId } = req.user;

    const isUser = await User.findOne({ _id: userId });

    if (!isUser) {
        return res.sendStatus(401);
    }

    return res.json({
        user: isUser,
        message: "",

    });

});

//route to handle image upload
app.post("/image-upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res
              .status(400)
              .json({ error:true, message: "No image upload" });
        }

        const imageUrl = `http://localhost:8000/uploads/${req.file.filename}` ;
        res.status(201).json({ imageUrl });
    }   catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }

    try {
        //extract filename
        const filename = path.basename(imageUrl);

        //define file path
        const filePath = path.join(__dirname, 'uploads', filename);

        //check the file's existance
        if (fs.existsSync(filePath)) {
            //delete file
            fs.unlinkSync(filePath);
            res.status(200).json({ message: "Image deleted successfully" });            
        } else {
            res.status(200).json({ error: true, message: "Image not found" });
        }
    }   catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

//delete image
app.delete("/delete-image", async (req, res) => {
    const { imageUrl } = req.query;

    if (!imageUrl) {
        return res
          .status(400)
          .json({ error:true, message: "imageUrl parameter is required" });
    }

    try {
        // Extract the filename from the provided imageUrl
        const filename = path.basename(imageUrl);

        // Construct the file path in the uploads directory
        const filePath = path.join(__dirname, "uploads", filename);

        // Check if the file exists
        if (fs.existsSync(filePath)) {
            // Delete the file
            fs.unlinkSync(filePath);
            res.status(200).json({ message: "Image deleted successfully" });
        }   else {
            return res.status(404).json({ error: true, message: "Image not found" });
        }
    } catch (error) {
        return res.status(500).json({ error: true, message: error.message });
    }

});


//serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")) );
app.use("/assts", express.static(path.join(__dirname, "assets")) );

//add plants
app.post("/add-plant", authenticateToken, async (req,res) => {
    const { title, description, imageUrl, price } = req.body;

    //validate important fields
    if (!title || !description || !imageUrl || !price) {
        return res.status(400).json({ error: true, message: "All fields are required"});
    }

    try {
        const plant = new Plants({
            title,
            description,
            imageUrl,
            price,
        });

        await plant.save();
        res.status(201).json({ title: plant, message:'Added Successfully' });        
    }   catch (error) {
        res.status(400).json({ error: true, message: error.message});
    }

});

//get plants
app.get("/get-plant", authenticateToken, async (req, res) => {
    try {
        // const { userId } = req.user;
        const plant = await Plants.find().sort({ 
            isFavourite: -1,
        });
        console.log(plant.length);
        res.status(200).json({ plant });
    }   catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

//edit plants
app.put("/edit-plant/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, imageUrl, price } = req.body;
    const { userId } = req.user;

    // console.log("Edit Plant Request:", { id, title, description, imageUrl, price, userId });


    if (!title || !description || !imageUrl || !price) {
        return res
          .status(400)
          .json({ error: true, message: "All fields are required"});
    }

    try {
        //find plants by id
        const plant = await Plants.findOne({ _id: id, userId: userId });

        if (!plant) {
            return res.status(404).json({ error: true, message: "Plant not found" });
        }

        const placeholderImgUrl = `http://localhost:8000/assets/30872fc6960c77e481b811c02b012a3f.png` ;

        plant.title = title;
        plant.description = description;
        plant.imageUrl = imageUrl || placeholderImgUrl;
        plant.price = price;

        await plant.save();
        res.status(200).json({ title: plant, message: "Update Successful" });
    }   catch (error) {
        //console.error("Error in /edit-plant:", error);
        res.status(500).json({ error: true, message: error.message });
    }
});

//delete plant
app.delete("/delete-plant/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const {userId } = req.user;

    try {
        const plant = await Plants.findOne({ _id: id, userId: userId });

        if (!plant) {
            return res.status(404).json({ error: true, message: "Plant not found" });
        }

        //delete from database
        await plant.deleteOne({ _id: id, userId: userId });

        //extracct the filename
        const imageUrl = plant.imageUrl;
        const filename = path.basename(imageUrl);

        //define the file
        const filePath = path.join(__dirname, 'uploads', filename);

        //delete the image file
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Failed to delete image file:", err);

            }
        });

        res.status(200).json({ message: "plant deleted successfully" });

    }   catch (error) {
        //console.error("Error in /edit-plant:", error);
        res.status(500).json({ error: true, message: error.message });
    }


});

//update isfavourite
app.put("/update-is-favourite/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { isFavourite } = req.body;
    const { userId } = req.user;

    try {
        const plant = await Plants.findOne({ _id: id, userId: userId });

        if (!plant) {
            return res.status(404). json({ error: true, message: "Plant not found" });
        }

        plant.isFavourite = isFavourite;

        await plant.save();
        res.status(200).json({ title:plant, message: 'Update Successful' });
    }   catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }

});

//search plant
app.get("/search", authenticateToken, async (req, res) => {
    const { query } = req.query;
    const { userId } = req.user;

    if (!query) {
        return res.status(404).json({ error: true, message: "query is required" });
    }

    try {
        const searchResults = await Plants.find({
            userId: userId,
            $or: [
                { title: { $regex: query, $options: "i" }},
                { description: { $regex: query, $options: "i" }},
            ],
        }).sort({ isFavourite: -1 });

        res.status(200).json({Plants: searchResults});
    }   catch (error) {
        res.status(500).json({ error: true, message: error.message });

    }
});

//filter plants by price
app.get("/plant-filter", authenticateToken, async (req, res) => {
    const { startPrice, endPrice } = req.query;
    const { userId } = req.user;

    const start = parseFloat(startPrice);
    const end = parseFloat(endPrice);

    if (isNaN(start) || isNaN(end)) {
        return res.status(400).json({ error: true, message: "startPrice and endPrice must be valid numbers" });
    }

    try {
        const filteredPlants = await Plants.find({
            userId: userId,
            price: { $gte: start, $lte: end},
        }).sort({ isFavourite: -1 });

        res.status(200).json({plants: filteredPlants});
    }   catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
});

app.listen(8000);
module.exports = app;