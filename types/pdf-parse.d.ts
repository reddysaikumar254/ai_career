declare module 'pdf-parse' {
  export default function pdfParse(
    dataBuffer: Buffer,
    options?: Record<string, any>
  ): Promise<{
    numpages: number;
    numrender: number;
    version: string;
    text: string;
    produce: string;
    producer: string;
    creator: string;
    creationDate: string | null;
    modDate: string | null;
    metadata: any;
    version: string;
    pages: any[];
    getTextContent: () => Promise<any>;
  }>;
}
