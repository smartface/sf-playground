export const PHONE_NUMBER_MAPPING = {
  FIRST: 3,
  SECOND: 3,
  THIRD: 4
};

/**
 *
 * @param phoneNumber
 * Mask the phoneNumber in Turkish standarts
 * @example
 * maskPhoneNumber('5553332211') // returns (555) 333 2211
 */
export function maskPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) {
    return '';
  }
  const maxChar = phoneNumber.substr(0, PHONE_NUMBER_MAPPING.FIRST + PHONE_NUMBER_MAPPING.SECOND + PHONE_NUMBER_MAPPING.THIRD);
  const firstPart = maxChar.substr(0, PHONE_NUMBER_MAPPING.FIRST);
  const secondPart = maxChar.substr(3, PHONE_NUMBER_MAPPING.SECOND);
  const thirdPart = maxChar.substr(6, PHONE_NUMBER_MAPPING.THIRD);
  let masked = maxChar.length > PHONE_NUMBER_MAPPING.FIRST ? `(${firstPart})` : firstPart;
  if (secondPart.length) {
    masked += ` ${secondPart}`;
  }
  if (thirdPart.length) {
    masked += ` ${thirdPart}`;
  }
  return masked;
}

/**
 *
 * @param maskedPhoneNumber
 * Unmasks the phoneNumber
 * @example
 * unMaskPhoneNumber('(555) 333 2211') // returns 5553332211
 */
export function unMaskPhoneNumber(maskedPhoneNumber: string) {
  return maskedPhoneNumber.replace(/[() ]/g, '');
}
