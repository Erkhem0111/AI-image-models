"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Newspaper, RotateCw, Sparkles } from "lucide-react";

export const Ingredient = () => {
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
          >
            <RotateCw />
          </Button>
        </div>
        <div className="mt-4 flex flex-col items-end">
          <Field>
            <FieldLabel className="text-[#71717A]">
              Describe the food, and AI will detect the ingredients.
            </FieldLabel>
            <Input className="h-10" placeholder="Орц тодорхойлох" />
          </Field>
          <Button
            variant="outline"
            className="w-22 h-12 bg-gray-200 hover:bg-gray-300 rounded-md text-[16px] cursor-pointer mt-3"
          >
            Generate
          </Button>
        </div>
      </div>
      <div className="mt-3 w-145">
        <div className="flex gap-2">
          <Newspaper />
          <h1 className="text-[#09090B] font-semibold text-[20px]">
            Identified Ingredients
          </h1>
        </div>
        <h1 className="text-[#71717A] text-[14px]">
          First, enter your text to recognize an ingredients.
        </h1>
      </div>
    </>
  );
};
