import { LightningElement,track } from 'lwc';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';
import DeleteContacts from '@salesforce/apex/ContactController.DeleteContacts';
import getContactsListLookup from '@salesforce/apex/ContactController.getContactsListLookup';

export default class DataTablePractice extends LightningElement {
    @track columns = [
        {label: 'Name',fieldName: 'Name',type:'text'},
        { label: 'Email', fieldName: 'Email', type: 'email' },
        {label: 'Phone', fieldName: 'Phone', type: 'phone' },
        {}
    ]

    @track data = [];
    @track selctedrows=[];

    connectedCallback(){
        this.getContacts();
    }

    getContacts(){
        getAllContacts().then(result=>{
            this.data = result
            console.log('Data', result);
        }).catch(error=>{
            console.log(error);
        })
    }
    handlerowSelection(event){
        this.selctedrows = event.detail.selectedRows;
        console.log('selctedrows',JSON.stringify(this.selectedRows));
        console.log('selctedrows',this.selectedRows);
    }

    handleDelete(event){
        DeleteContacts({ContactsToDelete:this.selctedrows}).then(result=>{
            this.getContacts();
        }).catch(error=>{
            console.log(error);
        })
    }
}
