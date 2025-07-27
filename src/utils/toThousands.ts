function  formatNumberToThousands(number:number):string {
  if(isNaN(number)) {
    throw new Error('必须是一个有效数字');
  }
  const [integer, decimal] = number.toString().split('.');
  let formatterInteger = ''
  for(let i = integer.length-1; i >=0; i--) {
    formatterInteger = integer[i] + formatterInteger
    if ((integer.length- i )%3 === 0 && i!==0){
      formatterInteger = ","+formatterInteger
    }
  }
  return decimal ? `${formatterInteger}.${decimal}` : formatterInteger;
}


export  default formatNumberToThousands
