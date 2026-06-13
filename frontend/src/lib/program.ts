import { Connection, PublicKey } from "@solana/web3.js";
import { AnchorProvider, Program, Idl } from "@coral-xyz/anchor";

type AnchorWallet = any;
import idl from "./idl/idl.json"; 

const PROGRAM_ID = new PublicKey("AzA9t242PAjxv4A8r3AqjxEavjEUZsqLXMF9N59aNocE"); 
const NETWORK = "https://api.devnet.solana.com";          

export function getProgram(wallet: AnchorWallet) {
  const connection = new Connection(NETWORK, "confirmed");
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
return new Program(idl as unknown as Idl, provider);
}