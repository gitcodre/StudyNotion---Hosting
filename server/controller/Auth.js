const otpGenerator = require('otp-generator');
const User = require('../models/User');
const Otp = require('../models/Otp');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const mailSender = require('../util/mailSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require('dotenv').config();
// Create OTP
// Email send karna otp ka aur db mei save karna otp ko 
exports.generateOtp = async(req,res) => {
    try
    {
        const{email} = req.body;

        // Check if user already exist coz mei otp new user ke liye hi generate krunga
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent)
        {
            return res.status(401).json({
                success:false,
                message:'Otp cannot be generated !! User Already Exists',
            })   
        }

        // Generate OTP
        let otp =  otpGenerator.generate(6,{
            upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
        })
        console.log('Otp : ',otp);//this will contain number otp only
         
        // I also have to check jo otp generate hua hai wo unique ho 
        // mei check kr rha hu ki jo bhi otp hai kya wo db mei present to nhi hai 
        let result = await Otp.findOne({otp});
        console.log("Result is Generate OTP Func");
		console.log("OTP", otp);
		console.log("Result", result);
        // Agar mujhe Db mei se otp mil rha hai purana wala tb tk mei generate krta rahunga naya wala otp
        // Agar wo present hai to wapas generate kro aur check kro 
        while(result)
        {
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets: false,
			    lowerCaseAlphabets: false,
			    specialChars: false,
            })
            result = await Otp.findOne({otp});
        }

        // Db mei entry daal do 
        // Db mei entry daalne se phele email send ho jaayega kyuki pre middleware ka use kiya gaya hai 
        const otpPayload = {email,otp};
        const otpBody = await Otp.create(otpPayload);
        console.log('Db OTP : ', otpBody);

        res.status(200).json({
            success:true,
            message:'Otp Created Successfully',
            otp,
        })
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Error While Creating Otp',
        })
    }
}

// Signup
exports.signup = async(req,res) => {
    try
    {
        // Step 1 : Extract all the details from req body
        const{
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            contactNumber,
            accountType,
            // user jo enter karega wo otp 
            otp, 
        } = req.body;

        // Step 2 : Validate the fields
        // Step 2|a: Check if fields empty or not
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
        {
            return res.status(403).json({
                success:false,
                message:'Please fill all the Details Carefully',
            })
        }
        // Step 2|b: Check password or confirm password match or not
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:'Password do not match',
            })
        }
        // Step 2|c: Check if user already Exists or not
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent)
        {
            return res.status(401).json({
                success:false,
                message:'User already exists. Please login instead.',
            })   
        }
        // Step 3 : Find the most recent Otp from the db 
        // Now I want to extract most recent otp from the database to match with user's otp which was send him to email 
        // Iske aadhar pr mujhe mera most recent otp mil jaayega db mei se 
        const recentOtp = await Otp.findOne({email}).sort({createdAt:-1});
        console.log('Recent Otp : ',recentOtp);
        
        // Step 4 : Match the db recent otp with user's mail one otp
        // Validate kro tumhare recent otp ko 
        if(!recentOtp)
        {
            return res.status(401).json({
                success:false,
                message:'Otp is not been generated',
            })
        }
        // otp is jo user ne otp type kiya aur recentOtp.otp means jo asal wala db mei otp hai 
        else if(otp !== recentOtp.otp)
        {
            return res.status(401).json({
                success:false,
                message:'Otp do not match',
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        // Create the user new Thing    .....
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

        // Now user has signed up now we have to store all its info in db
        // Create a entry in db
        // To add additional details we need profile model id to need profile model id we have to create profile model
        // Entry save krdi db mei to mujhe id mil jaayega
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            contactNumber,
            accountType,
            // Additonal details mei profile model ki id reheti thi
            // Mujhe object id chaiye additionalDetails ki
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        })

        // return res
        return res.status(200).json({
            success:true,
            message:'User is registered Successfully',
            user,
        })
    }
    catch(err)
    {
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'User Cannot be Registered',
        })
    }
}

// Login 
exports.login = async(req,res) => {
    try
    {
        const{email,password} = req.body;
        // Validate
        if(!email || !password)
        {
            return res.status(403).json({
                success:false,
                message:'Please fill all the Details Carefully',
            });
        }
        const user = await User.findOne({email}).populate('additionalDetails');
            if(!user)
            {
                return res.status(401).json({
                success:false,
                message:'User doesnt Exist ! Please Signup first',
            }) 
        }
        // Password ko match karna hai 
        if(await bcrypt.compare(password,user.password))
        {
            // Login karna hai 
            // Jwt token bhejo 
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'2h',
            })
            user.token = token;
            user.password = undefined;

            //Send Cookie 
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,

            }
            // Ye jo token hai wo user ke pass aa gaya now he can use it to make request 
            res.cookie('token',token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in Successfully'
            })
        }
        else
        {
            // Password do not match 
            return res.status(401).json({
                success:false,
                message:'Your Password is Incorrect'
            })
        }
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({
            success:false,
            message:'Login Failure Please try again Later',
        })
    }
}
// Change Password
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword} = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} 
    catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};