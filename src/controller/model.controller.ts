import moment from "jalali-moment";
import date , {meetingDocument} from "../model/date.model";
import {createDate,casheAllDates,getAllUserDate} from "../service/date.service"
export default class Meeting{

 async createDate(date:meetingDocument){

   const createdDate =await createDate(date);
     return createdDate;
 };

 static async getAllUserDate(userId:number){
      const allDates = await  getAllUserDate(userId);
      return allDates;
 }
 
 
}



export async function getAllDates(){
  const allDates= await casheAllDates();
  return allDates;
 }