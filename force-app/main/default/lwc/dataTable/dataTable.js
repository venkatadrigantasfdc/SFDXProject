import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import updateAccounts from '@salesforce/apex/AccountController.updateAccounts';
import deleteAccount from '@salesforce/apex/AccountController.deleteAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';

const columns = [
    {
        label: 'Account Name',
        fieldName: 'recordLink',
        type: 'url',
        typeAttributes: { label: { fieldName: 'Name' }, target: '_blank' }
    },
    { label: 'Industry', fieldName: 'Industry', type: 'text', editable: true },
    { label: 'Phone', fieldName: 'Phone', type: 'phone', editable: true },
    { label: 'Rating', fieldName: 'Rating', type: 'text', editable: true },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [{ label: 'Delete', name: 'delete' }]
        }
    }
];

export default class DataTable extends NavigationMixin(LightningElement) {
    @track draftValues = [];
    @track error;
    columns = columns;
    hideCheckboxColumn = false;

    wiredAccountsResult; // Holds full wire response

    @wire(getAccounts)
    wiredAccounts(value) {
        this.wiredAccountsResult = value;
    }

    get accounts() {
        const data = this.wiredAccountsResult?.data || [];
        return data.map(row => ({
            ...row,
            recordLink: '/' + row.Id
        }));
    }

    async handleSave(event) {
        const updatedFields = event.detail.draftValues;
        try {
            await updateAccounts({ accountUpdates: updatedFields });
            this.showToast('Success', 'Records updated successfully', 'success');
            this.draftValues = [];
            await refreshApex(this.wiredAccountsResult);
        } catch (error) {
            this.showToast('Error', error.body.message, 'error');
        }
    }

    async handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        if (actionName === 'delete') {
            try {
                await deleteAccount({ accountId: row.Id });
                this.showToast('Deleted', 'Record deleted successfully', 'success');
                await refreshApex(this.wiredAccountsResult);
            } catch (error) {
                this.showToast('Error deleting record', error.body.message, 'error');
            }
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}
