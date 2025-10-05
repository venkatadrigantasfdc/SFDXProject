import { LightningElement,api,wire } from 'lwc';
import getObjectRecords from '@salesforce/apex/GenericRecordTableController.getObjectRecords';
export default class ShowDataTable extends LightningElement {

    @api objectApiName;

    records;
    columns;
    error;

    @wire(getObjectRecords, { objectName: '$objectApiName' })
  wiredRecords({ error, data }) {
    console.log('objectApiName:', this.objectApiName);
    if (data) {
        console.log('Apex returned data:', JSON.stringify(data));
        this.records = data.records;
        this.columns = data.columns;
        this.error = undefined;
    } else if (error) {
        console.error('Apex error:', error);
        this.error = error.body.message;
        this.records = undefined;
        this.columns = undefined;
    }
}
}