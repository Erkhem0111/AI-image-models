"use client";

import { Button } from "@/components/ui/button";
import { FileText, Loader2, RotateCw, Sparkles } from "lucide-react";

interface ImgAnalysisProps {
  selectedFile: File | null;
  imagePreview: string | null;
  isLoading: boolean;
  isModelLoading: boolean;
  result: string | null;
  onReset: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onGenerate: () => Promise<void>;
}

export const ImgAnalysis = (props: ImgAnalysisProps) => {
  return (
    <div className="mt-2 w-145">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Sparkles />
          <h1 className="text-[#09090B] font-semibold text-[20px]">
            Image analysis
          </h1>
        </div>
        <Button
          type="reset"
          variant="outline"
          className="rounded-md cursor-pointer"
          onClick={props.onReset}
        >
          <RotateCw />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Upload a food photo, and AI will detect the ingredients.
      </p>

      <div className="rounded-lg border border-gray-200 bg-white mt-2 p-4">
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={props.onFileChange}
          className="mb-4 text-gray-500 cursor-pointer"
        />

        {props.imagePreview && (
          <img
            src={props.imagePreview}
            alt="Preview"
            className="max-h-64 rounded-lg object-contain"
          />
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          className="bg-zinc-800 hover:bg-zinc-700"
          onClick={props.onGenerate}
          disabled={!props.selectedFile || props.isLoading}
        >
          {props.isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {props.isModelLoading ? "Loading model..." : "Analyzing..."}
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Here is the summary</h3>
        </div>

        {props.result ? (
          <pre className="text-sm text-foreground bg-muted p-4 rounded-lg whitespace-pre-wrap">
            {props.result}
          </pre>
        ) : (
          <p className="text-sm text-muted-foreground">
            First, enter your image to recognize an ingredients.
          </p>
        )}
      </div>
    </div>
  );
};
