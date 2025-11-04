export const decodeBase64 = (encodedData: string): string => {
  const decodedData = atob(encodedData);
  const bytes = new Uint8Array(decodedData.length);

  for (let i = 0; i < decodedData.length; ++i) {
    bytes[i] = decodedData.charCodeAt(i);
  }

  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
};
