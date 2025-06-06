"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function ClipboardImageDownload() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("Paste an image from your clipboard (Ctrl+V / Cmd+V)");
  const [fileName, setFileName] = useState<string>("clipboard-image");
  const [fileExtension, setFileExtension] = useState<string>("png");
  const [quality, setQuality] = useState<number>(1);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isCropping, setIsCropping] = useState<boolean>(false);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Add paste event listener to the document
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      
      for (const item of Array.from(items)) {
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          if (!blob) continue;
          
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              const imageData = event.target.result as string;
              setOriginalImage(imageData);
              setDisplayImage(imageData);
              setStatusMessage("Image loaded successfully! You can download it now.");
              setIsCropping(false);
              setCrop(undefined);
            }
          };
          reader.readAsDataURL(blob);
          break;
        }
      }
    };
    
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, []);
  
  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (isCropping) {
      
      // Just set a default starting crop area (50% centered)
      setCrop({
        unit: '%',
        width: 50,
        height: 50,
        x: 25,
        y: 25
      });
    }
  }, [isCropping]);
  
  const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
    return new Promise((resolve) => {
      // For PNG, quality is ignored. For JPEG/JPG, quality is between 0 and 1
      const mimeType = `image/${fileExtension === 'jpg' || fileExtension === 'jpeg' ? 'jpeg' : 'png'}`;
      
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
        },
        mimeType,
        fileExtension === 'png' ? undefined : quality
      );
    });
  };
  
  // This is to generate a downloadable image after cropping
  const getCroppedImg = async (): Promise<string> => {
    try {
      if (!completedCrop || !imgRef.current) return originalImage as string;
      
      const image = imgRef.current;
      
      // Calculate scale factors between the displayed image and natural dimensions
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      // Create a canvas with the proper size based on the actual crop dimensions
      const canvas = document.createElement('canvas');
      
      // Scale the crop dimensions to match the natural image size
      const scaledCrop = {
        x: Math.round(completedCrop.x * scaleX),
        y: Math.round(completedCrop.y * scaleY),
        width: Math.round(completedCrop.width * scaleX),
        height: Math.round(completedCrop.height * scaleY)
      };
      
      // Set canvas to the scaled crop size
      canvas.width = scaledCrop.width;
      canvas.height = scaledCrop.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return originalImage as string;
      
      // Make sure we're using high quality rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      // Create a new image to draw from the original source at full resolution
      const sourceImage = new Image();
      sourceImage.src = originalImage as string;
      
      // Wait for the image to load before drawing
      await new Promise((resolve) => {
        sourceImage.onload = resolve;
      });
      
      // Draw the cropped portion to the canvas at full resolution
      ctx.drawImage(
        sourceImage,
        scaledCrop.x,
        scaledCrop.y,
        scaledCrop.width,
        scaledCrop.height,
        0,
        0,
        scaledCrop.width,
        scaledCrop.height
      );
      
      // Convert the canvas to a blob and create an object URL
      const blob = await canvasToBlob(canvas);
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error generating cropped image:", error);
      return originalImage as string;
    }
  };
  
  const handleDownload = async () => {
    if (!displayImage) return;
    
    const a = document.createElement("a");
    a.href = displayImage;
    a.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const startCropping = () => {
    setIsCropping(true);
    setDisplayImage(originalImage);
    setStatusMessage("Select an area to crop. You can resize and move the selection.");
  };
  
  const finishCropping = async () => {
    if (completedCrop) {
      setStatusMessage("Processing image crop...");
      try {
        const croppedImageUrl = await getCroppedImg();
        setDisplayImage(croppedImageUrl);
        setStatusMessage("Image cropped successfully! You can download it now.");
      } catch (err) {
        console.error("Error during cropping:", err);
        setStatusMessage("Error cropping image. Please try again.");
      }
    }
    setIsCropping(false);
  };
  
  const resetToOriginal = () => {
    if (originalImage) {
      // Clean up any object URL we created
      if (displayImage && displayImage !== originalImage) {
        URL.revokeObjectURL(displayImage);
      }
      
      setDisplayImage(originalImage);
      setStatusMessage("Restored original image. You can crop it again or download it as is.");
      setIsCropping(false);
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  };
  
  const handleClear = () => {
    setOriginalImage(null);
    setDisplayImage(null);
    setStatusMessage("Paste an image from your clipboard (Ctrl+V / Cmd+V)");
    setIsCropping(false);
    setCrop(undefined);
    setCompletedCrop(undefined);
    
    // Release any object URLs we created
    if (displayImage && displayImage !== originalImage) {
      URL.revokeObjectURL(displayImage);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Clipboard Image Download</h1>
      <div className="mb-6">
        <p className="text-lg mb-4">{statusMessage}</p>
        
        {originalImage ? (
          <div className="mb-4">
            <div className="max-w-2xl mb-4 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              {isCropping ? (
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                  ruleOfThirds
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    ref={imgRef}
                    src={originalImage}
                    alt="Pasted from clipboard"
                    onLoad={onImageLoad}
                    className="max-w-full"
                    style={{ maxHeight: '70vh' }}
                  />
                </ReactCrop>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img 
                  src={displayImage || originalImage} 
                  alt="Pasted from clipboard" 
                  className="w-full" 
                />
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-grow">
                <label htmlFor="fileName" className="block mb-2 text-sm font-medium">
                  File name:
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  id="fileName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="fileExtension" className="block mb-2 text-sm font-medium">
                  File extension:
                </label>
                <select
                  id="fileExtension"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  value={fileExtension}
                  onChange={(e) => setFileExtension(e.target.value)}
                >
                  <option value="png">PNG</option>
                  <option value="jpg">JPG</option>
                  <option value="jpeg">JPEG</option>
                </select>
              </div>
              
              {(fileExtension === 'jpg' || fileExtension === 'jpeg') && (
                <div>
                  <label htmlFor="quality" className="block mb-2 text-sm font-medium">
                    Quality: {Math.round(quality * 100)}%
                  </label>
                  <input
                    type="range"
                    id="quality"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Download Image
              </button>
              
              {!isCropping ? (
                <button
                  onClick={startCropping}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Crop Image
                </button>
              ) : (
                <button
                  onClick={finishCropping}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Finish Cropping
                </button>
              )}
              
              {displayImage !== originalImage && !isCropping && (
                <button
                  onClick={resetToOriginal}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Reset to Original
                </button>
              )}
              
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg h-64">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Paste an image from clipboard
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}