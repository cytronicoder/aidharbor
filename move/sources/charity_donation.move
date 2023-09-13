module charity_donation::CharityDonation {
    use std::error;
    //use std::signer;
    use aptos_std::smart_table::{Self, SmartTable};
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin;
    //use charity_donation::abc_coin;
    //use aptos_framework::aptos_account;

    // struct Charity records the address of the charity and their corresponding apt raised
    struct Charity has key,store,drop,copy {
        charity_wallet: address,
        apt_raised: u64,
    }

    // stores total value raised for entire platform
    struct Charities has key {
        charities: SmartTable<address, Charity>,
        total_apt_raised: u64,
    }

    /// charity address not found
    const EACCOUNT_NOT_FOUND: u64 = 0;
    const ERESOURCE_DNE: u64 = 1;
    const EINSUFFICIENT_BALANCE: u64 = 2;

    fun init_module(sender: &signer) {
        let c = Charities {
            charities: smart_table::new<address, Charity>(),
            total_apt_raised: 0,
        };
        move_to(sender, c);
    }

    #[view]
    public fun get_charity_apt_raised(addr: address): u64 acquires Charities {
        let platform = borrow_global_mut<Charities>(@charity_donation);
        assert!(smart_table::contains(&platform.charities, addr), error::not_found(EACCOUNT_NOT_FOUND));
        let charity = smart_table::borrow(&platform.charities, addr);
        charity.apt_raised
    }

    #[view]
    public fun get_platform_apt_raised(): u64 acquires Charities {
        let platform = borrow_global_mut<Charities>(@charity_donation);
        platform.total_apt_raised
    }

    //acquires Charities
    public entry fun add_charity(addr: address) acquires Charities {
        let platform = borrow_global_mut<Charities>(@charity_donation);
        if (!smart_table::contains(&platform.charities, addr)) {   
            let newCharity = Charity {
                charity_wallet: addr,
                apt_raised: 0
            };
            
            smart_table::upsert(&mut platform.charities, addr, newCharity);
        }
    }


    // adds to apt_raised of the Charity (based on address), adds to total_apt_raised of the platform
    // sends a reward token to the donor
    public entry fun donate_to_charity(sender: &signer, charity_address: address, amount_in_apt: u64) acquires Charities {
        let platform = borrow_global_mut<Charities>(@charity_donation);

        //transfer to token from donor to charity
        coin::transfer<AptosCoin>(sender, charity_address, amount_in_apt);
        //update the charity total raised value
        let charityToUpdate = smart_table::borrow_mut(&mut platform.charities, charity_address);
        let new_total_value_for_charity = charityToUpdate.apt_raised + amount_in_apt;
        charityToUpdate.apt_raised = new_total_value_for_charity;
        //update the platform total raised value
        let oldPlatformValue = platform.total_apt_raised;
        let newPlatformValue = oldPlatformValue + amount_in_apt;
        platform.total_apt_raised = newPlatformValue;

        //send native abc coin to the sender
        // let sender_address = signer::address_of(sender);
        // charity_donation::abc_coin::mint(@charity_donation,sender_address,amount_in_apt);
    }
    
}
