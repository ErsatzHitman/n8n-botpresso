import { Box, Card, CardContent, Typography } from '@mui/material';

interface CurrentMetadataProps {
  current: {
    title: string;
    titleLength: number;
    description: string;
    descriptionLength: number;
  };
}

function CurrentMetadata({ current }: CurrentMetadataProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          Current Metadata
        </Typography>

        {/* Title */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
            Title ({current.titleLength} chars)
          </Typography>
          <Typography variant="body2" sx={{ bgcolor: '#f0f0f0', p: 1.5, borderRadius: 1 }}>
            {current.title}
          </Typography>
        </Box>

        {/* Description */}
        <Box>
          <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
            Description ({current.descriptionLength} chars)
          </Typography>
          <Typography variant="body2" sx={{ bgcolor: '#f0f0f0', p: 1.5, borderRadius: 1 }}>
            {current.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CurrentMetadata;
