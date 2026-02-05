"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Newspaper, RotateCw, Sparkles, Trash } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  image: z
    .any()
    .refine(
      (files) => files?.length === 1,
      "Choose a file or drag & drop it here",
    )
    .refine(
      (files) => ["image/jpeg", "image/png"].includes(files?.[0]?.type),
      "JPG эсвэл PNG файл сонгоно уу",
    ),
});

type FormValues = z.infer<typeof schema>;

export const ImgAnalysis = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const removeImage = () => {
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    setUploadedImageUrl("");
    form.reset();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const onSubmit = (values: FormValues) => {
    const file = values.image[0];
    console.log(file);
  };

  return (
    <>
      <div className="mt-2 w-145">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Sparkles />
            <h1 className="text-[#09090B] font-semibold text-[20px]">
              Image analysis
            </h1>
          </div>
          <Button
            type="button"
            variant="outline"
            className="rounded-md cursor-pointer"
            onClick={removeImage}
          >
            <RotateCw />
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#71717A] pt-2">
                    Upload a food photo, and AI will detect the ingredients.
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        accept="image/jpeg,image/png"
                        id="file-upload"
                        placeholder="JPG, PNG"
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (!files || !files[0]) return;
                          field.onChange(files);
                          setUploadedImageUrl(URL.createObjectURL(files[0]));
                        }}
                      />
                      {uploadedImageUrl && (
                        <div className="relative w-50 h-36 border-2 border-gray-400 rounded-lg p-1 box-border overflow-hidden">
                          <Image
                            alt="Uploaded image"
                            src={uploadedImageUrl}
                            fill
                            className="object-cover rounded-md"
                          />
                          <Button
                            variant="outline"
                            type="button"
                            onClick={removeImage}
                            className="border-2 border-gray-300 absolute bottom-2 right-3 w-6 h-6 cursor-pointer"
                          >
                            <Trash />
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="outline"
                className="w-24 h-12 bg-gray-200 hover:bg-gray-300 rounded-md text-[16px] cursor-pointer mt-3"
              >
                Generate
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="mt-3 w-145">
        <div className="flex gap-2">
          <Newspaper />
          <h1 className="text-[#09090B] font-semibold text-[20px]">
            Here is the summary
          </h1>
        </div>
        <p className="text-[#71717A] text-[14px]">
          First, enter your image to recognize an ingredients...
        </p>
      </div>
    </>
  );
};
