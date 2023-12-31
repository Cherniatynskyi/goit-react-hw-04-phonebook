import { useState} from 'react'
import css from './ContactForm.module.css'

export const ContactForm = ({onSubmit}) => {

    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = e => {
        const name = e.target.name
        switch (name) {
            case 'name':
                setName(e.target.value)
                break;
            case 'number':
                setNumber(e.target.value)
                break;
            default:
                console.log('error')
                break;
        }
    }

    const onSubmitForm = e => {
        e.preventDefault()
        onSubmit({name, number})
        resetForm()
    }

    const resetForm = () => {
        setName('')
        setNumber('')
    }

    
        return(
        <form className={css.form} onSubmit={onSubmitForm}>
            <label className={css.label} htmlFor="name">
                Name
                <input onChange={handleChange} value={name} className={css.input} type="text" name="name" pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan" required />
            </label>
            <label className={css.label} htmlFor="tel">
                Number
                <input onChange={handleChange} value={number} className={css.input} type="tel" name="number" pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +" required />
            </label>
            <button type='submit' className={css.formButton}>Add contact</button>
        </form>
    )
}
