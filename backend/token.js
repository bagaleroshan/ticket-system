//generate token
import jwt from "jsonwebtoken";
let infoObj = {
  id: "123",
};
 let secretKey = "dw12";
let expiryInfo = {
  expiresIn: "365d",//365day
}; 
 let token = jwt.sign(infoObj, secretKey, expiryInfo);


//token verify
let myToken= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMyIsImlhdCI6MTcwOTcxODIzNywiZXhwIjoxNzQxMjU0MjM3fQ.5hloRaMGdsKvqRG6icwwNafAHGJBdVZL0jUYic9I7eE"
try {
    let infoObj1=jwt.verify(myToken,"dw12")
    console.log(infoObj1)
} catch (error) {
    console.log(error.message)
}