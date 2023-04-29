import { Typography } from '@material-ui/core';
import React, { FC, ReactElement, Dispatch, SetStateAction } from 'react';
import CommonSelectFolder from '../CommonSelectFolder';

type KeystoreFolderProps = {
  setFolderPath: Dispatch<SetStateAction<string>>,
  folderPath: string,
  setFolderError: Dispatch<SetStateAction<boolean>>,
  folderError: boolean,
  setFolderErrorMsg: Dispatch<SetStateAction<string>>,
  folderErrorMsg: string,
  setModalDisplay: Dispatch<SetStateAction<boolean>>,
  modalDisplay: boolean,
}

/**
 * The page which prompts the user to choose a folder to save keys in
 * 
 * @param props self documenting parameters passed in
 * @returns react element to render
 */
const KeystoreFolder: FC<KeystoreFolderProps> = (props): ReactElement => {
  return (
    <CommonSelectFolder
      folderError={props.folderError} 
      setFolderError={props.setFolderError} 
      folderErrorMsg={props.folderErrorMsg}
      setFolderErrorMsg={props.setFolderErrorMsg}
      folderPath={props.folderPath}
      setFolderPath={props.setFolderPath}
      modalDisplay={props.modalDisplay}
      setModalDisplay={props.setModalDisplay}
    >
      <Typography variant="body1">
        Select the folder where your keystore files are located
      </Typography>
    </CommonSelectFolder>
  );
}

export default KeystoreFolder;