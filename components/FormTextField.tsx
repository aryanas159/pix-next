"use client"
import { TextField } from "@mui/material"
interface FormTextFieldProps {
    id: string;
    name: string;
    label: string;
    value: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText: string | undefined | boolean;
}
const FormTextField = ({id, name, label, value,type, onChange, onBlur, error, helperText}: FormTextFieldProps) => {
    return (
        <TextField 
            fullWidth
            id={id}
            name={name}
            label={label}
            type={type ? type : "text"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={error}
            helperText={helperText}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: "5rem",
                    '& fieldset': {
                        
                    },
                },
                '& .MuiFocused': {
                    borderColor: "#f50057 !important"
                }
            }}
        />
    )
}

export default FormTextField;