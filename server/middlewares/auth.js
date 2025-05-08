// const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

// exports.auth = async (req, res, next) => {
//     try{
//         const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");
//         if(!token){
//             return res.status(401).json({
//                 success: false,
//                 message: "Token is missing"
//             })
//         }

//         //verify the token
//         try{
//             const decode =  jwt.verify(token, process.env.JWT_SECRET);
//             console.log(decode);
//             req.user = decode;
//         }
//         catch(error){
//             return res.status(403).json({
//                 success: false,
//                 message: "iiiiInvalid token"
//             })
//         }
//         next(); 
//     }
//     catch(error){
//         return res.status(403).json({
//             success: false,
//             message: "Error in authentication"
//         })
//     }
// }


// exports.auth = async (req, res, next) => {
// 	try {
// 		// Extracting JWT from request cookies, body or header
// 		const token =
// 			req.cookies.token ||
// 			req.body.token ||
// 			req.header("Authorisation").replace("Bearer ", "");

//             // console.log("ye raha apna tokennnnnnnnnnnnnnnnn", token)
// 		// If JWT is missing, return 401 Unauthorized response
// 		if (!token) {
// 			return res.status(401).json({ success: false, message: `Token Missing` });
// 		}

// 		try {
// 			// Verifying the JWT using the secret key stored in environment variables
//             console.log("before run")
// 			const decode =  jwt.verify(token, process.env.JWT_SECRET);
//             console.log("after run ", decode)
// 			console.log(decode);
// 			// Storing the decoded JWT payload in the request object for further use
// 			req.user = decode;
// 		} catch (error) {
// 			// If JWT verification fails, return 401 Unauthorized response
//             console.log(error)
// 			return res
// 				.status(401)
// 				.json({ success: false, message: "token is invalid" });
// 		}

// 		// If JWT is valid, move on to the next middleware or request handler
// 		next();
// 	} catch (error) {
//         console.log(error)
// 		// If there is an error during the authentication process, return 401 Unauthorized response
// 		return res.status(401).json({
// 			success: false,
// 			message: `Something Went Wrong While Validating the Tokenn`,
// 		});
// 	}
// };

exports.auth = async (req, res, next) => {
	try {
		// Extracting JWT from request cookies, body or header
		const token =
			req.cookies.token ||
			req.body.token ||
			req.header("Authorisation").replace("Bearer ", "");

		// If JWT is missing, return 401 Unauthorized response
		if (!token) {
			return res.status(401).json({ success: false, message: `Token Missing` });
		}

		try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.user = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}

		// If JWT is valid, move on to the next middleware or request handler
		next();
	} catch (error) {
		// If there is an error during the authentication process, return 401 Unauthorized response
        console.log(error)
		return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
	}
};

exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "Thses is a protected route for student only"
            })
        }
        next();
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User role can not be verify"
        })
    }
}

exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "Thses is a protected route for Instructor only"
            })
        }
        next();

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User role can not be verify"
        })
    }
}

exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "Thses is a protected route for Admin only"
            })
        }
        next();

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User role can not be verify"
        })
    }
}