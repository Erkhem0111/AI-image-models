"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Image, Newspaper, RotateCw, Sparkles } from "lucide-react";

export const ImgCreator = () => {
  return (
    <>
      <div className="mt-2 w-145">
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
          >
            <RotateCw />
          </Button>
        </div>
        <div className="mt-4 flex flex-col items-end">
          <Field>
            <FieldLabel className="text-[#71717A]">
              What food image do you want? Describe it briefly.
            </FieldLabel>
            <Input className="h-10" placeholder="Хоолны тайлбар" />
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
          <Image />
          <h1 className="text-[#09090B] font-semibold text-[20px]">Result</h1>
        </div>
        <h1 className="text-[#71717A] text-[14px]">
          First, enter your text to generate an image.
        </h1>
      </div>
    </>
  );
};
