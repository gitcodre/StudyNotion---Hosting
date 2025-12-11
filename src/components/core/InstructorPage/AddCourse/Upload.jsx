import React, { useEffect, useRef, useState } from "react"

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  view = false,
  viewData = null,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)
  const inputRef = useRef(null)

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      previewFile(file)
    }
  }

  // Create preview
  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  // Click image/div to open file picker
  const handleClick = () => {
    inputRef.current.click()
  }

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name])

  useEffect(() => {
    console.log('View Data : ',viewData);
    console.log('Edit Data : ',editData);
  },[viewData,editData])

  return (
    <div className="flex flex-col gap-2">
      <label className="text-white">{label}</label>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept={video ? "video/*" : "image/*"}
        className="hidden"
        disabled={view}
      />

      {/* Clickable Box */}
      <div
        onClick={handleClick}
        className="cursor-pointer border border-dashed border-gray-400 p-4 rounded-lg flex justify-center items-center min-h-[200px] hover:border-yellow-400 transition"
      >
        {previewSource ? (
          video ? (
            <video src={previewSource} controls className="max-h-60" />
          ) : (
            <img
              src={previewSource}
              alt="Preview"
              className="max-h-60 object-contain rounded"
            />
          )
        ) : editData ? (
              video ? (
                <video src={editData} controls className="max-h-60" />
              ) : (
                <img
                  src={editData}
                  alt="Course Thumbnail"
                  className="max-h-60 object-contain rounded"
                />
              )
        ) : viewData ? (
              video ? (
                <video src={viewData} controls className="max-h-60" />
              ) : (
                <img
                  src={viewData}
                  alt="Course Thumbnail"
                  className="max-h-60 object-contain rounded"
                />
              )
        ) : 
        (
            <div className="flex flex-col justify-center items-center">
                <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                    Drag and drop an {!video ? "image" : "video"}, or click to{" "}
                    <span className="font-semibold text-yellow-50">Browse</span> a
                    file
                </p>
                <ul className="mt-10 ml-20 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">
                    <li>Aspect ratio 16:9</li>
                    <li>Recommended size 1024x576</li>
                </ul>

            </div>
        )}
      </div>

      {errors?.[name] && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  )
}

export default Upload
