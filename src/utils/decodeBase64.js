export default function decodeBase64WithPolishCharacters(encodedData) {
  var decodedData = atob(encodedData)
  var bytes = new Uint8Array(decodedData.length)
  for (var i = 0; i < decodedData.length; ++i) {
    bytes[i] = decodedData.charCodeAt(i)
  }
  var decoder = new TextDecoder("utf-8")
  return decoder.decode(bytes)
}
