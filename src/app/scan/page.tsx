'use client'
import { v4 as uuidv4 } from 'uuid'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Camera, Upload, Image as ImageIcon } from 'lucide-react'
import { useSplitStore } from '@/store/useSplitStore'

export default function ScanPage() {
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const { setItems, setTax, setTip } = useSplitStore()

  // Fix hydration mismatch by only rendering dots on client
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleImageSelect(files[0])
    }
  }

  const handleImageSelect = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageSelect(file)
    }
  }

  const takePhoto = () => {
    // Trigger camera input for mobile camera access
    cameraInputRef.current?.click()
  }

  const chooseFile = () => {
    // Trigger regular file input
    fileInputRef.current?.click()
  }


const processImage = async () => {
  if (!selectedImage) return

  setLoading(true)
  try {
    const response = await fetch('/api/parse-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageBase64: selectedImage })
    })
    
    const result = await response.json()
    
    if (result.error) {
      console.error('API Error:', result.error)
      if (result.rawResponse) {
        console.log('Raw AI Response:', result.rawResponse)
      }
      alert('❌ Error: ' + result.error + '\n\nPlease try a clearer image or try again.')
      return
    }

    console.log('Parsed data:', result)
    
    // Validate the structure
    if (!result.items || !Array.isArray(result.items)) {
      alert('❌ Invalid receipt data received. Please try again.')
      return
    }
    
    // ✅ FIX: Ensure each item has a unique ID
    type ReceiptItem = {
      name?: string;
      price?: number | string;
      [key: string]: any;
    };

    const itemsWithIds = result.items.map((item: ReceiptItem) => ({
      ...item,
      id: uuidv4(), // Generate unique ID for each item
      name: item.name || 'Unnamed item',
      price: parseFloat(item.price as string) || 0
    }))
    
    console.log('✅ Items with unique IDs:', itemsWithIds)
    
    // Store in Zustand store with proper IDs
    setItems(itemsWithIds)
    setTax(result.tax || 0)
    setTip(result.tip || 0)
    
    console.log('✅ Data stored successfully:', {
      items: itemsWithIds,
      tax: result.tax || 0,
      tip: result.tip || 0
    })
    
    // Redirect to items page
    router.push('/items')
  } catch (error) {
    console.error('❌ Failed to process receipt:', error)
    alert('Failed to parse receipt data. Please check your internet connection and try again.')
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Animated dots - Only render on client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-200 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 w-full max-w-lg mx-auto">
        {/* Header - Centered */}
        <div className="text-center mb-8 relative">
          <button onClick={() => router.back()} className="absolute left-0 top-0">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Scan Receipt</h1>
          <p className="text-gray-600 text-lg">Take a photo or upload an image of your receipt</p>
        </div>

        {/* Camera/Upload Area - Even Larger with Highlighting */}
        <div className="mb-8">
          {!selectedImage ? (
            <div
              className={`border-3 border-dashed rounded-xl p-10 text-center transition-all duration-300 w-full h-[500px] flex flex-col justify-center shadow-lg ${
                isDragging
                  ? 'border-orange-500 bg-orange-100 shadow-orange-200 scale-105'
                  : 'border-gray-400 bg-white hover:border-orange-400 hover:shadow-xl hover:scale-102'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-orange-100 rounded-xl flex items-center justify-center mb-8 shadow-sm">
                  <Camera size={40} className="text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Take Photo or Upload
                </h3>
                <p className="text-gray-600 mb-10 text-center px-6 text-lg">
                  Drag and drop your receipt here or use the buttons below
                </p>
                
                <div className="space-y-5 w-full px-8">
                  <button
                    onClick={takePhoto}
                    className="w-full bg-orange-600 text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-orange-700 transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    <Camera size={24} />
                    📷 Take Photo
                  </button>
                  
                  <button
                    onClick={chooseFile}
                    className="w-full bg-white text-gray-700 py-5 rounded-xl font-bold text-lg border-2 border-gray-300 flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 hover:scale-105 shadow-md"
                  >
                    <Upload size={24} />
                    📁 Choose File
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Image Preview - Larger Size with Highlighting */
            <div className="bg-white rounded-xl p-8 shadow-xl w-full relative border-2 border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <ImageIcon size={24} className="text-orange-600" />
                <span className="font-bold text-gray-800 text-lg">Receipt Image</span>
              </div>
              
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Receipt"
                  className="w-full h-96 object-contain rounded-xl border-2 border-gray-300 shadow-md"
                />
                
                {/* Loading Overlay */}
                {loading && (
                  <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p className="text-orange-700 font-bold text-lg">Looking at receipt...</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 bg-gray-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 shadow-md"
                  disabled={loading}
                >
                  Retake
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scrap the Bill Button - Below the photo box */}
        {selectedImage && (
          <button
            onClick={processImage}
            className="w-full bg-orange-600 text-white py-5 rounded-xl font-bold text-xl hover:bg-orange-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 mb-8 shadow-lg"
            disabled={loading}
          >
            {loading ? '⏳ Processing...' : '🧾 Scrap the Bill'}
          </button>
        )}

        {/* Hidden file inputs */}
        {/* Camera input for mobile camera */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileInput}
          className="hidden"
        />
        
        {/* Regular file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {/* Tips Section - Centered */}
        <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 shadow-md">
          <h3 className="font-bold text-orange-800 mb-4 text-center text-lg">📸 Tips for best results</h3>
          <ul className="text-orange-700 space-y-2">
            <li className="flex items-center"><span className="mr-2">💡</span> Well-lit and readable receipt</li>
            <li className="flex items-center"><span className="mr-2">🚫</span> Avoid shadows and glare</li>
            <li className="flex items-center"><span className="mr-2">📏</span> Keep receipt flat and straight</li>
            <li className="flex items-center"><span className="mr-2">🖼️</span> Include entire receipt in frame</li>
          </ul>
        </div>
      </div>
    </div>
  )
}