import React, { useState, useCallback } from 'react';

export const fields = [
  { key: 'name', label: 'your name', type: 'input', placeholder: '' },
  { key: 'email', label: 'your email', type: 'input', placeholder: '' },
  { key: 'subject', label: 'subject', type: 'input', placeholder: '' },
  { key: 'message', label: 'your message', type: 'textarea', rows: 4 }
];

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

export const useContactForm = () => {
  const [values, setValues] = useState<Record<string, string>>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [currentField, setCurrentField] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const getValue = useCallback((key: string) => values[key], [values]);

  const setValue = useCallback((key: string, val: string) => {
    setValues(prev => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  }, [errors]);

  const advanceField = useCallback(() => {
    const key = fields[currentField].key;
    if (values[key].trim() !== '' && currentField < 3) {
      setCurrentField(prev => prev + 1);
    } else if (values[key].trim() === '') {
      setErrors(prev => ({ ...prev, [key]: 'required' }));
      setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[key];
          return newErrors;
        });
      }, 1200);
    }
  }, [currentField, values]);

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};
    if (!values.name.trim()) newErrors.name = 'required';
    if (!values.email.trim()) {
      newErrors.email = 'required';
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email)) {
      newErrors.email = 'invalid email format';
    }
    if (!values.subject.trim()) newErrors.subject = 'required';
    if (!values.message.trim()) {
      newErrors.message = 'required';
    } else if (values.message.trim().length < 10) {
      newErrors.message = 'min 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, fieldKey: string) => {
    const field = fields.find(f => f.key === fieldKey);
    if (e.key === 'Enter' && field?.type === 'input') {
      e.preventDefault();
      advanceField();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      advanceField();
    }
  }, [advanceField]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    setSubmitStatus('sending');

    // --- FORMSPREE INTEGRATION ---
    // 1. Create a free account at https://formspree.io/
    // 2. Create a form and get your "Form ID"
    // 3. Paste your ID here:
    const FORMSPREE_ID = "mreolyyo"; // CORRECT USER ID

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        const lines = [
          "> establishing connection...",
          "> encrypting payload...",
          "> dispatching to mail server...",
          "> message acknowledged.",
          "> delivered to recipient. ✓"
        ];
        
        lines.forEach((line, i) => {
          setTimeout(() => {
            setTerminalLines(prev => [...prev, line]);
          }, i * 220);
        });
      } else {
        if (response.status === 404) {
          throw new Error('Form ID invalid. Please update FORMSPREE_ID.');
        }
        throw new Error('Delivery failed. Security bypass blocked.');
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setErrors(prev => ({ ...prev, submit: error.message || 'connection failed. try again.' }));
    }
  }, [validate, values]);

  const resetForm = useCallback(() => {
    setValues({ name: '', email: '', subject: '', message: '' });
    setCurrentField(0);
    setErrors({});
    setSubmitStatus('idle');
    setTerminalLines([]);
  }, []);

  return {
    fields,
    currentField,
    getValue,
    setValue,
    advanceField,
    validate,
    handleKeyDown,
    handleSubmit,
    resetForm,
    submitStatus,
    terminalLines,
    errors
  };
};
