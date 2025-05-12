import axios from "axios";
import { useEffect, useState } from "react";

const Answer=()=>{
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get("https://y-gamma-rouge.vercel.app/questions")
            .then(response => setQuestions(response.data))
            .catch(error => console.error("Error fetching questions:", error));
    }, []);


    return (
      <div className="w-full flex flex-col md:flex-row justify-between items-start mt-24 px-6 md:px-16 gap-10">
            <ul className="list bg-base-100 rounded-box shadow-md">

                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">List of questions </li>

                <li className="list-row">
                    <div><img className="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div>
                    <div>
                        <div>Dio Lupa</div>
                        <div className="text-xs uppercase font-semibold opacity-60">
                            {questions.length ? (
                                questions.map((q, index) => (
                                    <li
                                        key={index}
                                        className="bg-gray-100 p-3 rounded-md shadow-sm text-sm text-gray-800"
                                    >
                                        {q.text}
                                    </li>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No questions yet.</p>
                            )}
                        </div>
                    </div>
                    <p className="list-col-wrap text-xs">
                        "Remaining Reason" became an instant hit, praised for its haunting sound and emotional depth. A viral performance brought it widespread recognition, making it one of Dio Lupa’s most iconic tracks.
                    </p>
                    <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                    </button>
                    <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></g></svg>
                    </button>
                </li>

            </ul>
      </div>

    );
};


export default Answer


