
<script src="https://unpkg.com/@tonconnect/ui@latest/dist/tonconnect-ui.min.js"></script>
document.addEventListener('DOMContentLoaded', () => {
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://raw.githubusercontent.com/riempies872/TonCasinoCryptoDemo.github.io/main/src/tonconnect-manifest.json'
    });

    const form = document.getElementById('transactionForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const walletAddress = document.getElementById('walletAddress').value;
        const amount = document.getElementById('amount').value;

        if (!walletAddress || !amount) {
            alert('Please fill in both fields.');
            return;
        }

        try {
            const wallet = await tonConnectUI.connect();
            console.log('Connected to wallet:', wallet);

            const transaction = {
                to: walletAddress,
                value: (amount * 1e9).toString(), // Convert TON to nanograms
                message: 'Payment'
            };

            const result = await tonConnectUI.sendTransaction(transaction);
            console.log('Transaction sent:', result);
            alert('Transaction successful!');
        } catch (error) {
            console.error('Error:', error);
            alert('Transaction failed. Please try again.');
        }
    });
});