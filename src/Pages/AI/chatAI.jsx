import axios from "axios"
import { useState } from "react"

const ChatAI = () => {
    const [prompt, setPrompt] = useState("")
    const [response, setResponse] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!prompt)
            return
        setLoading(true)
        setResponse("")

        try {
            const res = await axios.get(`https://y-gamma-rouge.vercel.app/chatApi/textAi`, {
                params: { prompt }
            })
            setResponse(res.data.answer)
        }
        catch (error) {
            console.log("Error fetching ai response", error)
            setResponse("Failed to get a response from ai")
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className="mt-20 max-w-xl mx-auto p-4 rounded-lg">
            <h2 className="text-xl font-bold text-center mb-4">Chat with AI</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input type="text" value={prompt} placeholder="Ask your queries"
                    onChange={(e) => setPrompt(e.target.value)} className="input input-warning p-2 rounded-md " />
                <button type="submit" className="btn btn-outline btn-warning" disabled={loading}>{loading ? "Generating" : "Ask AI"}</button>
            </form>
            {
                response && (
                    <div>
                        <strong>AI Response : </strong>
                        <p>{response}</p>
                    </div>
                )
            }
        </div>
    )
}
export default ChatAI