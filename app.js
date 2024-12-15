const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractAddress = "0x869Ae3deB65c941d2562aF7F70925356e47d4160";
const abi = [
  {
    inputs: [
      { internalType: "address", name: "_tokenA", type: "address" },
      { internalType: "address", name: "_tokenB", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    name: "LiquidityAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    name: "LiquidityRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "requester",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PriceRetrieved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "swapper",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountAIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountBOut",
        type: "uint256",
      },
    ],
    name: "SwapAforB",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "swapper",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountBIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountAOut",
        type: "uint256",
      },
    ],
    name: "SwapBforA",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    name: "addLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "getPrice",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "amountA", type: "uint256" },
      { internalType: "uint256", name: "amountB", type: "uint256" },
    ],
    name: "removeLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveA",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "reserveB",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amountAIn", type: "uint256" }],
    name: "swapAforB",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "amountBIn", type: "uint256" }],
    name: "swapBforA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenA",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenB",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const simpleDEX = new web3.eth.Contract(abi, contractAddress);

async function addLiquidity() {
  const accounts = await web3.eth.getAccounts();
  const amountA = document.getElementById("amountA").value;
  const amountB = document.getElementById("amountB").value;
  await simpleDEX.methods
    .addLiquidity(amountA, amountB)
    .send({ from: accounts[0] });
}

async function removeLiquidity() {
  const accounts = await web3.eth.getAccounts();
  const amountA = document.getElementById("removeAmountA").value;
  const amountB = document.getElementById("removeAmountB").value;
  await simpleDEX.methods
    .removeLiquidity(amountA, amountB)
    .send({ from: accounts[0] });
}

async function swapAforB() {
  const accounts = await web3.eth.getAccounts();
  const amountA = document.getElementById("swapAmountA").value;
  await simpleDEX.methods.swapAforB(amountA).send({ from: accounts[0] });
  const amountB = await simpleDEX.methods.getAmountBOut(amountA).call();
  document.getElementById(
    "amountBReceived"
  ).innerText = `Amount B Received: ${amountB}`;
}

async function swapBforA() {
  const accounts = await web3.eth.getAccounts();
  const amountB = document.getElementById("swapAmountB").value;
  await simpleDEX.methods.swapBforA(amountB).send({ from: accounts[0] });
  const amountA = await simpleDEX.methods.getAmountAOut(amountB).call();
  document.getElementById(
    "amountAReceived"
  ).innerText = `Amount A Received: ${amountA}`;
}

async function getPrice() {
  const tokenAddress = document.getElementById("tokenAddress").value;
  const price = await simpleDEX.methods.getPrice(tokenAddress).call();
  document.getElementById("tokenPrice").innerText = `Price: ${price}`;
}
