"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { useDropzone } from "react-dropzone";
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaTimes } from "react-icons/fa";
import Toast from "../../components/Toast";

const ACCEPTED_FILE_TYPES = {
  "image/jpeg": [],
  "image/png": [],
  "application/pdf": [],
};

const ItemType = 'FILE';

interface DraggableFileProps {
  file: File;
  index: number;
  moveFile: (fromIndex: number, toIndex: number) => void;
  handleDelete: (index: number) => void;
}

const DraggableFile: React.FC<DraggableFileProps> = ({ file, index, moveFile, handleDelete }) => {
  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveFile(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        ref(node);
        drop(node);
      }}
      className={`p-2 mb-2 border rounded flex justify-between items-center ${isDragging ? 'opacity-0' : 'opacity-100'}`}
    >
      <span className="break-words w-3/4">{index + 1}. {file.name}</span>
      <button onClick={() => handleDelete(index)} className="text-red-500">
        <FaTimes />
      </button>
    </div>
  );
};

const Img2Pdf: React.FC = () => {
  const [files, setFiles] = useState<{ file: File, id: string }[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({ file, id: `${file.name}-${Date.now()}` }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    setIsDragActive(false);
  };

  const { getRootProps, getInputProps, isDragActive: dropzoneDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  const moveFile = (fromIndex: number, toIndex: number) => {
    const updatedFiles = Array.from(files);
    const [movedFile] = updatedFiles.splice(fromIndex, 1);
    updatedFiles.splice(toIndex, 0, movedFile);
    setFiles(updatedFiles);
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const generatePdf = async () => {
    if (files.length === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    const pdfDoc = await PDFDocument.create();
    for (const { file } of files) {
      const arrayBuffer = await file.arrayBuffer();
      if (file.type === "application/pdf") {
        const existingPdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await pdfDoc.copyPages(
          existingPdf,
          existingPdf.getPageIndices()
        );
        copiedPages.forEach((page) => pdfDoc.addPage(page));
      } else {
        const image = await pdfDoc.embedJpg(arrayBuffer);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }
    }
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    setPdfUrl(URL.createObjectURL(pdfBlob));
  };

  const acceptedFileTypes = Object.keys(ACCEPTED_FILE_TYPES).map(type => type.split('/')[1].toLocaleLowerCase()).join(', ');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-5 dark:bg-gray-900 dark:text-white w-full md:w-3/4 mx-auto">
        <h1 className="text-2xl mb-4 font-bold text-center">Image to PDF Converter</h1>
        <p className="text-center mb-4"> <b>Accepted file types:</b> {acceptedFileTypes}</p>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-2">
            <div
              {...getRootProps()}
              className={`border-dashed border-2 p-5 mb-4 cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-100' : ''} md:h-96 h-48`}
            >
              <input {...getInputProps()} />
              <p>Drag & drop some files here, or click to select files</p>
            </div>
          </div>
          <div className="md:w-1/2 p-2">
            <hr className="border-gray-400 my-4 md:hidden" />
            <div className="mb-4 md:max-h-96 md:overflow-y-auto custom-scrollbar">
              {files.map(({ file, id }, index) => (
                <DraggableFile
                  key={id}
                  index={index}
                  file={file}
                  moveFile={moveFile}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={generatePdf}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Generate PDF
          </button>
          <button
            onClick={() => setFiles([])}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Delete All
          </button>
        </div>
        {pdfUrl && (
          <div className="mt-4 text-center">
            <iframe
              src={pdfUrl}
              width="100%"
              height="500px"
              className="border-2 border-gray-300"
            ></iframe>
          </div>
        )}
        {showToast && (
          <Toast message="Please upload files before generating PDF." duration={2000} />
        )}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e2e8f0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #a0aec0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #2d3748;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4a5568;
        }
      `}</style>
    </DndProvider>
  );
};

export default Img2Pdf;
