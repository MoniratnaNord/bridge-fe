import { isValidAddress, isValidXAddress } from "xrpl";

export const isValidXrplAddress = (address: string): boolean => {
	return isValidAddress(address) || isValidXAddress(address);
};
