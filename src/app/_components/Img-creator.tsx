"use client";

import { Button } from "@/components/ui/button";
import { Image, Loader2, RotateCw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  endpoint?: string;
};

export const ImgCreator = ({ endpoint = "/api/image-generation" }: Props) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (generatedImage) URL.revokeObjectURL(generatedImage);
    };
  }, [generatedImage]);

  const handleGenerate = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    if (generatedImage) {
      URL.revokeObjectURL(generatedImage);
      setGeneratedImage(null);
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const ct = res.headers.get("content-type") || "";
      if (!res.ok) {
        const msg = ct.includes("application/json")
          ? (await res.json())?.error
          : await res.text();
        throw new Error(msg || `Request failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setGeneratedImage(url);
    } catch (e: any) {
      console.error("Generation error:", e);
      setError(e?.message || "Generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setError(null);
    if (generatedImage) URL.revokeObjectURL(generatedImage);
    setGeneratedImage(null);
  };

  return (
    <>
      <div className="mt-2 w-145">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Sparkles />
            <h1 className="text-[#09090B] font-semibold text-[20px]">
              Food image creator
            </h1>
          </div>
          <Button
            type="reset"
            variant="outline"
            className="rounded-md cursor-pointer"
            onClick={handleReset}
          >
            <RotateCw />
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          What food image do you want? Describe it briefly.
        </p>

        {/* Textarea box */}
        <div className="rounded-lg border border-gray-200 bg-white mt-2">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Хоолны тайлбар"
            className="h-42 w-full resize-none rounded-lg bg-transparent p-4 text-base outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Generate button */}
        <div className="mt-4 flex justify-end">
          <Button
            className="bg-zinc-800 hover:bg-zinc-700"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </div>
      </div>

      {/* Result Section */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2">
          <Image className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Result</h3>
        </div>

        {error ? (
          <p className="text-sm text-red-600 bg-muted p-4 rounded-lg">
            {error}
          </p>
        ) : generatedImage ? (
          <div className="bg-muted p-4 rounded-lg">
            <img
              src={generatedImage}
              alt="Generated"
              className="w-full rounded-lg"
            />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            First, enter your text to generate an image.
          </p>
        )}
      </div>
    </>
  );
};
