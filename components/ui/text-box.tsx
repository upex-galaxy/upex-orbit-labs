'use client';

interface TextBoxProps {
  autoComplete?: string;
  id?: string;
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  isTextArea?: boolean;
}

const TextBox = ({ 
  label, 
  name, 
  value, 
  placeholder, 
  type, 
  autoComplete, 
  id, 
  onChange, 
  error, 
  isTextArea = false 
}: TextBoxProps) => {
  const InputComponent = isTextArea ? 'textarea' : 'input';
  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      <InputComponent
        autoComplete={autoComplete}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        rows={isTextArea ? 2 : undefined}
        className={`mt-1 block w-[95%] mx-auto p-3 rounded-lg text-black text-lg ${
          error ? 'border-red-500 border-2' : 'border-gray-300 border'
        } shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {error && (
        <p className="field-error mt-1 text-sm text-red-600 ml-4">{error}</p>
      )}
    </div>
   );
};

export default TextBox;