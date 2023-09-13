This is the folder for our project Aptos Move code.

Testnet module https://explorer.aptoslabs.com/account/0x46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb/modules/code/CharityDonation?network=testnet

## Useful Commands to test this repo

NodeJs - start local server in client folder

```
npm start
```

Aptos CLI - check your current account

```
aptos config show-profiles --profile default
```

Aptos CLI - create a new account if required

```
aptos init --profile new
```

Aptos CLI - publish the module

```
aptos move publish --named-addresses charity_donation=default
```

Aptos CLI - add "red cross" wallet (this is a wallet we created in testnet)

```
aptos move run --function-id 'default::CharityDonation::add_charity' --args 'address:0xad66dff3421f9a87dcc401f26a061ee8598c73b24c1ef11fe6ea5b81e98a135a'
```

```
aptos move run --function-id 'default::CharityDonation::add_charity' --args 'address:0x32e5a9e28f5d6d74279ac50edd4b912b196ac8219a7c81037c12ac8fcdf16de4'
```

Aptos CLI - check how much in total the platform has raised for charity

```
aptos move view --function-id 'default::CharityDonation::get_platform_apt_raised'
```

Aptos CLI - check how much "red cross" wallet has raised (return value is in Octa)

```
aptos move view --function-id 'default::CharityDonation::get_charity_apt_raised' --args 'address:0xad66dff3421f9a87dcc401f26a061ee8598c73b24c1ef11fe6ea5b81e98a135a'
```

```
aptos move view --function-id 'default::CharityDonation::get_charity_apt_raised' --args 'address:0x32e5a9e28f5d6d74279ac50edd4b912b196ac8219a7c81037c12ac8fcdf16de4'
```

Aptos CLI - to "red cross" wallet

```
aptos move run --function-id 'default::CharityDonation::donate_to_charity' --args 'address:0xad66dff3421f9a87dcc401f26a061ee8598c73b24c1ef11fe6ea5b81e98a135a' 'u64:100'
```

```
aptos move run --function-id 'default::CharityDonation::donate_to_charity' --args 'address:0x32e5a9e28f5d6d74279ac50edd4b912b196ac8219a7c81037c12ac8fcdf16de4' 'u64:88'
```

Getting the ABI in testnet
https://fullnode.testnet.aptoslabs.com/v1/accounts/{accountaddress}/module/CharityDonation

```
https://fullnode.testnet.aptoslabs.com/v1/accounts/46237378154b23618ecabe046cf1832f536766eb095813c2b1265845e05d9adb/module/CharityDonation
```

Getting the view values in testnet

```
https://fullnode.testnet.aptoslabs.com/v1/spec#/operations/view
```
