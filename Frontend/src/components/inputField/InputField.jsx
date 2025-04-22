const FormInput = ({ label, name, type = 'text', value, onChange, placeholder, required = false }) => {
    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required} /></>
    );
};

export default FormInput;
