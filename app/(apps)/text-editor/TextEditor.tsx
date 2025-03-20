'use client';

import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import ComingSoon from "@/app/components/ComingSoon";

export default function TextEditor() {
  const [editorMode, setEditorMode] = useState<"Rich Text" | "Markdown">("Markdown");
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorMode === "Rich Text" && editorRef.current && !quillInstanceRef.current) {
      quillInstanceRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["code-block"],
            ["clean"],
          ],
        },
      });
    }

    return () => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current = null;
      }
    };
  }, [editorMode]);

  return (
    <div className="font-sans p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="mb-4 flex items-center gap-4 justify-center">
        <div className="text-xl font-bold">Select your Editor:</div>
        <select
          value={editorMode}
          onChange={(e) => setEditorMode(e.target.value as "Rich Text" | "Markdown")}
          className="px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="Rich Text">Rich Text</option>
          <option value="Markdown">Markdown</option>
        </select>
      </div>

      {editorMode === "Rich Text" && (
        <div className="editor-container">
          <div
            ref={editorRef}
            className="h-full min-h-[90vh] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 shadow-md"
          />
        </div>
      )}

      {editorMode === "Markdown" && (
        <div className="h-full min-h-[90vh] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 shadow-md">
          <ComingSoon />
        </div>
      )}
    </div>
  );
}