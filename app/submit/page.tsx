import { type Metadata } from "next";
import { SubmissionForm } from "@/components/data/SubmissionForm";

export const metadata: Metadata = {
  title: "Submit Compensation Data",
  description: "Contribute your own compensation data anonymously to help the community benchmark salaries.",
};

export default function SubmitPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Share Your Compensation</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Help thousands of engineers and PMs benchmark their salary. All data is anonymous.
        </p>
      </div>
      <SubmissionForm />
    </div>
  );
}
