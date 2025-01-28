// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// export default function UploadDownloadPage() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [lastAction, setLastAction] = useState("")

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0])
//       setLastAction(`File selected: ${e.target.files[0].name}`)
//     }
//   }

//   const handleUpload = () => {
//     if (selectedFile) {
//       // Simulating upload
//       setLastAction(`Uploading file: ${selectedFile.name}`)
//       // In a real scenario, you would send the file to a server here
//     }
//   }

//   const handleDownload = () => {
//     // Simulating download
//     const dummyContent = "This is a dummy file content for download."
//     const blob = new Blob([dummyContent], { type: "text/plain" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.href = url
//     a.download = "dummy-file.txt"
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//     URL.revokeObjectURL(url)
//     setLastAction("File downloaded: dummy-file.txt")
//   }

//   return (
//     <div className="space-y-8">
//       <h1 className="text-4xl font-bold text-center text-[#00FFFF]">Upload/Download</h1>
//       <div className="max-w-md mx-auto space-y-4">
//         <div>
//           <Input type="file" onChange={handleFileChange} className="cursor-pointer" />
//         </div>
//         <Button onClick={handleUpload} disabled={!selectedFile} className="w-full">
//           Upload File
//         </Button>
//         <Button onClick={handleDownload} className="w-full">
//           Download Sample File
//         </Button>
//       </div>
//       <p className="text-center mt-4">Last action: {lastAction}</p>
//     </div>
//   )
// }

