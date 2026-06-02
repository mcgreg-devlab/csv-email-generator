"use client";

import { useState } from "react";
import Papa from "papaparse";

interface Contact {
  Name: string;
  Company: string;
  Industry: string;
}

interface GeneratedEmail {
  name: string;
  company: string;
  industry: string;
  email: string;
}

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [emails, setEmails] = useState<GeneratedEmail[]>([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    Papa.parse<Contact>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setContacts(results.data);
      },
    });
  };

  const generateEmails = () => {
    const generated = contacts.map((contact) => ({
      name: contact.Name,
      company: contact.Company,
      industry: contact.Industry,
      email: `Subject: Partnership Opportunity

Hi ${contact.Name},

I noticed ${contact.Company} operates in the ${contact.Industry} industry.

I wanted to reach out and introduce myself. I believe there may be opportunities for us to collaborate and create value together.

I'd love to connect and learn more about your business.

Best regards,
Greg
`,
    }));

    setEmails(generated);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
           mcgreg-devlab
        </p>

        <h1 className="mb-2 text-4xl font-bold text-gray-900">
          CSV → Personalized Email Generator
        </h1>

        <p className="mb-8 text-lg text-gray-700">
          Upload a CSV file and instantly generate personalized email drafts.
        </p>

        <div className="rounded-xl bg-white p-6 shadow">
          <div className="mb-6">
            <label
              htmlFor="csv-upload"
              className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center hover:border-blue-500 hover:bg-blue-50"
   >
    <div>
      <p className="font-medium text-gray-900">
        Click to upload your CSV file
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Name, Company, Industry
      </p>
    </div>
  </label>

  <input
    id="csv-upload"
    type="file"
    accept=".csv"
    onChange={handleFileUpload}
    className="hidden"
  />

  {fileName && (
  <p className="mt-3 text-sm font-medium text-green-600">
    ✓ Uploaded: {fileName}
  </p>
)}

</div>

          <div className="mb-4">
            <p className="text-sm font-medium text-gray-800">
              Expected CSV Format:
            </p>

            <pre className="mt-2 rounded bg-gray-100 p-3 text-sm text-gray-900">
{`Name,Company,Industry
John Smith,ABC Logistics,Logistics
Sarah Lee,HealthFirst,Healthcare`}
            </pre>
          </div>

          <button
            onClick={generateEmails}
            disabled={contacts.length === 0}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            Generate Emails
          </button>
        </div>

        {contacts.length > 0 && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900">
              Contacts Loaded
            </h2>

            <p className="text-gray-800">
              {contacts.length} contacts found.
            </p>
          </div>
        )}

        {emails.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Generated Emails
            </h2>

            <div className="space-y-6">
              {emails.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
                >
                  <h3 className="mb-4 text-2xl font-bold text-blue-700">
                    {item.name}
                  </h3>

                  <hr className="mb-6 border-gray-200" />

                  <pre className="whitespace-pre-wrap text-base leading-8 text-gray-900">
                    {item.email}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}