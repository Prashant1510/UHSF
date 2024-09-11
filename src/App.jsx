import './App.css'

function App() {

  return (
    <>
      <div className='container max-w-3xl mx-auto p-6 mt-10 bg-gray-50 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-4'>URL Hashing and Shortner</h1>
        <form action="" method="post" className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Enter URL</label>
            <input type="text" placeholder='Enter the URL' required className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-300' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Max Access (optional)</label>
            <input type="text" placeholder='Enter Max Access Number (Optional)' className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-300' />
          </div>
          <div>
            <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
