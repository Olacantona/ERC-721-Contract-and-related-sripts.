const { ethers, network } = require('hardhat');
const { encryptDataField } = require('@swisstronik/utils');

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = network.config.url;

  const [encryptedData] = await encryptDataField(rpclink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = '0xCD2A727eAEb7A7E7c52a5333a1063858ac4655A1';

  const [signer] = await ethers.getSigners();

  const contractFactory = await ethers.getContractFactory('MyToken');
  const contract = contractFactory.attach(contractAddress);

  const functionName = 'transfer';
  const receiptAddress = '0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1'; // don't modify
  const amount = 1 * 10 ** 18;
  const functionArgs = [receiptAddress, amount.toString()];
  const setMessageTx = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, functionArgs),
    0
  );
  await setMessageTx.wait();

  console.log('Transaction Receipt: ', setMessageTx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
