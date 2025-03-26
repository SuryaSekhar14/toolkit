export interface DNSRecord {
  [key: string]: any;
}

export interface DigResultData {
  results: {
    [recordType: string]: DNSRecord;
  };
}

export class DigModel {
  private data: DigResultData | null = null;
  
  constructor(initialData: DigResultData | null = null) {
    this.data = initialData;
  }
  
  setData(data: DigResultData | null): void {
    this.data = data;
  }
  
  getData(): DigResultData | null {
    return this.data;
  }
  
  getRecords(recordType: string): DNSRecord | null {
    if (!this.data || !this.data.results[recordType]) {
      return null;
    }
    return this.data.results[recordType];
  }
  
  hasValidRecords(recordType: string): boolean {
    const records = this.getRecords(recordType);
    if (!records) return false;
    
    // Check if records contain an error message
    return !JSON.stringify(records, null, 2).includes("Error:");
  }
} 