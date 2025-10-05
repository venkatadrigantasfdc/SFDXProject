import { LightningElement ,track,wire} from 'lwc';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';
export default class DataTableRefresh extends LightningElement {

  @track columns = [
            {label: 'Name',fieldName: 'Name',type:'text'},
            { label: 'Email', fieldName: 'Email', type: 'email' },
            {label: 'Phone', fieldName: 'Phone', type: 'phone' },
            {label:'Account Name',fieldName:'AccountId',type:'text'}
        ]

    @track data = [];

        @wire(getAllContacts)
        wiredata({error,data}){
            if(data){
                console.log('Data', data);
        }else{
            console.error(error);
        }

}
}