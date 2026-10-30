import { createNewEntry } from "../services/entryService"
import { useState } from "react"
import { useNavigate } from "react-router"

function CreateEntry() {

const [formData, setFormData] = useState({
    title: '',
    entryBody: '',
    isPublic: false
})

const navigate = useNavigate()

function handleChange(event) {
    const { name, type, value, checked } = event.target

    setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
    }))
}

async function handleSubmit(event) {
    event.preventDefault()

    try {
        await createNewEntry(formData)
        navigate('/my-entries')
    } catch (error) {
        console.log(error)
    }
}

return (
    <>
     <h1>Create Entry</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                id="title"
                required
                maxLength="100"
            />
            <label htmlFor="entryBody">Entry body: </label>
            <input
                type="text"
                name="entryBody"
                value={formData.entryBody}
                onChange={handleChange}
                id="entryBody"
                maxLength="350"
            />

            <label htmlFor="isPublic">Is public: </label>
            <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
                id="isPublic"
            />

            <button type="submit">Create</button>

        </form>
    </>
)

}

export default CreateEntry