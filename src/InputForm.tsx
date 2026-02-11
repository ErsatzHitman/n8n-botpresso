import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  FormHelperText,
  Stack,
} from '@mui/material';

interface InputFormProps {
  url: string;
  keyword: string;
  onUrlChange: (url: string) => void;
  onKeywordChange: (keyword: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

function InputForm({
  url,
  keyword,
  onUrlChange,
  onKeywordChange,
  onSubmit,
  isLoading,
}: InputFormProps) {
  const [urlError, setUrlError] = useState('');

  const validateUrl = (value: string) => {
    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      return 'URL must start with http:// or https://';
    }
    return '';
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onUrlChange(value);
    setUrlError(validateUrl(value));
  };

  const handleSubmit = () => {
    const error = validateUrl(url);
    if (error) {
      setUrlError(error);
      return;
    }
    if (!keyword.trim()) {
      return;
    }
    onSubmit();
  };

  const isValid = url.startsWith('http://') || url.startsWith('https://');
  const isDisabled = isLoading || !isValid || !keyword.trim();

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <TextField
          label="Webpage URL"
          placeholder="https://example.com/product"
          value={url}
          onChange={handleUrlChange}
          disabled={isLoading}
          fullWidth
          error={!!urlError}
          helperText={urlError}
        />

        <TextField
          label="Keyword"
          placeholder="e.g., mens tshirt, laptop stand"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          disabled={isLoading}
          fullWidth
        />

        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={isDisabled}
            fullWidth
          >
            {isLoading ? 'Processing...' : 'Generate Variations'}
          </Button>
          {isValid && keyword.trim() && (
            <FormHelperText sx={{ mt: 1 }}>
              Ready to process ✓
            </FormHelperText>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}

export default InputForm;
