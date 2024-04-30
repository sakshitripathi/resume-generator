const OpenAI = require("openai");
const express = require("express");
const path = require("path");
//const fs
const multer = require("multer");
const app = express();
const cors = require("cors");
//const nodemailer = require('nodemailer');
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
app.use("/imageFiles", express.static("imageFiles"));
app.use(express.json());
app.use(cors());

const createID = () => Math.random().toString(36).substring(2, 10);

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "imageFiles");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({
	storage: storage,
	limits: { fileSize: 1024 * 1024 * 5 },
});
//new key
const openai = new OpenAI({
	apiKey: <>,
});



const fileDatabase = [];

const generateChatgptResponse = async (text) => {
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo", 
		max_tokens: 150,
		messages: [
			{
			  role: "user",
			  content: text
			}
		  ]
	  });
	  
	  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
	  console.log(text)
	  console.log(response.choices[0].message)

	  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
	return response.choices[0].message;
};

app.post("/build/resume", upload.single("passportsizeImage"), async (req, res) => {
	const {
		userName,
		presentRole,
		tenure,
		technologies,
		jobHistory,
	} = req.body;

	const jobArray = JSON.parse(jobHistory);
	//photo upload 
	const newEntry = {
		id: createID(),
		userName,
		photourl: `http://localhost:8000/imageFiles/${req.file.filename}`,
		presentRole,
		tenure,
		technologies,
		jobHistory: jobArray,
	};
//const userText1='make a resume, with my details-${userName}\n role:
	const userText1 = `I am making a resume, my details are \n name: ${userName} \n role: ${presentRole} (${tenure} years). \n i am proficient in technologies :  ${technologies}. write a 100 words description for the top of my resume introduction(first person writing)?`;
//const userText2='make a resume, with my details-${userName}\n role:
	const userText2 = `I am making a resume, my details are\n name: ${userName} \n role: ${presentRole} (${tenure} years). \n i am proficient in technlogies: ${technologies}. Can you write 10 points for the resume stating i am good at these?`;

	const additionalText = () => {
		let simpleText = "";
		for (let i = 0; i < jobArray.length; i++) {
			simpleText += ` ${jobArray[i].name} as a ${jobArray[i].position}.`;
		}
		return simpleText;
	};

	const userText3 = `I am making a resume, my details are  \n name: ${userName} \n role: ${presentRole} (${tenure} years). \n  during my tenure I worked at ${
		jobArray.length
	} companies. ${additionalText()} \n Please write 50 words about each company, listing them in the order of my career and using "I" to describe my roles?`;
	console.log("userText1",userText1)
	console.log("userText2",userText2)
	console.log("userText3",userText3)
	const textOjectR = await generateChatgptResponse(userText1);
	const notablesR = await generateChatgptResponse(userText2);
	console.log(notablesR)
	const workDutiesR = await generateChatgptResponse(userText3);
	const textOject=textOjectR.content
	const notables=notablesR.content
	console.log(notables)
	const workDuties=workDutiesR.content
	const chatgptData = { textOject, notables, workDuties };
	const data = { ...newEntry, ...chatgptData };
	fileDatabase.push(data);
	console.log("data",data)

	res.json({
		message: "Request success",
		data,
	});
});

app.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});
