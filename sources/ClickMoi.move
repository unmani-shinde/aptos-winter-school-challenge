module click_moi_addr::ClickApt{
    use std::signer;

    struct GlobalCount has key,store {
        count: u64 
    }

    public fun get_count(addr: address): u64 acquires GlobalCount {
        assert!(exists<GlobalCount>(addr), 0);
        *&borrow_global<GlobalCount>(addr).count
    }

    public entry fun increment(account: signer) acquires GlobalCount {
        let addr = signer::address_of(&account);
        if (!exists<GlobalCount>(addr)) {
            move_to(&account, GlobalCount {
                count: 0
            })
        } else {
            let old_count = borrow_global_mut<GlobalCount>(addr);
            old_count.count = old_count.count + 1;
        }
    }
}