import "./App.css";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
function App() {
  const [url, setUrl] = useState("");
  const [maxAccess, setMaxAccess] = useState("Infinity");
  const [hashedUrl, setHashedUrl] = useState("");
  const [setQrCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/hash-url", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
          maxAccess: maxAccess || undefined,
        }),
      });
      const data = await response.json();

      setHashedUrl(data.hashedUrl);
      setQrCode(data.qrCode);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(hashedUrl);
    alert("Url Coppied! ");
  };
  const handleDownloadQR = () => {
    const canvas = document.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("imgae/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "hash-qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click;
    document.removeChild(downloadLink);
  };
  return (
    <>
      <div className="container max-w-3xl mx-auto p-6 mt-10 bg-gray-50 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          URL Hashing and Shortner
        </h1>
        <form onSubmit={handleSubmit} method="post" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter URL
            </label>
            <input
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              type="text"
              value={url}
              placeholder="Enter the URL"
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Max Access (optional)
            </label>
            <input
              onChange={(e) => {
                setMaxAccess(e.target.value);
              }}
              type="text"
              value={maxAccess}
              placeholder="Enter Max Access Number (Optional)"
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
        {hashedUrl && (
          <div className="flex flex-row justify-between mt-6">
            <div className="mb-4">
              <p className="font-semibold">Hashed URL:</p>
              <p className="text-blue-600 break-all">{hashedUrl}</p>
              <button
                className="bg-green-500 text-white py-1 px-3 mt-2 rounded hover:bg-green-600 transition duration-300"
                onClick={handleCopy}
              >
                Copy Hashed URL
              </button>
            </div>

            <div className="mb-4">
              <p className="font-semibold">QR Code:</p>
              <QRCodeSVG value={hashedUrl} />
              <button
                className="bg-yellow-500 text-white py-1 px-3 mt-2 rounded hover:bg-yellow-600 transition duration-300"
                onClick={handleDownloadQR}
              >
                Download QR Code
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
