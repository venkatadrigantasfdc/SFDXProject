import { LightningElement,track } from 'lwc';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';

export default class CustomDatatable extends LightningElement {

    @track columns = [
            {label: 'Name',fieldName: 'Name',type:'text'},
            { label: 'Email', fieldName: 'Email', type: 'email' },
            {label: 'Phone', fieldName: 'Phone', type: 'phone' },
            {label:'Account Name',fieldName:'AccountId',type:'text'}
        ]

    @track data = [];

    connectedCallback(){
        this.getContacts();
    }

    getContacts(){
        getAllContacts().then((result)=>{
            console.log('Data', result);
            this.data = result.map((item)=>{
                return {...item,AccountId:item.Account.Name}
            })
            /*let tempDataList = JSON.parse(JSON.stringify(result));
            tempDataList.forEach((CurrentItem)=>{
                CurrentItem.AccountId = CurrentItem.Account.Name
            })
            this.data = tempDataList;*/

        }).catch((error)=>{
            console.error(error)
            console.error(error)
        })
    }
}