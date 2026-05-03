import { useEffect, useRef, useState } from 'react'
import { CheckCircle2, ImagePlus, Type, UploadCloud, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const REDIRECT_DELAY_MS = 5000

const CreatePost = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isRedirectCanceled, setIsRedirectCanceled] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [progressKey, setProgressKey] = useState(0)
  const fileInputRef = useRef(null)
  const formRef = useRef(null)
  const redirectTimeoutRef = useRef(null)
  const countdownIntervalRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const clearRedirectTimers = () => {
    if (redirectTimeoutRef.current) {
      clearTimeout(redirectTimeoutRef.current)
      redirectTimeoutRef.current = null
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
      countdownIntervalRef.current = null
    }
  }

  useEffect(() => () => clearRedirectTimers(), [])

  const formatFileSize = (bytes) => {
    if (typeof bytes !== 'number') return ''
    if (bytes < 1024) return `${bytes} B`
    const kb = bytes / 1024
    if (kb < 1024) return `${kb.toFixed(1)} KB`
    return `${(kb / 1024).toFixed(2)} MB`
  }

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0]
    setSelectedFile(file || null)
  }

  const handleClear = () => {
    setSelectedFile(null)
    if (formRef.current) {
      formRef.current.reset()
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleRemoveImage = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const startRedirectCountdown = () => {
    clearRedirectTimers()
    setShowSuccess(true)
    setIsRedirectCanceled(false)
    setRemainingSeconds(Math.ceil(REDIRECT_DELAY_MS / 1000))
    setProgressKey((prevKey) => prevKey + 1)

    redirectTimeoutRef.current = setTimeout(() => {
      navigate('/posts')
    }, REDIRECT_DELAY_MS)

    countdownIntervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearRedirectTimers()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleCancelRedirect = () => {
    clearRedirectTimers()
    setIsRedirectCanceled(true)
    setRemainingSeconds(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting || !selectedFile) return

    setIsSubmitting(true)
    setShowSuccess(false)
    const formData = new FormData(e.target);
    axios.post('http://localhost:3000/create-post', formData)
    .then((response) => {
      console.log(response.data);
      handleClear()
      startRedirectCountdown()
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setIsSubmitting(false)
    })
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-12">
        <div className="w-full">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium tracking-wide text-neutral-500">New Post</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">Create Post</h1>
              <p className="mt-2 text-sm text-neutral-500">
                Upload a clean image and add a concise caption.
              </p>
            </div>
            <Link
              to="/posts"
              className="inline-flex items-center rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
            >
              View Feed
            </Link>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="space-y-6">
              <div
                role="status"
                aria-live="polite"
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  showSuccess
                    ? 'max-h-56 border-emerald-200 bg-emerald-50/70 p-4 opacity-100'
                    : 'max-h-0 border-transparent bg-transparent p-0 opacity-0'
                }`}
              >
                {showSuccess && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200 bg-white">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-emerald-700">
                            Post successfully created, redirecting to your feed.
                          </p>
                          {isRedirectCanceled ? (
                            <p className="mt-1 text-xs text-neutral-600">
                              Redirect paused. You can stay here.
                            </p>
                          ) : (
                            <p className="mt-1 text-xs text-emerald-600">
                              Redirecting in {remainingSeconds}s
                            </p>
                          )}
                        </div>
                      </div>
                      {!isRedirectCanceled && (
                        <button
                          type="button"
                          onClick={handleCancelRedirect}
                          className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-medium text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100"
                        >
                          Don't redirect
                        </button>
                      )}
                    </div>
                    {!isRedirectCanceled && (
                      <div className="h-1.5 overflow-hidden rounded-full bg-emerald-100" aria-hidden="true">
                        <div
                          key={progressKey}
                          className="countdown-bar h-full w-full bg-emerald-500"
                          style={{ animationDuration: `${REDIRECT_DELAY_MS}ms` }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700" htmlFor="image">
                  Image
                </label>
                <label
                  htmlFor="image"
                  className={`flex cursor-pointer items-center justify-between rounded-xl border border-dashed px-4 py-5 transition ${
                    selectedFile
                      ? 'border-emerald-200 bg-emerald-50 hover:border-emerald-300'
                      : 'border-neutral-300 bg-neutral-50 hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border bg-white ${
                        selectedFile ? 'border-emerald-200' : 'border-neutral-200'
                      }`}
                    >
                      <ImagePlus
                        className={`h-5 w-5 ${selectedFile ? 'text-emerald-600' : 'text-neutral-600'}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        {selectedFile ? 'Image selected' : 'Choose an image'}
                      </p>
                      <p className="max-w-[240px] truncate text-xs text-neutral-500">
                        {selectedFile ? selectedFile.name : 'PNG, JPG up to 5MB'}
                      </p>
                    </div>
                  </div>
                  {selectedFile ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <UploadCloud className="h-5 w-5 text-neutral-500" />
                  )}
                </label>
                {selectedFile ? (
                  <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-3">
                    <div className="relative h-20 w-24 overflow-visible rounded-lg bg-white">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Selected preview"
                          className="h-full w-full rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                          Preview
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        aria-label="Remove selected image"
                        className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="min-w-[180px]">
                      <p className="text-sm font-medium text-emerald-700">Ready to upload</p>
                      <p className="text-xs text-emerald-600">
                        {formatFileSize(selectedFile.size)} • Add a caption to publish.
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-neutral-500">
                    Select an image to unlock the publish button.
                  </p>
                )}
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700" htmlFor="caption">
                  Caption
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                    <Type className="h-4 w-4 text-neutral-400" />
                  </div>
                  <input
                    type="text"
                    id="caption"
                    name="caption"
                    required
                    placeholder="Enter suitable caption"
                    className="w-full rounded-xl border border-neutral-200 bg-white py-3 pl-10 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-neutral-400 focus:ring-2 focus:ring-neutral-200"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || isSubmitting}
                  className="rounded-xl bg-neutral-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-600"
                >
                  {isSubmitting ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
