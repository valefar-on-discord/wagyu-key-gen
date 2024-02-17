import { execFile } from 'child_process';
import { writeFileSync } from 'fs';
import path from "path";
import { promisify } from 'util';
import { doesFileExist } from './BashUtils';
import { Keystore } from "../react/types";

const execFileProm = promisify(execFile);

const EXIT_TRANSACTION_KEYSTORE_SUBCOMMAND = "exit_transaction_keystore";
const EXIT_TRANSACTION_MNEMONIC_SUBCOMMAND = "exit_transaction_mnemonic";

const SFE_PATH = path.join("build", "bin", "ethdo" +
  (process.platform == "win32" ? ".exe" : ""));
const BUNDLED_SFE_PATH = path.join(process.resourcesPath, "..", "build",
  "bin", "ethdo" + (process.platform == "win32" ? ".exe" : ""));

const generateExitTransactions = async (folder: string, chain: string, epoch: number, keystores: Keystore[]) => {
  let executable: string = "";
  let args:string[] = [];
  let env = process.env;

  if (await doesFileExist(BUNDLED_SFE_PATH)) {
    executable = BUNDLED_SFE_PATH;
    args = [EXIT_TRANSACTION_KEYSTORE_SUBCOMMAND];
  } else if (await doesFileExist(SFE_PATH)) {
    executable = SFE_PATH;
    args = [EXIT_TRANSACTION_KEYSTORE_SUBCOMMAND];
  }

  for (const keystore of keystores) {
    const execArgs = args.concat([chain.toLowerCase(), keystore.fullPath, keystore.password, keystore.validatorIndex, epoch.toString()]);

    try {
      const { stdout: transactionJson } = await execFileProm(executable, execArgs, {env: env});
      const operation = JSON.parse(transactionJson);
      writeFileSync(`${folder}/signed_exit_transaction-${operation.message.validator_index}-${new Date().getTime()}.json`, transactionJson);
    } catch (e) {
      const { message } = (e as Error);

      if (message.indexOf("mismatch") >= 0) {
        throw(new Error(message));
      } else {
        throw(new Error(message));
      }
    }
  }
};

const generateExitTransactionsMnemonic = async (folder: string, chain: string, mnemonic: string, startIndex: number, epoch: number, validatorIndices: string) => {
  let executable:string = "";
  let args:string[] = [];
  let env = process.env;

  if (await doesFileExist(BUNDLED_SFE_PATH)) {
    executable = BUNDLED_SFE_PATH;
    args = [EXIT_TRANSACTION_MNEMONIC_SUBCOMMAND];
  } else if (await doesFileExist(SFE_PATH)) {
    executable = SFE_PATH;
    args = [EXIT_TRANSACTION_MNEMONIC_SUBCOMMAND];
  }
};

export {
  generateExitTransactions,
  generateExitTransactionsMnemonic,
};
