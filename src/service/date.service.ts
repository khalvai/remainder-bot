import date, { meetingDocument } from '../model/date.model';

export async function createDate(input: meetingDocument) {
  const meet = await date.create(input);
  return meet;
}

export async function casheAllDates(){
  const allDates=  await  date.find().select("-_id -__v");
  return allDates;
}

export async function getAllUserDate(userId:number){
 const allDates= await date.find({userId:userId})

 return allDates;
}