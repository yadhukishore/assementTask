import { Form, InputGroup, Button } from "react-bootstrap";

const InputField = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  icon,
  showPasswordToggle,
  onTogglePassword,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{placeholder}</Form.Label>
      <InputGroup hasValidation> 
        <InputGroup.Text className="input-icon">{icon}</InputGroup.Text>
        <Form.Control
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          isInvalid={!!error} 
          className="input-field"
        />
        {showPasswordToggle && (
          <Button
            variant="link"
            onClick={onTogglePassword}
            className="password-toggle"
          >
            {showPasswordToggle}
          </Button>
        )}
        {error && (
          <Form.Control.Feedback type="invalid" tooltip>
            {error}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default InputField;