import { ImagePlus, Type, UploadCloud } from 'lucide-react'
import { Link } from 'react-router-dom'

const CreatePost = () => {
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

          <form action="" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700" htmlFor="image">
                  Image
                </label>
                <label
                  htmlFor="image"
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-5 transition hover:border-neutral-400"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white">
                      <ImagePlus className="h-5 w-5 text-neutral-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-800">Choose an image</p>
                      <p className="text-xs text-neutral-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                  <UploadCloud className="h-5 w-5 text-neutral-500" />
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
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
                  className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-neutral-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
                >
                  Create Post
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
