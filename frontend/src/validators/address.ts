export const validateStacksAddress = (address: string) => {
  const regex = /^S[TM][0-9A-Z]{38,40}$/;
  return regex.test(address);
};
