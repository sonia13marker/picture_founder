const express = require('express')
const path= require("path")

express.static("../../")
let images = path.join("/");
console.log(images);