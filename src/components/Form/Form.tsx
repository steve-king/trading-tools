import { useState } from 'react'

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('SUBMIT')
    console.log(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Form</h3>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <input type="text" name="email" value={formData.email} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Form
