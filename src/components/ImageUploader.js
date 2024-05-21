export default function ImageUploader({onImageSubmit, selectedImage, onAction}) {
    return (
        <div className="w-full md:w-2/5 flex flex-col gap-6 py-6">
            <>
                {!selectedImage ?
                    <h2>Add a Festival poster URL:</h2>
                :
                    <h2>Change Festival poster URL:</h2>
                }

                <form className="flex gap-y-6 flex-col"
                onSubmit={onAction}>
                <input
                    className="rounded-md border-2 border-blue-50 bg-blue-50 py-0 text-slate-700 py-2 px-4"
                    type="text" 
                    name="posterURL"
                    placeholder="eg. https://amazing-festival.png"
                   />
                
                <button className=" py-4 px-8 rounded-full
                max-w-max self-center
                border-0 text-sm font-semibold
                bg-blue-700 text-white
                hover:bg-blue-200 hover:text-blue-800"
                type="submit">
                    Get My Line Up
                </button>
                </form>
           </> 
           
           {selectedImage &&
           <>
            <h2>Festival Line Up</h2>
            <img src={selectedImage} alt="Selected" />
           </>
           }
            
        </div>
    )
}

