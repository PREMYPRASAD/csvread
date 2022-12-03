// { Component } from '@angular/core';
import { Component, VERSION ,ViewChild } from '@angular/core';
import { ModelModule } from './model/model.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csvread';
  name = 'Angular ' + VERSION.major;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay:any;
  csvData:any;

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (csvData as String).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: ModelModule = new ModelModule();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.min = curruntRecord[1].trim();
        csvRecord.max = curruntRecord[2].trim();
        csvRecord.score = curruntRecord[3].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

//check etension
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }

  getJsonData(){
    this.jsondatadisplay = JSON.stringify(this.records);
  }


}

  

