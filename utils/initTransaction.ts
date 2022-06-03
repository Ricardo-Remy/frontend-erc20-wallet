import { ethers } from "ethers";

export const initTransaction = async ({ setError, setTxs, ether, address }) => {
  try {
    // Check window
    if (!window.ethereum)
      throw new Error("No wallet found - please install it");

    // Request account
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get provider
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    // Get th signer
    const signer = provider.getSigner();

    ethers.utils.getAddress(address);

    // Send transaction
    const tx = await signer.sendTransaction({
      to: address,
      value: ethers.utils.parseEther(ether),
    });

    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};
