import {bleManager} from './bluetoothManager';
import {encode} from 'base-64';

/*
sends data over bt, propogates error to caller
*/

export const sendDataToBluetooth = async (data, device) => {
  try {
    if (!device)
      throw new Error(
        'No device found. Connect to Bluetooth device to send data.',
      );
    if (!data)
      throw new Error('No motion data found. Restart app and try again');
    const jsonString = JSON.stringify(data);
    const base64Data = encode(jsonString);

    const response = await bleManager.writeCharacteristicWithResponseForDevice(
      device.id,
      device.serviceUUID,
      device.characteristicUUID,
      base64Data,
    );
  } catch (error) {
    throw error;
  }
};
