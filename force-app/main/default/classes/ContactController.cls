public class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllContacts() {
        return [select id, name, phone, Email, account.Name from Contact limit 30];
    }

    @AuraEnabled(cacheable=true)
    public static void DeleteContacts(List<Contact> ContactsToDelete) {

            delete ContactsToDelete;
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsListLookup(){

        return [select id,name,email,phone,Account.Name from Contact limit 30];
    }
}