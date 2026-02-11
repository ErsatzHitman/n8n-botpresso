import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';
import type { MetadataData } from './types/api';
import InputForm from './InputForm';
import CurrentMetadata from './CurrentMetadata';
import VariationCard from './VariationCard';

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MetadataData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/webhook/seo-metadata-agent`,
        { url, keyword }
      );

      const data = response.data[0];

      if (!data.success) {
        throw new Error('API returned success: false');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch metadata');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            SEO Metadata Agent
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Scrape webpage metadata and generate AI-optimized variations
          </Typography>
        </Box>

        {/* Input Form */}
        <Box sx={{ mb: 4 }}>
          <InputForm
            url={url}
            keyword={keyword}
            onUrlChange={setUrl}
            onKeywordChange={setKeyword}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Box>

        {/* Loading Overlay */}
        {isLoading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress />
              <Typography sx={{ mt: 2, color: 'white' }}>
                Processing metadata...
              </Typography>
            </Box>
          </Box>
        )}

        {/* Error Display */}
        {error && !isLoading && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {/* Results */}
        {result && !isLoading && (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
              Results
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' },
                gap: 3,
              }}
            >
              {/* Original Metadata */}
              <Box>
                <CurrentMetadata current={result.analysis.current} />
              </Box>

              {/* Variations */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 2,
                }}
              >
                {result.optimizedVariations.map((variation, index) => (
                  <Box key={index}>
                    <VariationCard variation={variation} />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default App;
