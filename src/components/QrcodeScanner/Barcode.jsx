import React, { useEffect, useRef, useState } from "react";
import Quagga from "@ericblade/quagga2";
import axios from "axios";
import ProductDetailsCard from "../Product/Product.jsx";
import { useProductContext } from "../../context/ProductContext.jsx";
import InputFileUpload from "../FileUpload/Upload.jsx";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,

});


const FOOD_PRODUCT_API_URL = "https://world.openfoodfacts.org/api/v0/product";

export default function ManualCaptureScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const [result, setResult] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [productData, setProductData] = useState(null);
  const {updateProductContext} = useProductContext();
  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        const video = videoRef.current;
        video.srcObject = stream;
        await video.play();
      } catch (err) {
        console.error("Camera error:", err);
      }
    } 
    startCamera();
 
  }, []);

  const captureAndScan = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const boxSize = canvas.width * 0.6;
    const offsetX = (canvas.width - boxSize) / 2;
    const offsetY = (canvas.height - boxSize) / 2;

    ctx.drawImage(video, offsetX, offsetY, boxSize, boxSize, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");

    scanBarcodeFromImage(imageData);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      setPreviewImage(imageData);
      scanBarcodeFromImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  const scanBarcodeFromImage = (imageData) => {
    Quagga.decodeSingle(
      {
        src: imageData,
        numOfWorkers: 0,
        inputStream: {
          size: 800,
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader",
          ],
        },
      },
      async (data) => {
        if (data && data.codeResult) {
          const barcode = data.codeResult.code;
          console.log("✅ Barcode:", barcode);
          setErrorMessage("");
          setResult(barcode);
          setIsCameraOpen(true);

          try {
            const response = await axios.get(`${FOOD_PRODUCT_API_URL}/${barcode}.json`);
            setProductData(response.data.product || null);
            updateProductContext(response.data.product)
          } catch (error) {
            console.error("Error fetching product data:", error);
            setProductData(null);
          }
        } else {
          console.log("❌ No barcode detected");
          setResult("");
          setProductData(null);
          setErrorMessage("No barcode detected. Try adjusting lighting or upload a clearer image.");
        }
      }
    );
  };

  return !isCameraOpen ? (
    <div className="relative scanner-wrapper overflow-hidden h-[80dvh]">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-b-md z-[-1]"
        autoPlay
        muted
        playsInline
      />

      {/* 📦 Scanner Frame Overlay */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none z-10">
        <div className="border-[0vh] border-white rounded-[0.41vh] w-[58.5vw] h-[60vw] max-w-[300px] max-h-[300px] relative">
          <div className="absolute top-0 left-0 w-[20px] h-[20px] border-t-[3px] border-l-[3px] border-green-400" />
          <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-[3px] border-r-[3px] border-green-400" />
          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b-[3px] border-l-[3px] border-green-400" />
          <div className="absolute bottom-0 right-0 w-[20px] h-[20px] border-b-[3px] border-r-[3px] border-green-400" />
        </div>
      </div>

      {/* 📸 Capture Button */}
      <button
        onClick={captureAndScan}
        className="absolute bottom-[2vh] left-[50%] translate-x-[-50%] z-20"
      >
        <div className="bg-pvt-color5 border-[0.52vh] border-pvt-color2 p-[0.31vh] rounded-full">
          <div className="bg-white rounded-full w-[50px] h-[50px] border-[2px] border-white" />
        </div>
      </button>

      {/* 📁 File Upload + Preview */}
      <div className="absolute bottom-[12vh] left-[50%] translate-x-[-50%] z-20 flex flex-col items-center">

         {/* <InputFileUpload/> */}

         <Button
             className='w-[200px] h-[4vh] m-36 font-style-1-bold  '
               component="label"
               role={undefined}
               variant="outlined"
               tabIndex={-1}
               startIcon={<CloudUploadIcon />}
             >
               Upload Image
               <VisuallyHiddenInput
                type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="text-white bg-pvt-color5 px-4 py-2 rounded-md cursor-pointer mb-2 "
               />
             </Button>

        {/* <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="text-white bg-pvt-color5 px-4 py-2 rounded-md cursor-pointer mb-2"
        /> */}
        {previewImage && (
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-[300px] max-h-[300px] rounded-md border border-gray-300 shadow-md"
          />
        )}
        {errorMessage && (
          <p className="mt-2 text-red-500 text-sm text-center max-w-[300px]">
            {errorMessage}
          </p>
        )}
      </div>

       

    </div>
  ) : (
    <div className="p-4 overflow-y-scroll h-[80vh] z-[1]">
      <h2 className="text-lg font-bold  mb-2">Scanned Barcode: <span className="text-lg font-semibold text-green-600 " >{result}</span> </h2>
      <ProductDetailsCard productData={productData} />
    </div>
  );
}
