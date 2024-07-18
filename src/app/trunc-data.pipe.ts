import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncData'
})

// take a string as the input value and 
// parameters 'number of words' - the number of words after which the string truncates (default 4)
//  and 'string after' - the string to attach at the end after truncating the string (default ...)
export class TruncDataPipe implements PipeTransform {

  transform(value: string, param1: number = 4, param2: string = '...'): string {
    
    let valueNew = '';
    let valueWords: string[] = value.split(" ");
    
    // run loop until 4 or specified number of words via parameter
    for (let index=0; index<param1 && index<valueWords.length; index++) {
      valueNew += valueWords[index]+" ";   
    }

    // add '...' or specified string via parameter 
    valueNew = valueNew.trim() + param2;

    console.log(valueNew);
    
    return valueNew;
  }

}
