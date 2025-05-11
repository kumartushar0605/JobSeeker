import { Resume } from "../models/Userr.js";
import { VisitorSchema } from "../models/Visitor.js";


export const ResumePost = async(req,res)=>{
   try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json({ message: 'Resume saved successfully!' });
  } catch (error) {
    console.error('Failed to save resume:', error);
    res.status(500).json({ error: 'Server error saving resume' });
  }
}

export const Visitorregister = async(req,res)=>{
    try {
        const { name, phone, password ,email} = req.body;
        console.log(email)

       
        const existingHospital = await VisitorSchema.findOne({ contactNumber:phone });
      
        if (existingHospital) {
          return res.status(400).json({ message: " already registered!" });
        }
    
       
       
    
      
        const newl = new VisitorSchema({
         name,
          contactNumber:phone,
          password,
          email
        });
   
        await newl.save();
         res.status(201).json({
      message: 'Filtered data stored successfully',
     newl
    });
    
      
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }

};


export const VisitorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const h = await VisitorSchema.findOne({ email });
    if (!h) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    if (password !== h.password) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

   
    return res.status(201).json({ message: 'Login successful' });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const getResume = async (req, res) => {
   const { email } = req.params;
  console.log(email)

  try {
    const resume = await Resume.findOne({ 'personalInfo.email': email });
    console.log(resume)

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resume data', error });
  }
};