package simple_bank

type Bank struct {
}

func newBank(ledger []uint64) Bank {
	return Bank{}
}

func (bank *Bank) transfer(account1 int, account2 int, money uint64) {

}

func (bank *Bank) deposit(account1 int, money uint64) {

}

func (bank *Bank) withdraw(account1 int, money uint64) {

}
