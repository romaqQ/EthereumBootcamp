const express = require("express");
const app = express();
const cors = require("cors");
const {retrievePubKeyFromSignature} = require('./crypto_utils');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04c46a0daa35b0e1e0b091b5bcb33594d9e397bb6fdcd6f14cc95b75705d1280796519d3dc9dd7c03ecb487f4ee2e6db34e693619140d2317ef6b3078bf5a40ed1": 100, // PKEY: c186a9a9a3512e1466a79fe84319cf537627ff96615b5c59d3ba2664fd3429a0
  "04372d60c7f58891e6900b70c1bd58e8a044ef0a94803947dade6912f8535d435ebfa1ce9820e36411a84fd3ef386caabad6f6efcfb7d76d446f2102e7f2edcb11": 50, // PKEY: 9b20866d121d692eadfa685118888a67355b1b44a7043e93a0fc82bd92e7a409
  "0408838f3c3b1c1ce9de3f31f74aefa56c1ca17786998a815cb6c623359e0ad8b21c45a2b15fc271e8ddb296e53b3a2fa91de1bd0ce0420deede3b7922cd8c504d": 75, // PKEY: 7f1a9ec0b3b1f004e05d701d861066e71da10596a2773668db53723e3837875f
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  console.log(req.body);
  const msg = req.body.msg;
  const signature = req.body.signature;
  const recoveryBit = req.body.recoveryBit;
  //const { message, signature, recoveryBit } = req.body;
  console.log(msg, signature, recoveryBit);
  const { amount, recipient } = msg;

  const sender = retrievePubKeyFromSignature(msg, signature, recoveryBit); 
  console.log(`recovered the sender public key: ${sender}`) 
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
