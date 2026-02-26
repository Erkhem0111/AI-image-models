"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImgAnalysis } from "./_components/Img-analysis";
import { Ingredient } from "./_components/Ingredient";
import { ImgCreator } from "./_components/Img-creator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useRef, useState } from "react";
import { pipeline } from "@huggingface/transformers";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const captionerRef = useRef<any>(null);

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setSelectedFile(f);
    setResult(null);

    const dataUrl = await fileToDataUrl(f);
    setImagePreview(dataUrl);
  };

  const handleGenerate = async () => {
    if (!imagePreview) return;

    setIsLoading(true);
    try {
      if (!captionerRef.current) {
        setIsModelLoading(true);
        captionerRef.current = await pipeline(
          "image-to-text",
          "Xenova/vit-gpt2-image-captioning",
        );
        setIsModelLoading(false);
      }

      const output = await captionerRef.current(imagePreview);
      if (Array.isArray(output) && output.length > 0) {
        setResult(output[0].generated_text);
      }
    } catch {
      setResult("Error analyzing image.");
    } finally {
      setIsLoading(false);
    }
  };

  const [foodText, setFoodText] = useState("");
  const [ingLoading, setIngLoading] = useState(false);
  const [ingModelLoading, setIngModelLoading] = useState(false);
  const [ingResult, setIngResult] = useState<string | null>(null);
  const ingredientRef = useRef<any>(null);

  const handleIngredientGenerate = async () => {
    if (!foodText.trim()) return;

    setIngLoading(true);
    setIngResult(null);

    try {
      if (!ingredientRef.current) {
        setIngModelLoading(true);
        ingredientRef.current = await pipeline(
          "text2text-generation",
          "Xenova/flan-t5-base",
        );
        setIngModelLoading(false);
      }

      const out = await ingredientRef.current(
        `Extract ingredients from this food description as a bullet list:\n${foodText}`,
      );

      const text = Array.isArray(out)
        ? out[0]?.generated_text
        : out.generated_text;

      setIngResult(text || "No ingredients found.");
    } catch {
      setIngResult("Error extracting ingredients.");
    } finally {
      setIngLoading(false);
    }
  };

  const [prompt, setPrompt] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createResultUrl, setCreateResultUrl] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!prompt.trim()) return;

    setCreateLoading(true);
    setCreateError(null);
    setCreateResultUrl(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "image",
          prompt,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Generate failed");
      }

      const blob = await res.blob();
      setCreateResultUrl(URL.createObjectURL(blob));
    } catch (e: any) {
      setCreateError(e.message || "Failed to fetch");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResult(null);

    setFoodText("");
    setIngResult(null);

    setPrompt("");
    setCreateResultUrl(null);
    setCreateError(null);
  };
  return (
    <div className="">
      <div className="flex justify-center mt-8">
        <Tabs defaultValue="img-analysis" className="w-105">
          <TabsList>
            <TabsTrigger value="img-analysis">Image analysis</TabsTrigger>
            <TabsTrigger value="ingredient">Ingredient recognition</TabsTrigger>
            <TabsTrigger value="img-creator">Image creator</TabsTrigger>
          </TabsList>
          <TabsContent value="img-analysis">
            <ImgAnalysis
              selectedFile={selectedFile}
              imagePreview={imagePreview}
              isLoading={isLoading}
              isModelLoading={isModelLoading}
              result={result}
              onReset={handleReset}
              onFileChange={handleFileChange}
              onGenerate={handleGenerate}
            />
          </TabsContent>
          <TabsContent value="ingredient">
            <Ingredient
              foodText={foodText}
              ingLoading={ingLoading}
              ingModelLoading={ingModelLoading}
              ingResult={ingResult}
              onChange={setFoodText}
              onReset={() => {
                setFoodText("");
                setIngResult(null);
              }}
              onGenerate={handleIngredientGenerate}
            />
          </TabsContent>
          <TabsContent value="img-creator">
            <ImgCreator />
          </TabsContent>
        </Tabs>
      </div>
      <div className="fixed bottom-6 right-6 z-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="cursor-pointer rounded-full w-12 h-12">
              <MessageCircle />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="end" className="w-90">
            <div className="border-y-2 border-[#E4E4E7] w-full flex items-center">
              <h1 className="text-[#000000] text-[15px] font-semibold">
                Chat assistant
              </h1>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
