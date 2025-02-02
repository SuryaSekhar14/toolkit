'use client';

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaTimes } from 'react-icons/fa';
import Toast from '../../components/Toast';

const ACCEPTED_FILE_TYPES = {
  'image/jpeg': [],
  'image/png': [],
  'application/pdf': [],
};

const Img2Pdf = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedFiles = Array.from(files);
    const [removed] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, removed);
    setFiles(reorderedFiles);
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const generatePdf = async () => {
    if (files.length === 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    const pdfDoc = await PDFDocument.create();
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      if (file.type === 'application/pdf') {
        const existingPdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await pdfDoc.copyPages(existingPdf, existingPdf.getPageIndices());
        copiedPages.forEach((page) => pdfDoc.addPage(page));
      } else {
        const image = await pdfDoc.embedJpg(arrayBuffer);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
    }
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
    setPdfUrl(URL.createObjectURL(pdfBlob));
  };

  return (
    <div className="p-5 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl mb-4">Image to PDF Converter</h1>
      <div {...getRootProps()} className="border-dashed border-2 p-5 mb-4 cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="files" isDropDisabled={false} isCombineEnabled={false}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="mb-4">
              {files.map((file, index) => (
                <Draggable key={file.name} draggableId={file.name} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 mb-2 border rounded flex justify-between items-center"
                    >
                      <span>{file.name}</span>
                      <button onClick={() => handleDelete(index)} className="text-red-500">
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={generatePdf} className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
        Generate PDF
      </button>
      {pdfUrl && (
        <div className="mt-4">
          <a href={pdfUrl} download="output.pdf" className="text-blue-500 underline">
            Download PDF
          </a>
        </div>
      )}
      {showToast && <Toast message="Please upload files before generating PDF." />}
    </div>
  );
};

export default Img2Pdf;
