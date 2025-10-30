import axios from 'axios';
import { useState } from 'react';


function CreateAbout_Us() {

  const [about_us, setAbout] = useState(" ");
  const [loading, setLoading] = useState(false);
  

    const handleAbout = async (e) => {
      e.preventDefault();
      setLoading(true);
      const payload ={about_us }
      
      try {
        const { data } = await axios.post("https://college-app-3.onrender.com/api/ganarelNotice/creatAboutUs",payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })  
        
        alert("Data Upload successfully",data)
        
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          // ব্যাকএন্ড থেকে আসা মেসেজ দেখান
          alert(error.response.data.message); // ইউজারকে মেসেজ দেখানো
        } else {
          console.error("Notice পোস্ট করতে সমস্যা হয়েছে:", error);
          alert("Notice পোস্ট করতে সমস্যা হয়েছে।");
        } 
      }finally {
      setLoading(false); // 🟢 রিকোয়েস্ট শেষ হলে loading false করো
    }

      };
  return (
    <div>
    About_Us

    <div>
      <form onSubmit={handleAbout}>

      <textarea
       rows="6"
       className="w-full p-2 mb-4 border rounded-md"
       placeholder="Something about your blog at least 200 characters!"
       value={about_us}
       onChange={(e) => setAbout(e.target.value)}
       ></textarea>


<div className="flex justify-center mt-4">
  <button
    type="submit"
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    disabled={loading} //
    >
     {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Posting...
              </div>
            ) : (
              "Post"
            )}
   </button>
  </div>
        
      </form>
     
    </div>

    </div>
  )
}

export default CreateAbout_Us