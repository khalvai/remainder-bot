import  moment from 'jalali-moment';



export function format(userInput: string) {
  const inputs = userInput.split('\n');
  const dateArray = inputs[0].split(' ');
  let date = dateArray[dateArray.length - 1];
  const [_, ...messagesArray] = inputs;
  const message = messagesArray.join(' ');
  return [date, message];
}


 export function isValidDate (date:string){
  return moment(date,"YYYY/MM/DD").isValid()
 }

 export function converDateToMildai(date:string){
 return moment.from(date, 'fa', 'YYYY/M/D').format('YYYY-MM-DD');
 }