import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Tooltip,
} from '@mui/material';
import type { VariationItem } from './types/api';

interface VariationCardProps {
  variation: VariationItem;
}

function VariationCard({ variation }: VariationCardProps) {
  const [copied, setCopied] = useState(false);

  const strategyLabels: Record<string, string> = {
    urgency: 'URGENCY',
    benefits: 'BENEFITS',
    social_proof: 'SOCIAL PROOF',
  };

  const meetsRequirements =
    variation.meetsRequirements.titleLength &&
    variation.meetsRequirements.descriptionLength;

  const borderColor = meetsRequirements ? '#4caf50' : '#f44336';
  const statusText = meetsRequirements
    ? '✓ Meets Requirements'
    : '✗ Needs Adjustment';
  const statusColor = meetsRequirements ? '#4caf50' : '#f44336';

  const handleCopy = async () => {
    const text = `Title: ${variation.title}\nDescription: ${variation.description}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Card
      sx={{
        border: `2px solid ${borderColor}`,
        height: '100%',
      }}
    >
      <CardContent>
        {/* Strategy Label */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 'bold',
              color: borderColor,
              letterSpacing: 1,
            }}
          >
            {strategyLabels[variation.strategy]}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: statusColor,
              fontWeight: 'bold',
            }}
          >
            {statusText}
          </Typography>
        </Box>

        {/* Title */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
            Title ({variation.titleLength} chars)
          </Typography>
          <Typography
            variant="body2"
            sx={{
              bgcolor: '#f0f0f0',
              p: 1.5,
              borderRadius: 1,
              fontWeight: 500,
            }}
          >
            {variation.title}
          </Typography>
        </Box>

        {/* Description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
            Description ({variation.descriptionLength} chars)
          </Typography>
          <Typography variant="body2" sx={{ bgcolor: '#f0f0f0', p: 1.5, borderRadius: 1 }}>
            {variation.description}
          </Typography>
        </Box>

        {/* Copy Button */}
        <Tooltip title={copied ? 'Copied to clipboard!' : 'Copy both title and description'}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCopy}
            fullWidth
            sx={{
              color: copied ? '#4caf50' : 'primary',
              borderColor: copied ? '#4caf50' : undefined,
            }}
          >
            {copied ? '✓ Copied' : 'Copy Metadata'}
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export default VariationCard;
