# CV Handling Architecture

This document outlines a proposed architecture for integrating robust CV (Curriculum Vitae) management and analysis capabilities into the JobTracker application. This aligns with the original project vision of using the user's CV to provide tailored job application assistance.

### Proposed Implementation for the Future

---

## 1. Backend Architecture (Node.js & Prisma)

The backend will be responsible for storing metadata about CVs, parsing their content, and serving the structured data to the frontend.

### New Prisma Model: `Cv`

A new model will be added to `server/prisma/schema.prisma` to store information about each uploaded CV. This avoids the need to re-parse the PDF file on every request.

```prisma
model Cv {
  id            String    @id @default(cuid())
  filename      String    @unique
  filepath      String
  parsedText    String?   @db.Text // Full extracted text from the PDF
  parsedJson    Json?     // Structured data (e.g., skills, experience, education)
  isActive      Boolean   @default(false) // To mark which CV to use for suggestions
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```
*   **`parsedJson`**: This field is crucial for advanced features. It will store a structured representation of the CV, making it easy to compare against job requirements.

### New Service: `CvService`

A dedicated service (`server/src/services/cvService.ts`) will encapsulate all business logic related to CVs.

*   **`uploadCv(file)`**: Saves the uploaded PDF to the `cvs/` directory and creates a corresponding `Cv` record in the database.
*   **`parseCv(cvId)`**: The core parsing engine. It will:
    1.  Use a library like **`pdf-parse`** to read the PDF from `filepath`.
    2.  Extract the raw text and store it in `parsedText`.
    3.  (Advanced) Use rules-based logic or a lightweight NLP approach to identify sections (Experience, Skills, Education) and structure them into a JSON object for `parsedJson`.
*   **`listCvs()`**: Retrieves all `Cv` records.
*   **`setActiveCv(cvId)`**: Sets a specific CV as the active one (`isActive = true`) for generating suggestions, ensuring only one can be active at a time.
*   **`getActiveCv()`**: Fetches the currently active CV's data.

### New API Endpoints: `/api/cvs`

New RESTful endpoints will be created to manage CVs from the frontend.

*   `GET /api/cvs`: Lists metadata for all available CVs.
*   `POST /api/cvs/upload`: Handles file uploads for new CVs and triggers the initial parsing.
*   `GET /api/cvs/:id`: Retrieves detailed information for a single CV, including its parsed JSON data.
*   `POST /api/cvs/:id/set-active`: Sets a CV as the one to use for generating suggestions.
*   `DELETE /api/cvs/:id`: Deletes a CV record and its corresponding file.

---

## 2. Frontend Architecture (React & TypeScript)

The frontend will be updated to provide a seamless user interface for managing and utilizing the CVs.

### New UI Component: `CvManager`

A new component, likely integrated into a `SettingsPage.tsx`, will allow users to:

*   View a list of all uploaded CVs, showing their filename and active status.
*   Upload new CV files via a drag-and-drop interface or file picker.
*   Set a CV as "active" with a single click.
*   Delete unwanted CVs.

### `JobContext.tsx` Updates

The central `JobContext` will be enhanced to hold the active CV's data, making it globally available.

*   **New State**: `activeCv: Cv | null` will be added to the context's state.
*   **New Function**: `loadActiveCv()` will be called when the application loads to fetch the active CV from the backend and populate the state.

### `Suggestions.tsx` Refactor

This component will be significantly upgraded from a simple rule-based system to a data-driven one.

*   **Data Source**: It will now consume the `activeCv` object from the `JobContext`.
*   **Smarter `getCvSuggestions`**: The logic will be rewritten to perform a "diff" between the job's requirements and the CV's content.
    *   **Example 1 (Skill Matching)**: It will compare the `job.technologies` array with the `activeCv.parsedJson.skills` array and explicitly suggest which skills from the CV to highlight.
    *   **Example 2 (Experience Matching)**: It can scan `activeCv.parsedJson.experience` for projects or roles that match keywords from the job description.

---

## 3. Python Reimplementation Plan (`ORGANIZER_PY.md`)

The main `ORGANIZER_PY.md` document will be updated to incorporate this architecture, ensuring the future Python version is built with this functionality from the ground up. Recommended Python libraries for this task include:

*   **PDF Parsing**: `PyMuPDF` for robust and fast text extraction.
*   **NLP/Structuring**: `spaCy` or `NLTK` for more advanced parsing to structure the CV text into JSON (e.g., named entity recognition to find company names, dates, and skills).
