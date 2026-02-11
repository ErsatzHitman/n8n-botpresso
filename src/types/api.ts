export interface APIResponse {
  success: boolean;
  data: MetadataData;
}

export interface MetadataData {
  url: string;
  keyword: string;
  analysis: {
    current: {
      title: string;
      titleLength: number;
      description: string;
      descriptionLength: number;
    };
  };
  optimizedVariations: VariationItem[];
}

export interface VariationItem {
  title: string;
  titleLength: number;
  description: string;
  descriptionLength: number;
  strategy: 'urgency' | 'benefits' | 'social_proof';
  meetsRequirements: {
    titleLength: boolean;
    descriptionLength: boolean;
  };
}
