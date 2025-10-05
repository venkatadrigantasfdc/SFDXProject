//When the Opportunity gets created or updated check whether an account with the opportunity name exists or not 
//if exists assign that account to the opportunity.

//If not exists create an account with that opportunity name and assign it to the opportunity
trigger Opportunity_trigger on Opportunity (before insert,before update) 
{
    Set<String> oppNames = new Set<string>();
    Map<String, Id> accountMap = new Map<String, Id>();
    
    for(Opportunity opp : Trigger.new)
    {
        if(opp.Name != null)
        {
            oppNames.add(opp.Name);
        }
    }
    
    if(!oppNames.isEmpty()) 
    {
        for (Account acc: [SELECT Id, Name FROM Account WHERE Name IN :oppNames])
        {
            accountMap.put(acc.Name, acc.Id);
        }
    }
    
    List<Account> newAccounts = new List<Account>();
    
    for(opportunity opp : Trigger.new)
    {
        if(opp.Name != null)
        {
            if(accountMap.containsKey(opp.Name))
            {
                opp.AccountId = accountMap.get(opp.Name);
            }
                else {
                    Account newAcc = new Account(Name = opp.Name);
                    
                    newAccounts.add(newAcc);
                    System.debug('Account is created via the opportunity');
                }
            }
        }
        
        if (!newAccounts.isEmpty())
        {
            insert newAccounts;
            
            for(Account acc: newAccounts)
            {
                accountMap.put(acc.Name, acc.Id);
            }
            for( Opportunity opp : Trigger.new)
            {
                if (opp.Name != null && accountMap.containsKey(opp.Name))
                {
                    opp.AccountId = accountMap.get(opp.Name);
                }
            }
        }
    }