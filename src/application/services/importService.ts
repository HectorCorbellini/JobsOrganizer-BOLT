// Defines the interface for importing jobs from markdown
export interface IImportService {
  importFromMarkdown(): Promise<{ count: number }>;
}
