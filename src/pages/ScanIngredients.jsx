import React, { useState } from "react";

export default function ScanIngredients() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Show preview immediately
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);


    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result; // data:image/png;base64,...

      setLoading(true);
      try {
        // Call puter.ai.img2txt with base64
        const text = await window.puter.ai.img2txt(base64);
        setResult(text);
        console.log(text)
      } catch (err) {
        console.error(err);
        setResult("Error extracting text");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Upload an Image</h1>

      {/* Upload Button */}
      <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
        Choose Image
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Show Preview */}
      {preview && (
        <div className="mt-6">
          <img
            src={preview}
            alt="Uploaded preview"
            className="max-w-xs rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Loading State */}
      {loading && <p className="text-gray-500 mt-4">Processing image...</p>}

      {/* Extracted Text */}
      {result && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-lg font-semibold mb-2">Extracted Text:</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}
