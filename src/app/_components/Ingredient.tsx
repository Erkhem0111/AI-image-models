"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FileText, Newspaper, RotateCw, Sparkles } from "lucide-react";
import { int } from "zod";

interface IngredientProps {
  foodText: string;
  ingLoading: boolean;
  ingModelLoading: boolean;
  ingResult: string | null;
  onChange: (text: string) => void;
  onReset: () => void;
  onGenerate: () => void;
}

export const Ingredient = (props: IngredientProps) => {
  return (
    <>
      <div className="mt-2 w-145">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Sparkles />
            <h1 className="text-[#09090B] font-semibold text-[20px]">
              Ingredient recognition
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
          Describe the food, and AI will detect the ingredients.
        </p>

        <div className="rounded-lg border border-gray-200 bg-white mt-2">
          <textarea
            value={props.foodText}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder="Орц тодорхойлох"
            className="h-42 w-full resize-none rounded-lg bg-transparent p-4 text-base outline-none placeholder:text-gray-400"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            className="bg-zinc-800 hover:bg-zinc-700"
            onClick={props.onGenerate}
            disabled={!props.foodText.trim() || props.ingLoading}
          >
            Generate
          </Button>
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Identified Ingredients</h3>
        </div>

        {props.ingResult ? (
          <pre className="text-sm text-foreground bg-muted p-4 rounded-lg whitespace-pre-wrap">
            {props.ingResult}
          </pre>
        ) : (
          <p className="text-sm text-muted-foreground">
            First, enter your text to recognize an ingredients.
          </p>
        )}
      </div>
    </>
  );
};
