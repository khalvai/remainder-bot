import mongoose  from "mongoose";

export interface meetingDocument  {
 time :Date,
 message: string,
 userId: number   
}

const meetingSchema= new mongoose.Schema({

    time:{type:Date},
    message:{ type:String},
    userId:{type:Number }
}) 


const meeting= mongoose.model<meetingDocument>("Meeting",meetingSchema)

export default meeting;

