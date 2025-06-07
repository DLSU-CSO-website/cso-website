"use client";

import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { useState } from "react";

export default function PertinentLinksPage() {
  const [pertinentLinks, setPertinentLinks] = useState([
    { title: "Link 1", url: "https://example.com/link1" },
    { title: "Link 2", url: "https://example.com/link2" },
    { title: "Link 3", url: "https://example.com/link3" },
    { title: "Link 4", url: "https://example.com/link4" },
    { title: "Link 5", url: "https://example.com/link5" },
    { title: "Link 6", url: "https://example.com/link6" },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedUrl, setEditedUrl] = useState("");

  const handleEditClick = (index: number, title: string, url: string) => {
    setEditingIndex(index);
    setEditedTitle(title);
    setEditedUrl(url);
  };

  const handleSaveClick = (index: number) => {
    // Update the pertinent links array
    const updatedLinks = [...pertinentLinks];
    updatedLinks[index] = {
      ...updatedLinks[index],
      title: editedTitle,
      url: editedUrl,
    };

    setPertinentLinks(updatedLinks);

    // Reset editing state
    setEditingIndex(null);
    setEditedTitle("");
    setEditedUrl("");
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedTitle("");
    setEditedUrl("");
  };

  return (
    <main className="w-full min-h-screen py-24 flex items-center justify-center">
      <div className="w-4/5 h-full p-10 flex flex-col items-center justify-center gap-10 bg-gray-100">
        <div className="w-full flex flex-col items-start justify-center gap-2">
          <h1 className="text-3xl font-bold">Pertinent Links</h1>
          <hr className="w-full border-2 border-black" />
        </div>
        <div className="w-full">
          {/*List of pertinent links */}
          {pertinentLinks.length > 0 ? (
            <div className="w-full flex flex-col gap-4">
              {pertinentLinks.map((link, index) => (
                <div
                  key={index}
                  className="w-full p-4 flex items-center justify-between bg-[#FFFFFF] rounded-lg"
                >
                  {editingIndex === index ? (
                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full flex items-center justify-between gap-4">
                        <div className="w-1/2 flex flex-col gap-1">
                          <p className="text-xs text-gray-400 font-semibold">
                            Link Title
                          </p>
                          <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className="w-full flex-1 p-2 mr-4 border border-gray-300 rounded"
                            placeholder="Link title"
                          />
                        </div>
                        <div className="w-1/2 flex flex-col gap-1">
                          <p className="text-xs text-gray-400 font-semibold uppercase">
                            url
                          </p>
                          <input
                            type="url"
                            value={editedUrl}
                            onChange={(e) => setEditedUrl(e.target.value)}
                            className="w-full flex-1 p-2 mr-4 border border-gray-300 rounded"
                            placeholder="Link URL"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-end gap-2">
                        <button
                          onClick={handleCancelEdit}
                          className="w-fit px-6 py-1 rounded-md bg-gray-200 hover:bg-red-400 transition-all duration-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveClick(index)}
                          className="w-fit px-6 py-1 bg-green-600 rounded-md text-white hover:bg-green-500 transition-all duration-100"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View mode
                    <>
                      <p>{link.title}</p>
                      <Link href={link.url}>{link.url}</Link>
                      <MdEdit
                        className="cursor-pointer text-xl hover:scale-125 hover:text-green-700 transition duration-100"
                        onClick={() =>
                          handleEditClick(index, link.title, link.url)
                        }
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No pertinent links available.</p>
          )}
        </div>
      </div>
    </main>
  );
}
